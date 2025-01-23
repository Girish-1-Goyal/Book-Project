import { loadStripe } from '@stripe/stripe-js';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const processPayment = async ({ amount, currency, userId }) => {
  try {
    // Create payment intent on your backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { clientSecret } = await response.json();

    // Confirm payment with Stripe
    const stripe = await stripePromise;
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret);

    if (error) {
      throw new Error(error.message);
    }

    if (paymentIntent.status === 'succeeded') {
      // Record the payment in Firestore
      await addDoc(collection(db, 'payments'), {
        userId,
        amount,
        currency,
        paymentIntentId: paymentIntent.id,
        status: 'succeeded',
        createdAt: new Date().toISOString()
      });

      return paymentIntent;
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

export const createRefund = async (paymentId, amount) => {
  try {
    const response = await fetch('/api/create-refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        amount,
      }),
    });

    const refund = await response.json();
    
    // Record the refund in Firestore
    await addDoc(collection(db, 'refunds'), {
      paymentId,
      amount,
      status: refund.status,
      createdAt: new Date().toISOString()
    });

    return refund;
  } catch (error) {
    console.error('Refund processing error:', error);
    throw error;
  }
}; 