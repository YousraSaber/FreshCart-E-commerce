

import getAllCategories from "@/APIs/AllCategories.api";
import SingleCateg from "../_components/SingleCategory/SingleCategory";
import { Category } from "@/types/product.type";



export default async function Categories() {
  
  const data = await getAllCategories()
  console.log(data);

  return (
    <>
      <div className="container w-[90%] mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mt-7 mb-2"><span className="text-green-600">Shop</span> Popoular Categories :</h2>
        <div className="flex flex-wrap">
          {data.map((categ :Category) => {
            return (
              <SingleCateg categ={categ} key={categ._id}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
