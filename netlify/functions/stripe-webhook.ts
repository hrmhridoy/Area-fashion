/*
  Netlify Function: Stripe Webhook Handler
  Path: /.netlify/functions/stripe-webhook
  
  This function handles Stripe webhook events for payment notifications.
*/

import { Handler, HandlerEvent } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const signature = event.headers['stripe-signature']!;
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid signature' }),
    };
  }

  try {
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        console.log('✅ PaymentIntent succeeded:', paymentIntent.id);

        // Update order status in database
        const { error } = await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('payment_intent_id', paymentIntent.id);

        if (error) throw error;
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        console.log('❌ PaymentIntent failed:', paymentIntent.id);

        // Update order status
        const { error } = await supabase
          .from('orders')
          .update({ status: 'payment_failed' })
          .eq('payment_intent_id', paymentIntent.id);

        if (error) throw error;
        break;
      }

      case 'charge.refunded': {
        const charge = stripeEvent.data.object as Stripe.Charge;
        console.log('💳 Charge refunded:', charge.id);

        // Update order status
        const { error } = await supabase
          .from('orders')
          .update({ status: 'refunded' })
          .eq('payment_intent_id', charge.payment_intent as string);

        if (error) throw error;
        break;
      }

      default:
        console.log('Unhandled event type:', stripeEvent.type);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error handling webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
    };
  }
};

export { handler };
