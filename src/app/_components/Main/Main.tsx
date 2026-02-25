"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Main() {
  const { data: session } = useSession();

  return (
    <section className="bg-white dark:bg-gray-900 w-[90%] mx-auto overflow-hidden">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:py-20 py-10 flex flex-col-reverse items-center">

        {/* Left text */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center items-start text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 dark:text-white">
            Everything You Need,{" "}
            <span className="text-green-600">All In One Place</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-6 max-w-2xl">
            Discover thousands of products across multiple categories. Shop smarter,
            faster, and easier with Fresh Cart.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                href={session ? "/products" : "/login"}
                className="px-6 py-3 text-sm md:text-base font-semibold text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300"
              >
                Start Shopping
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                href="/categories"
                className="px-6 py-3 text-sm md:text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Browse Categories
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          className="lg:col-span-5 w-full lg:h-100 h-75 relative mb-8 lg:mb-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Fresh Cart Hero"
            fill
            className="rounded-xl object-cover"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
