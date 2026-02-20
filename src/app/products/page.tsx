import React from "react";
import SingleProduct from "../_components/SingleProduct/SingeProduct";
import getAllProducts from "@/APIs/AllProducts.api";
import { Product } from "@/types/product.type";


export default async function Products() {
  
  const data = await getAllProducts()
  console.log(data);

  return (
    <>
      <div className="container w-[90%] mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mt-7 mb-2"><span className="text-green-600">Shop</span> Popoular Products :</h2>
        <div className="flex flex-wrap">
          {data.map((prod : Product) => {
            return (
              <SingleProduct prod={prod} key={prod._id}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
