import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import apiClient from '@/utils/apiClient';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Using a compatible API version
  apiVersion: '2022-11-15', // Using a supported API version
});

// Set the webhook secret
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Create a map to track processed events for idempotency
const processedEvents = new Map<string, boolean>();

// Helper function to update user subscription in the database
async function updateUserSubscription(event: Stripe.Event) {
  try {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    const subscriptionId = subscription.id;
    const status = subscription.status;
    
    // Get userId from metadata
    const userId = subscription.metadata?.userId;
    
    if (!userId) {
      console.error('No userId found in subscription metadata');
      return;
    }
    
    // Call backend API to update subscription status
    await apiClient.post('/api/internal/subscription/update', {
      userId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      status,
      event: event.type,
    });
    
    console.log(`Subscription ${event.type} processed for user ${userId}`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    // Get the Stripe signature from the request headers
    const signature = req.headers.get('stripe-signature')!;
    
    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Check for idempotency - if we've already processed this event, return success
    if (processedEvents.has(event.id)) {
      console.log(`Event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true });
    }
    
    // Log the event
    console.log(`Webhook received: ${event.type}`);
    
    // Handle specific subscription events
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await updateUserSubscription(event);
        break;
        
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Checkout session completed: ${session.id}`);
        // You could handle additional logic here if needed
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Mark this event as processed
    processedEvents.set(event.id, true);
    
    // Clean up old events to prevent memory leaks (keep only last 100 events)
    if (processedEvents.size > 100) {
      const keys = Array.from(processedEvents.keys());
      const keysToDelete = keys.slice(0, keys.length - 100);
      keysToDelete.forEach(key => processedEvents.delete(key));
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}
