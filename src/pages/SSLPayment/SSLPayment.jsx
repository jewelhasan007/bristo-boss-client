import axios from 'axios';
import React from 'react';

const SSLPayment = () => {

    const handleSSLPayment = ()=>{
        axios.post(`${process.env.VITE_baseURL}/payment-ssl`, {
            amount: 200,
            currenty: 'USD'
        })
        .then(res=>{
            console.log('sslpayment result', res)
            const redirectUrl = res.data.paymentUrl
            if(redirectUrl){
                window.location.replace(redirectUrl);
            }
        })
    }

    return (
        <div>  
            <div className="mockup-window bg-base-300 border">
    <div className="bg-base-200 flex justify-center px-4 py-16 ">Welcome to SSL Commerz payement page</div>
    <button onClick={handleSSLPayment} className='btn btn-primary mb-5'>Pay Now</button>
</div>
        </div>
    );
};

export default SSLPayment;