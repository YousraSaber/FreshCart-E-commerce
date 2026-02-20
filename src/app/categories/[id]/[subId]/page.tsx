import getAllProducts from "@/APIs/AllProducts.api";
import SingleProduct from "@/app/_components/SingleProduct/SingeProduct";
import { Product } from "@/types/product.type";


export default async function ProductsOfSpecificCategory({ params }: { params: { id: string, subId: string } }) {
    const { id, subId } = await params; // id = parent category, subId = current subCategory

    const allProducts = await getAllProducts();
    const filteredProducts = allProducts.filter((product :Product) =>
        product.subcategory.some((sub: { _id: string }) => sub._id === subId)
    );

    console.log("Filtered Products:", filteredProducts);
    return (
        <>
            {filteredProducts.length !== 0 ? <div className="container w-[90%] mx-auto">
                <h2 className="text-xl md:text-3xl font-bold mt-7 mb-2"><span className="text-green-600">Shop</span> Popoular Products :</h2>
                <div className="flex flex-wrap">
                    {filteredProducts.map((prod: Product) => {
                        return (
                            <SingleProduct prod={prod} key={prod._id} />
                        );
                    })}
                </div>
            </div> : <p className="text-center text-gray-500 text-lg mt-10">
                    No subcategories found for this category.
                </p>}
        </>
    )
}
