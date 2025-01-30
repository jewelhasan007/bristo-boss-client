// api, axios(axios secure---baseURL), tanstack query
// 

/**
 * const useCart =() =>{
 * const axiosSecure = useAxiosSecure();
 * const {data: cart=[]} = useQuery({
 * queryKey: ['cart']
 * queryFn: async () => {
 * const res = await axiosSecure.get('/carts')
 * return res.data;
 *  }
 * })
 * return [cart]
 * };
 *  * export default useCart;
 */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import userHook from "./userHook";


const useCart = () => {
//  tan stack query
const axiosSecure = useAxiosSecure();
const {user} = userHook();

const {refetch, data: cart=[]} = useQuery({
queryKey: ['cart', user?.email],
queryFn: async ()=>{
    const res = await axiosSecure.get(`/carts?email=${user.email}`);
    return res.data;
}   
})
return [cart, refetch]
};

export default useCart;