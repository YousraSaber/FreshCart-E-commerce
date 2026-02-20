import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/types/product.type";


export default function SingleBrand({ brand } : {brand :Brand}) {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
            <Link href={`/brands/${brand._id}`}>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md">

                    {/* Brand Image */}
                    <Image
                        src={brand.image}
                        alt={brand.name}
                        width={400}
                        height={400}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-green-700 flex items-center justify-center opacity-0 group-hover:opacity-85 transition-all duration-300">
                        <h3 className="text-white text-4xl font-bold text-center px-2">
                            {brand.name}
                        </h3>
                    </div>

                </div>
            </Link>
        </div>
    );
}
