import { getProductsOfSpecificBrand } from "@/APIs/SpecificBrand.api";
import SingleProduct from "@/app/_components/SingleProduct/SingeProduct";
import { Product } from "@/types/product.type";

export default async function BrandDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getProductsOfSpecificBrand(id);

    console.log(data);
    return (
        <>
        {data.length !== 0 ? <div className="container w-[90%] mx-auto">
                <h2 className="text-xl md:text-3xl font-bold mt-7 mb-2"><span className="text-green-600">Shop</span> Popoular Products :</h2>
                <div className="flex flex-wrap">
                    {data.map((prod : Product) => {
                        return (
                            <SingleProduct prod={prod} key={prod._id} />
                        );
                    })}
                </div>
            </div> : <p className="text-center text-gray-500 text-lg mt-10">
                    No Products found for this Brand.
                </p>}
            
        </>
    );
}
