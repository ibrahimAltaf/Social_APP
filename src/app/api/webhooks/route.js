import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';
import { CreateOrUpdateUser, deleteUser } from '../../../lib/actions/user';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET to .env');
  }

  const headerPayload = req.headers;
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 });
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
    console.error('Error verifying webhook:', err);
    return new Response('Verification error', { status: 400 });
  }

  const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data;
  const email = email_addresses?.[0]?.email_address || null;

  try {
    const user = await CreateOrUpdateUser(id, first_name, last_name, image_url, email, username);
    if (!user) throw new Error('User not created');
    if (evt.type === 'user.created') {
      await clerkClient.users.updateUserMetadata(id, { publicMetadata: { userMongoId: user._id } });
    }
  } catch (error) {
    console.error('Error processing user:', error);
    return new Response(`Error: ${error.message}`, { status: 400 });
  }

  console.log('Webhook processed successfully');
  return new Response('Success', { status: 200 });
}
