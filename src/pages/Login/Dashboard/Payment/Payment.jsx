import React from 'react';
import CategoryTitle from '../../../../Shared/CategoryTitle/CategoryTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// TODO:add publshable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    
    return (
        <div>
            <div>
               <CategoryTitle
               subHeading={"Payment"}
               heading={"Please pay"}
               ></CategoryTitle>
              <div>
                <Elements stripe={stripePromise}>
                <CheckoutForm>

                </CheckoutForm>
                </Elements>
              </div>
            </div>
        </div>
    );
};

export default Payment;