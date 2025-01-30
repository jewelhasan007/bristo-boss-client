import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useCart from '../../../../hooks/useCart';
import userHook from '../../../../hooks/userHook';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
const [error, setError] = useState('');
const [clientSecret, setClientSecret] = useState('');
const [transectionId, setTrasectionId] = useState('');
const stripe = useStripe();
const elements = useElements();
const axiosSecure =  useAxiosSecure();
const {user} = userHook();
const navigate = useNavigate();
const [cart, refetch] = useCart();
const totalPrice = cart.reduce((total, item) => total + item.price , 0)


useEffect(  ()=>{
if(totalPrice > 0){
  axiosSecure.post('/create-payment-intent', {price: totalPrice})
  .then(res =>{
    console.log(res.data.clientSecret);
    setClientSecret(res.data.clientSecret);
  })
}
}, [axiosSecure, totalPrice])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
    const card = elements.getElement(CardElement)
    if(card == null){
        return;
    }
const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card,
})
if(error){
    console.log('payment error', error)
    setError(error)
}
else{
    console.log('payment method', paymentMethod)
    setError('')
}

// confirm payment
const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
  payment_method: {
    card: card,
    billing_details: {
      email: user?.email || 'anonymous',
      name: user?.displayName || 'anonymous',
    }
  }
})
if(confirmError){
  console.log('confirm error')
}
else{
  console.log('payment intent', paymentIntent )
  if(paymentIntent.status === 'succeeded'){
    console.log('transection id ', paymentIntent.id);
  setTrasectionId(paymentIntent.id)

  // now save the payement in the database
  const payment ={
    email: user.email,
    transectionId: paymentIntent.id,
    price: totalPrice,
    data: new Date(), //utc date convert. use moment js to
    cartIds: cart.map(item => item._id),
    menuItemIds: cart.map(item => item.menuId),
    status: 'pending'
  }
  const res = await axiosSecure.post('/payments', payment)
  console.log('payment saved', res.data);

  if(res.data?.paymentResult?.insertedId){
    refetch();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Payment successfull",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/dashboard/paymentHistory')
  }
  }
}

    }
   

    return (
        <form onSubmit={handleSubmit}>
<CardElement
options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}
>

</CardElement>
<button className='btn btn-sm btn-primary' type="submit" disabled={!stripe || !clientSecret}>
  
        Pay
      </button>
      <p className='text-red-600'>{error.message}</p>
      {transectionId && <p className='text-3xl text-green-500'>Your Transection id: {transectionId}</p>}
        </form>
    );
};

export default CheckoutForm;