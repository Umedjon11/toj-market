"use client"

import OurCategories from "@/components/home/ourCategories"
import OurShops from "@/components/home/ourShops"
import Products from "@/components/home/products"

const page = () => {
  
  return (
    <main className="flex flex-col gap-[5vh] items-center w-[95%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
      <section className="bg-[url(https://storage.alifshop.tj/media/images/settings/889/banner-1768986725528.jpg)] rounded-2xl w-full h-[80vh] bg-cover repeat-0 bg-center cursor-pointer" />
      <Products />
      <section className="bg-[url(https://storage.alifshop.tj/media/images/settings/687/banner-1762322057590.png)] rounded-2xl w-full h-[80vh] bg-cover repeat-0 bg-center cursor-pointer" />
      <OurCategories />
      <section className="bg-[url(https://storage.alifshop.tj/media/images/settings/899/banner-1768912886295.jpg)] rounded-2xl w-full h-[80vh] bg-cover repeat-0 bg-center cursor-pointer" />
      <OurShops />
    </main>
  )
}

export default page