"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Navbar as MyNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import img from "../../../../public/images/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/Context/CartContext";
import { WishlistContext } from "@/Context/WishlistContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { numberOfItems, setNumberOfItems } = useContext(CartContext)!;
  const { numberOfWishlistItems, setNumberOfWishlistItems } = useContext(WishlistContext)!


  // Navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "My Orders", href: "/allorders" }
  ];

  // Social links
  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaYoutube />, href: "https://youtube.com" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
  ];

  function logOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <MyNavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" aria-label="Go to home">
            <Image
              src={img}
              alt="Fresh Cart Logo"
              width={150}
              height={32}
              priority
              className="cursor-pointer"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop nav links */}
      <NavbarContent className="hidden sm:flex gap-7">
        {navLinks.map((link) =>
          (link.label == "Cart" || link.label === "My Orders") && !session ? (
            ""
          ) : (
            <NavbarItem key={link.href}>
              <Link
                href={link.href}
                className={`text-sm md:text-lg font-medium transition relative
  ${pathname === link.href
                    ? "text-green-600"
                    : "hover:text-green-600"}
`}
              >
                {link.label === "Cart" ? (
                  <>
                    {link.label}
                    {numberOfItems > 0 && (
                      <span className="absolute top-[-10px] end-[-15px] text-white flex items-center justify-center bg-green-600 p-2 rounded-full size-5 text-xs">
                        {numberOfItems}
                      </span>
                    )}
                  </>
                ) : (
                  link.label
                )}
              </Link>
            </NavbarItem>
          ),
        )}
      </NavbarContent>

      {/* Right side: social icons + toggle + auth */}
      <NavbarContent justify="end" className="flex items-center gap-6">
        {/* Desktop social icons */}
        {!session ? (
          <>
            <div className="hidden md:flex gap-3">
              {socialLinks.map((item, index) => (
                <NavbarItem key={index}>
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-sm hover:text-green-600 transition"
                  >
                    {item.icon}
                  </Link>
                </NavbarItem>
              ))}
            </div>

            {/* Auth buttons (desktop) */}
            <div className="hidden md:flex gap-2 justify-center items-center">
              <NavbarItem>
                <Link href="/login" className="font-semibold me-1.5">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </div>
          </>
        ) : (
          <div className="hidden md:flex gap-2 justify-center items-center">

            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <i className="fa-solid fa-circle-user text-gray-600 text-2xl cursor-pointer"></i>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" variant="light" >
                  <DropdownItem key="new" className="bg-transparent">
                    <span className="font-bold text-md border-b-gray-300"><span className="text-green-700">Welcome,</span> {session.user?.name}</span>
                  </DropdownItem>
                  <DropdownItem key="copy">
                    <Link href={"/changePassword"} className="font-semibold">Change Password</Link>
                  </DropdownItem>
                  <DropdownItem key="delete" className="text-danger" color="danger">
                    <span
                      onClick={logOut}
                      className=" font-semibold"
                    >
                      Sign Out
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <Link href="/wishlist" className="font-semibold me-1.5 relative">
                <i className="fa-solid fa-heart text-2xl text-red-600 "></i>
                <span className="absolute top-[-15px] end-[-15px] text-white flex items-center justify-center bg-green-600 p-2 rounded-full size-5 text-xs">
                  {numberOfWishlistItems}
                </span>
              </Link>
            </NavbarItem>
          </div>
        )}

        {/* Hamburger toggle (mobile) */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {session ? <span className="font-bold text-xl"><span className="text-green-700">Welcome,</span> {session.user?.name}</span> : ""}
        {/* Nav links */}
        {navLinks.map((link) =>
          (link.label == "Cart" || link.label === "My Orders") && !session ? (
            ""
          ) : (
            <NavbarMenuItem key={link.href}>
              <Link
                className="flex items-center"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label === "Cart" ? (
                  <>
                    {link.label}
                    {numberOfItems > 0 && (
                      <span className=" ms-1 text-white flex items-center justify-center bg-green-600 p-2 rounded-full size-5 text-xs">
                        {numberOfItems}
                      </span>
                    )}
                  </>
                ) : (
                  link.label
                )}
              </Link>
            </NavbarMenuItem>
          ),
        )}
        {session ? <Link href="/wishlist" className="me-1.5 flex items-center">
          Wishlist<i className="fa-solid fa-heart relative text-lg text-red-600">
            <span className="absolute text-[8px] text-white bg-green-600 size-5 rounded-full end-[-10px] top-[-15px] flex items-center justify-center">{numberOfWishlistItems}</span>
          </i>

        </Link> : ""}
        {!session ? (
          <>
            {/* Auth buttons (mobile) */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                as={Link}
                href="/login"
                className="bg-gray-300 font-semibold"
                variant="flat"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Sign Up
              </Button>
            </div>

            {/* Social icons (mobile) */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="text-xl"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col text-center gap-3 mt-6">
            <Button
              onPress={logOut}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Sign Out
            </Button>
            <Link href={"/changePassword"} className="underline text-gray-600">Change Your Password?</Link>
          </div>
        )}
      </NavbarMenu>
    </MyNavbar>
  );
}
