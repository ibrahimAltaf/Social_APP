import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '../../../lib/actions/user';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is missing from environment variables');
    return new Response('Missing webhook secret', { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing required headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return new Response('Invalid webhook signature', { status: 400 });
  }

  const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data;
  const eventType = evt?.type;

  console.log(`Webhook received for user ID: ${id} | Event Type: ${eventType}`);

  try {
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );

      if (user && eventType === 'user.created') {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userMongoId: user._id,
          },
        });
      }
    } else if (eventType === 'user.deleted') {
      await deleteUser(id);
    }
  } catch (error) {
    console.error('Error handling the event:', error);
    return new Response('Internal server error', { status: 500 });
  }

  return new Response('Webhook processed successfully', { status: 200 });
}
