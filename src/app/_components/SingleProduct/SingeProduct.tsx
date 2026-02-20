"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import AddBtnWishlist from "../AddBtnWishlist/AddBtnWishlist";
import { useSession } from "next-auth/react";

export default function SingleProduct({ prod }: { prod: Product }) {

  const { data: session } = useSession();
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" key={prod._id}>
        <div className="p-1.5">
          <Card className="border-2 border-gray-100 p-4">
            <CardHeader className="px-0">
              <Link href={`/products/${prod._id}`}>
                <CardTitle>
                  <Image
                    src={prod.imageCover}
                    className="w-full"
                    alt="product image"
                    width={500}
                    height={500}
                  />
                </CardTitle>
              </Link>
              <CardDescription className="text-green-600 font-semibold flex justify-between items-center text-lg">
                <Link href={`/products/${prod._id}`}>
                  <span>{prod.category.name}</span>
                </Link>
                {session? <span><AddBtnWishlist id={prod.id} /></span> : ""}
              </CardDescription>
            </CardHeader>
            <Link href={`/products/${prod._id}`}>
              <CardContent className="px-0">
                <p className="line-clamp-1 text-xl font-semibold">
                  {prod.title}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between px-0">
                <span className="font-semibold">{prod.price} EGP</span>
                <span className="font-semibold flex gap-1 items-center">
                  <i className="fa fa-star text-amber-300"></i>
                  {prod.ratingsAverage}
                </span>
              </CardFooter>
            </Link>
            <AddBtnCart id={prod.id} />
          </Card>
        </div>
      </div>
    </>
  );
}
