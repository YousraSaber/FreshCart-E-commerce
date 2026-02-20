"use client";

import { getUserCart } from "@/CartActions/getUserCart.action";
import { CartProduct } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

//type of context
type CartContextType = {
  numberOfItems: number;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
};



//create context
export const CartContext = createContext<CartContextType | null>(null);

//type of context provider
type CartContextProviderProps = {
  children: React.ReactNode;
};

//provider
export function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [products, setProducts] = useState<CartProduct[]>([]);


  async function getLoggedUserCart() {
    const res = await getUserCart();
    if (res.status === "success") {
      const cartProducts: CartProduct[] = res.data.products;
      let sum = 0;
      res.data.products.forEach((product: { count: number }) => {
        sum += product.count;
      });
      setNumberOfItems(sum);
      setProducts(cartProducts);
    } else {
      console.log(res);
    }
  }
  const { data: session, status } = useSession();

  useEffect(() => {
  if (status === "authenticated") {
    function flag(){
      getLoggedUserCart();
    }
    flag()
  }
}, [status]);


  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems , products, setProducts}}>
      {children}
    </CartContext.Provider>
  );
}
