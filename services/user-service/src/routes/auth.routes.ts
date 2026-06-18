import { Router } from 'express';
import express from 'express';
import { clerkWebhookHandler } from '../controllers/auth.controller';

const router = Router();

// We need raw body for the webhook verification
router.post('/webhook', express.raw({ type: 'application/json' }), clerkWebhookHandler);

export default router;
