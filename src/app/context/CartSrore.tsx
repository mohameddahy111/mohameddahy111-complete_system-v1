"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartStore = createContext<any>({});
export const CartStoreProvider = ({
 children
}: {
 children: React.ReactNode;
}) => {
 const [cartItems, setCartItems] = useState<any>([]);
 const addToCart = async (ele: any) => {
     const list = [...cartItems];
     const item = list.find((item: any) => item.id === ele.id);
  if (item) {
   item.quantity ++;
    setCartItems([...list]);
    localStorage.setItem("cartItems", JSON.stringify(list));
  } else {
   ele.quantity = 1;
   list.push({...ele });
   localStorage.setItem("cartItems", JSON.stringify(list));
   setCartItems([...list]);
  
  }
 };
 useEffect(() => {
  if (typeof window !== "undefined") {
   setCartItems(
    localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []
   );
  }
 }, []);
 console.log('cartItems',cartItems)
 return (
  <CartStore.Provider
   value={{
    addToCart,
    cartItems,
    setCartItems
   }}
  >
   {children}
  </CartStore.Provider>
 );
};

export const useCartStore = () => {
 return useContext(CartStore);
};
