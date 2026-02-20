import { getSpecificCategory } from "@/APIs/SpecificCategory.api";
import { Category } from "@/types/product.type";
import Link from "next/link";

export default async function CategoryDetails({ params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await getSpecificCategory(id);

    return (
        <div className="container w-[90%] mx-auto py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
                <span className="text-green-600">Sub</span> Categories
            </h2>
            {data.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No subcategories found for this category.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map((categ: Category) => (
                        <Link href={`/categories/${id}/${categ._id}`} key={categ._id}>
                            <div
                                className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center justify-center
                               hover:shadow-2xl hover:scale-105 transition-all duration-300 "
                            >
                                <div className="flex items-center justify-center w-20 h-20 mb-4 bg-green-100 rounded-full">
                                    <span className="text-xl font-bold text-green-600">{categ.name[0]}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 text-center">{categ.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

