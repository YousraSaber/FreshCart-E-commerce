

import getAllBrands from "@/APIs/AllBrands.api";
import SingleBrand from "../_components/SingleBrand/SingleBrand";
import { Brand } from "@/types/product.type";


export default async function Brands() {
  
  const data = await getAllBrands()
  console.log(data);

  return (
    <>
      <div className="container w-[90%] mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mt-7 mb-2"><span className="text-green-600">Shop</span> Popoular Brands :</h2>
        <div className="flex flex-wrap">
          {data.map((brand :Brand) => {
            return (
              <SingleBrand brand={brand} key={brand._id}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
