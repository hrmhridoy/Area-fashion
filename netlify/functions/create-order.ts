/*
  Netlify Function: Create Order
  Path: /.netlify/functions/create-order
  
  This function handles creating orders from the cart.
  It integrates with Stripe for payment processing and Supabase for storage.
*/

import { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const stripeSecret = process.env.STRIPE_SECRET_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' });

interface OrderRequest {
  userId: string;
  cartItems: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  total: number;
  paymentMethodId: string;
}

const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body: OrderRequest = JSON.parse(event.body || '{}');

    // Validate input
    if (!body.userId || !body.cartItems || !body.total) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(body.total * 100), // Convert to cents
      currency: 'usd',
      payment_method: body.paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment failed');
    }

    // Create order in Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: body.userId,
        items: body.cartItems,
        shipping_address: body.shippingAddress,
        total: body.total,
        status: 'confirmed',
        payment_intent_id: paymentIntent.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        data: {
          orderId: order.id,
          status: 'confirmed',
          message: 'Order created successfully',
        },
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

export { handler };
