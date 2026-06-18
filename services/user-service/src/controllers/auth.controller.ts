import { Request, Response } from 'express';
import { Webhook } from 'svix';
// Using relative import to shared database until monorepo links are built
import { User } from '../../../../packages/database/src/models/User';

export const clerkWebhookHandler = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  // req.body must be raw buffer for svix
  const payload = (req as any).rawBody || req.body;
  const body = payload.toString();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return res.status(400).json({ error: 'Error verifying webhook' });
  }

  const eventType = evt.type;
  
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses?.[0]?.email_address || '';
    const name = `${first_name || ''} ${last_name || ''}`.trim() || 'Unknown User';

    try {
      await User.findOneAndUpdate(
        { clerkId: id },
        { clerkId: id, email, name, profileImage: image_url, isVerified: true },
        { upsert: true, new: true }
      );
      console.log(`User ${id} saved successfully.`);
    } catch (error) {
      console.error('DB Error:', error);
      return res.status(500).json({ error: 'Database error' });
    }
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data;
    await User.findOneAndDelete({ clerkId: id });
    console.log(`User ${id} deleted.`);
  }

  return res.status(200).json({ success: true });
};
