import { getSpecificProduct } from "@/APIs/SpecificProduct.api";
import AddBtnCart from "@/app/_components/AddBtnCart/AddBtnCart";
import AddBtnWishlist from "@/app/_components/AddBtnWishlist/AddBtnWishlist";
import SingleProduct from "@/app/_components/SingleProduct/SingeProduct";
import { getRelatedProducts } from "@/ProductCategoryAction/relatedProducts.action";
import { Product } from "@/types/product.type";
import Image from "next/image";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getSpecificProduct(id);
  if (!data) return <h1>No Products Details here.</h1>
  console.log(data)

  const res = await getRelatedProducts(data.category._id)



  console.log(data);
  return (
    <>
      <div className="container flex flex-col md:flex-row gap-5 w-[80%] mx-auto justify-center mt-10">
        <div className="w-full md:w-1/3 border-1.5 border-green-100 rounded-2xl">
          <Image width={200} height={200} src={data.imageCover} className="w-full rounded-2xl shadow-2xl" alt="product image" />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex flex-col gap-3 mt-4 ">
            <div className="flex justify-between items-center">
              <h2 className=" font-bold text-3xl">{data.title}</h2>
              <span><AddBtnWishlist id={data.id} /></span>
            </div>
            <p className="text-gray-600 text-lg">{data.description}</p>
            <h3 className="text-green-800 font-semibold">{data.category.name}</h3>
            <div className="flex items-center justify-between px-0 mt-8">
              <span className="font-semibold">{data.price} EGP</span>
              <span className="font-semibold flex gap-1 items-center">
                <i className="fa fa-star text-amber-300"></i>
                {data.ratingsAverage}
              </span>
            </div>
            <AddBtnCart id={data.id} />
          </div>
        </div>
      </div>

      <div className="container mt-20 w-[90%] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mt-7 mb-2"><span className="text-green-600">Related</span> Products :</h2>
        <div className="flex flex-wrap">
          {res.data.map((prod: Product) => {
            return (
              <SingleProduct prod={prod} key={prod._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}
