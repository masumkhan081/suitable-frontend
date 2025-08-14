import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Using a compatible API version
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const { priceId, userId } = await req.json();

    // Validate required fields
    if (!priceId) {
      return NextResponse.json({
        success: false, 
        message: 'Price ID is required',
        error: { code: 400, details: ['Price ID is required'] }
      }, { status: 400 });
    }

    // Get auth token from the request headers
    const authToken = req.headers.get('authorization')?.split(' ')[1];
    if (!authToken) {
      return NextResponse.json({
        success: false, 
        message: 'Authentication required',
        error: { code: 401, details: ['Authentication required'] }
      }, { status: 401 });
    }

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {
        userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/payment-cancelled`,
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    // Return the session URL
    return NextResponse.json({
      success: true,
      message: 'Checkout session created successfully',
      data: {
        url: session.url,
        sessionId: session.id
      }
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create checkout session',
      error: { 
        code: 500, 
        details: [error.message] 
      }
    }, { status: 500 });
  }
}
