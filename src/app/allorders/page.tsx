"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/OrderAction/userOrders.action";
import Image from "next/image";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

type ProductItem = {
  _id: string;
  title: string;
  imageCover: string;
};

type CartItem = {
  count: number;
  price: number;
  product: ProductItem;
  _id: string
};

type Order = {
  _id: string;
  cartItems: CartItem[];
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: string;
  shippingAddress: { details: string; phone: string; city: string };
  createdAt: string;
};

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getUserOrders();
        setOrders(res || []);
      } catch (err) {
        console.log(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center">
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner className="size-16 text-green-600" />
        </EmptyMedia>
        <EmptyDescription className="text-md font-semibold">
          Just a moment...
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
  if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="w-[90%] md:w-[85%] mx-auto my-7 ">
      <h2 className="text-xl md:text-3xl font-bold mb-6 "><span className="text-green-600">My</span> Orders :</h2>

      <div className="space-y-10 ">
        {orders.slice().reverse().map((order) => (
          <div key={order._id} className="border-2 border-gray-200  rounded-lg p-5 bg-white shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-gray-700"><span className="text-green-600">Order ID: </span>{order._id}</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 border-2 border-gray-200 rounded p-3 items-center">
                  <Image width={500} height={500} src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-semibold text-lg">{item.product.title}</p>
                    <p><span className="text-green-600 font-semibold">Quantity:</span> {item.count}</p>
                    <p><span className="text-green-600 font-semibold">Price:</span> {item.price} EGP</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <p className="font-semibold text-xl"><span className="text-green-600 font-semibold ">Total:</span> {order.totalOrderPrice} EGP</p>
              <p className="text-gray-500">
                {new Date(order.createdAt).toLocaleString("en-EG", { dateStyle: "short", timeStyle: "short" })}
              </p>
            </div>

            <div className="mt-3 text-gray-700">
              <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress.details}, {order.shippingAddress.city} - {order.shippingAddress.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
