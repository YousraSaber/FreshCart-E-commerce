"use client";

import { getUserWishlist } from "@/WishlistActions/getUserWishlist.action";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { Wishlist2 } from "@/types/wishlist"; // تأكدي إن النوع موجود

// ==========================
// Type of Context
// ==========================
type WishlistContextType = {
  wishlistProducts: Wishlist2[];
  setWishlistProducts: React.Dispatch<React.SetStateAction<Wishlist2[]>>;

  numberOfWishlistItems: number;
  setNumberOfWishlistItems: React.Dispatch<React.SetStateAction<number>>;

   refreshWishlist: () => Promise<void>;
};


// ==========================
// Create Context
// ==========================
export const WishlistContext = createContext<WishlistContextType | null>(null);

// ==========================
// Provider Props Type
// ==========================
type WishlistContextProviderProps = {
  children: React.ReactNode;
};

// ==========================
// Provider
// ==========================
export function WishlistContextProvider({
  children,
}: WishlistContextProviderProps) {
  
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState<number>(0);
  const [wishlistProducts, setWishlistProducts] = useState<Wishlist2[]>([]);

  const { status } = useSession();

  async function getLoggedUserWishlist() {
    const res = await getUserWishlist();

    if (res.status === "success") {
      setNumberOfWishlistItems(res.data.length);
      setWishlistProducts(res.data);
    } else {
      setNumberOfWishlistItems(0);
      setWishlistProducts([]);
      

    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getLoggedUserWishlist();
    }

    if (status === "unauthenticated") {
      setNumberOfWishlistItems(0);
      setWishlistProducts([]);
    }
  }, [status]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistProducts,
        setWishlistProducts,
        numberOfWishlistItems,
        setNumberOfWishlistItems,
        refreshWishlist: getLoggedUserWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
