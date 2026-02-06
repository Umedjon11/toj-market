"use client"
import { getUserInfo } from "@/api/user/userInfo"
import { MenuIcon, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { getAccessToken, removeTokens } from "@/utils/axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { getCartProducts } from "@/reducers/cart/api"
import { getUser } from "@/reducers/user/api"
import { Skeleton } from "./ui/skeleton"

const Header = () => {
  const path = usePathname()
  const api = process.env.NEXT_PUBLIC_DATA_API
  const t = useTranslations("navbar")
  const { user, isLoadingUser } = useSelector((state: RootState) => state.userInfo)
  const { cartProducts } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch() as any
  const token = getAccessToken()

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])
  useEffect(() => {
    dispatch(getUser())
  }, [token])

  return (
    <nav className="sticky mb-2 z-100 p-[2vh_2%] w-[98%] ml-[1%] rounded-full dark:text-white mt-3 top-3 backdrop-blur-lg font-main transition-all duration-300 flex justify-between items-center">
      <Image
        draggable={false}
        src="/logo.png"
        alt="logo"
        className="w-23 h-8"
        width={150}
        height={100}
      />
      <div className="hidden sm:flex gap-10 items-center">
        <Link href="/" className={`hover:text-[#F5C70E] pl-2 pr-2 border-b-[#F5C70E] pb-1 transition-all duration-300 hover:border-b-2 ${path == "/en" || path == "/ru" || path == "/tj" ? "text-[#F5C70E] border-b-2 border-b-[#F5C70E]" : ""}`}>{t("text6")}</Link>
        <Link href="/products" className={`hover:text-[#F5C70E] pl-2 pr-2 border-b-[#F5C70E] pb-1 transition-all duration-300 hover:border-b-2 ${path.includes("/products") ? "text-[#F5C70E] border-b-2 border-b-[#F5C70E]" : ""}`}>{t("text7")}</Link>
        <Link href="/about" className={`hover:text-[#F5C70E] pl-2 pr-2 border-b-[#F5C70E] pb-1 transition-all duration-300 hover:border-b-2 ${path.includes("/about") ? "text-[#F5C70E] border-b-2 border-b-[#F5C70E]" : ""}`}>{t("text8")}</Link>
        <Link href="/stores" className={`hover:text-[#F5C70E] pl-2 pr-2 border-b-[#F5C70E] pb-1 transition-all duration-300 hover:border-b-2 ${path.includes("/stores") ? "text-[#F5C70E] border-b-2 border-b-[#F5C70E]" : ""}`}>{t("text9")}</Link>
      </div>
      <div className="flex gap-4 items-center">
        {user && !isLoadingUser && (<Link href="/profile/cart"><ShoppingCart className={`hover:text-[#F5C70E] transition-all duration-300 cursor-pointer ${path.includes("/profile/cart") ? "text-[#F5C70E]" : ""}`} /> {cartProducts.length > 0 && (<span className={`bg-[#F1BB49] text-white rounded-full ${cartProducts.length < 10 ? "p-[0_5px] text-[10px]" : "text-[8px] p-[2px_3px]"} fixed top-4.5 ml-4`}>{cartProducts.length < 10 ? cartProducts.length : "9+"}</span>)}</Link>)}
        <AnimatedThemeToggler className="cursor-pointer" />
        {isLoadingUser ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Skeleton className="rounded-full w-9 h-9" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => {
                  removeTokens()
                  window.location.pathname = "/login"
                }}>{t("text4")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  removeTokens()
                  window.location.pathname = "/register"
                }}>{t("text5")}</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : user && !isLoadingUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img src={user.avatar ? `${api}${user.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="avatar" width={40} className="w-9 h-9 cursor-pointer bg-white rounded-full" height={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>{t("text1")}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => window.location.pathname = "/profile"}>{t("text2")}</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  removeTokens()
                  window.location.pathname = "/login"
                }}>{t("text3")}</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/login"} className="hover:text-[#F5C70E] transition-all duration-300 cursor-pointer">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Header