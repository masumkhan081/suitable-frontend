import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import apiClient from '@/utils/apiClient';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Using a compatible API version
  apiVersion: '2022-11-15', // Using a supported API version
});

export async function POST(req: NextRequest) {
  try {
    // Get the session ID from the request body
    const { sessionId } = await req.json();

    // Validate required fields
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get auth token from the request headers
    const authToken = req.headers.get('authorization')?.split(' ')[1];
    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    // Verify the payment status
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, message: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get the user ID from the session metadata
    const userId = session.metadata?.userId;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID not found in session metadata' },
        { status: 400 }
      );
    }

    // Call the backend API to confirm the subscription
    const response = await apiClient.post('/subscription/confirm', {
      userId,
      stripeSubscriptionId: typeof session.subscription === 'string' 
        ? session.subscription 
        : session.subscription?.id,
      stripeCustomerId: typeof session.customer === 'string' 
        ? session.customer 
        : session.customer?.id,
      sessionId,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: response.data,
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to verify payment',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
