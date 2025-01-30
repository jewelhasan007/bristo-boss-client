import React from 'react';
import userHook from '../../../../hooks/userHook';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const {user} = userHook();
    const axiosSecure = useAxiosSecure();
    const { data: payments = []} = useQuery({
        queryKey: [ 'payments', user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
    <h1>Payment History: {payments.length}</h1>
    <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>price</th>
        <th>Transection Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
        {
            payments.map((payment, index) =>  <tr key={payment._id}>
            <th>{index+1}</th>
            <td>${payment.price}</td>
            <td>{payment.transectionId}</td>
            <td>{payment.status}</td>
          </tr> )
        }
      {/* row 1 */}
     

    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;