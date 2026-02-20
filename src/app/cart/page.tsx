"use client";

import { getUserCart } from "@/CartActions/getUserCart.action";
import { removeCart } from "@/CartActions/removeCart.action";
import { removeCartItem } from "@/CartActions/removeCartItem.action";
import { updateCartItem } from "@/CartActions/updateCartItem.action";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { CartContext } from "@/Context/CartContext";
import { ProductCartType } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [disableFlag, setDisableFlag] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);
  const { numberOfItems, setNumberOfItems , products, setProducts } = useContext(CartContext)!;
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId , setCartId] = useState("")

  async function getUserCartProducts() {
    const res = await getUserCart();
    setCartId(res.cartId)
    console.log(res)
    if (res.status == "success") {
      setProducts(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  async function removeProductFromCart(id: string) {
    setDisableFlag(true);
    setDisableUpdateBtn(true);
    const res = await removeCartItem(id);
    if (res.status == "success") {
      toast.success("product is removed successfully.", {
        duration: 2000,
        position: "top-center",
      });
      setProducts(res.data.products);
      setDisableUpdateBtn(false);
      setDisableFlag(false);
      getUserCartProducts();

      let sum = 0;
      res.data.products.forEach((product: ProductCartType) => {
        sum += product.count;
      });
      setNumberOfItems(sum);
    } else {
      toast.error("product can not be removed now.", {
        duration: 2000,
        position: "top-center",
      });
      setDisableFlag(false);
      setDisableUpdateBtn(false);
    }
  }
  async function updateProductCart(id: string, count: string, sign: string) {
    setCurrentId(id);
    setUpdateLoading(true);
    setDisableFlag(true);
    setDisableUpdateBtn(true);
    const res = await updateCartItem(id, count);
    
    if (res.status == "success") {
      toast.success("product quantity updated successfully.", {
        duration: 2000,
        position: "top-center",
      });
      setProducts(res.data.products);
      setDisableFlag(false);
      setUpdateLoading(false);
      setDisableUpdateBtn(false);
      getUserCartProducts();
      if (sign == "+") {
        setNumberOfItems(numberOfItems + 1);
      } else if (sign == "-") {
        setNumberOfItems(numberOfItems - 1);
      }
    } else {
      toast.error("product quantity can't be updated now.", {
        duration: 2000,
        position: "top-center",
      });
      setDisableFlag(false);
      setUpdateLoading(false);
      setDisableUpdateBtn(false);
    }
  }
  
  async function removeUserCart() {
    const res = await removeCart();
    if (res.status == "success") {
      toast.success("Cart is removed successfully.", {
        duration: 2000,
        position: "top-center",
      });
      setProducts([]);
      setNumberOfItems(0);
    } else {
      toast.error("Cart can not be removed now.", {
        duration: 2000,
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    function flag(){
      getUserCartProducts();
    }
    flag()
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner className="size-16 text-green-800" />
              </EmptyMedia>
              <EmptyDescription className="text-md font-semibold">
                Just a moment...
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : products.length > 0 ? (
        <div className="mx-auto w-[90%] lg:w-[85%] mt-14">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                <span className=" text-green-600">Shopping</span> Cart
              </h2>
              <p className="text-gray-500 mt-2">
                {numberOfItems} item(s) in your cart
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3">
                <span className="text-gray-500 text-md block">
                  Total Price :{" "}
                  <span className="text-md font-bold text-green-600">
                    {totalPrice} EGP
                  </span>
                </span>
              </div>

              <Button
                onClick={() => removeUserCart()}
                className="bg-linear-to-r from-red-500 to-red-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl shadow-lg"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-8">
            {products.map((prod) => (
              <div
                key={prod.product.id}
                className="group flex flex-col lg:flex-row justify-between items-center bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 "
              >
                {/* Product Info */}
                <div className="flex items-center gap-8 w-full lg:w-auto">
                  <div className="relative">
                    <Image
                      width={500}
                      height={500}
                      src={prod.product.imageCover}
                      className="w-28 h-28 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-all duration-500"
                      alt="product image"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {prod.product.title}
                    </h3>

                    <p className="text-green-600 text-lg font-bold mt-3">
                      {prod.price * prod.count} EGP
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col lg:flex-row items-center gap-6 mt-6 lg:mt-0">
                  {/* Quantity Controller */}
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner">
                    <button
                      disabled={disableUpdateBtn}
                      onClick={() =>
                        updateProductCart(
                          prod.product.id,
                          `${prod.count - 1}`,
                          "-",
                        )
                      }
                      className="disabled:text-white disabled:bg-gray-700 h-9 w-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      -
                    </button>

                    <span className="mx-5 font-semibold text-lg text-gray-800">
                      {currentId === prod.product.id && updateLoading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        prod.count
                      )}
                    </span>

                    <button
                      disabled={disableUpdateBtn}
                      onClick={() =>
                        updateProductCart(
                          prod.product.id,
                          `${prod.count + 1}`,
                          "+",
                        )
                      }
                      className="disabled:text-white disabled:bg-gray-700 h-9 w-9 flex items-center justify-center rounded-full text-gray-700 hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    disabled={disableFlag}
                    onClick={() => removeProductFromCart(prod.product.id)}
                    className="disabled:text-white disabled:bg-gray-700 px-6 py-2 text-sm font-medium rounded-xl border border-red-400 disabled:border-gray-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button className="text-white bg-green-600 hover:bg-green-800 my-6 block ms-auto cursor-pointer">
            <Link href={`/checkout/${cartId}`}>Checkout</Link>
          </Button>
        </div>
      ) : (
        <div className="flex w-3/4 mt-12 h-75 mx-auto items-center justify-center rounded-2xl">
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <i className="fa-solid fa-circle-exclamation text-5xl text-green-600"></i>
              </EmptyMedia>
              <EmptyDescription className="text-md font-semibold">
                No Products In Your Cart.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </>
  );
}
