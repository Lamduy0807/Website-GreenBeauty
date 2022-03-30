import React, { useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { getCart } from '../../API/Networking'
const CartProvider = ({children}) => {
const [cartData, setCartData] = useState([])
  useEffect(()=>{
    getCartInformation();
  },[])  
  const getCartInformation = () =>{
    try{
        const id = localStorage.getItem('id')
        if(id>=0)
            getCart(id).then(res=>{
            setCartData(res);
            })
        else{
            setCartData([]);
        }
    }catch(error)
    {
        console.log(`Error is ${error}`);
    }
  }
  return (
    <CartContext.Provider value={{cartData, setCartData, getCartInformation}}>{children}</CartContext.Provider>
  )
}

export default CartProvider