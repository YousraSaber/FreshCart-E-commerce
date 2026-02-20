"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-200 select-none">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h2>

      <p className="mt-2 text-gray-500 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
        removed or you may have mistyped the URL.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
