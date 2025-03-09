import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '../../../lib/actions/user';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is missing. Set it in .env file.');
    return new Response('Server configuration error', { status: 500 });
  }

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers');
    return new Response('Missing headers', { status: 400 });
  }

  // Get request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  // Process webhook event
  const eventType = evt?.type;
  const { id } = evt?.data;
  console.log(`Received webhook event: ${eventType} for user ID: ${id}`);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { first_name, last_name, image_url, email_addresses, username } = evt?.data;

    try {
      const user = await createOrUpdateUser(id, first_name, last_name, image_url, email_addresses, username);

      if (user) {
        console.log('MongoDB User Created/Updated:', user);

        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id.toString(),
            },
          });
          console.log('Successfully updated Clerk user metadata with MongoDB ID:', user._id);
        } catch (error) {
          console.error('Error updating user metadata in Clerk:', error?.response?.data || error);
        }
      } else {
        console.error('User creation/update failed in MongoDB.');
      }
    } catch (error) {
      console.error('Error creating/updating user in MongoDB:', error);
      return new Response('Database error', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await deleteUser(id);
      console.log(`User ${id} deleted successfully from MongoDB`);
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  return new Response('Webhook processed successfully', { status: 200 });
}
