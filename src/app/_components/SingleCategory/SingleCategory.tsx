import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/product.type";


export default function SingleCateg({ categ } :{categ : Category}) {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <Link href={`/categories/${categ._id}`}>
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-white ">

                    {/* Image Container */}
                    <div className="flex items-center justify-center h-80 bg-gray-100">
                        <Image
                            src={categ.image}
                            alt={categ.name}
                            width={400}
                            height={400}
                            className=" w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                        <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-2">
                            {categ.name}
                        </h3>
                    </div>

                </div>
                    {/* Optional name below image */}
                    <div className="p-4 text-center">
                        <h3 className="text-black text-lg md:text-xl lg:text-2xl font-bold">{categ.name}</h3>
                    </div>
            </Link>
        </div>


    );
}
