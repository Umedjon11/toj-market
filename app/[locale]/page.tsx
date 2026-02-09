"use client"

import OurCategories from "@/components/home/ourCategories"
import OurShops from "@/components/home/ourShops"
import Products from "@/components/home/products"

const page = () => {

  return (
    <main className="flex flex-col gap-[5vh] items-center w-[95%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
      <section className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] bg-[url('https://storage.alifshop.tj/media/images/settings/889/banner-1768986725528.jpg')] bg-center bg-no-repeat bg-cover rounded-2xl cursor-pointer"/>
      <Products />
      <section className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] bg-[url('https://storage.alifshop.tj/media/images/settings/687/banner-1762322057590.png')] bg-center bg-no-repeat bg-cover rounded-2xl cursor-pointer"/>
      <OurCategories />
      <section className="w-full h-[40vh] md:h-[60vh] lg:h-[80vh] bg-[url('https://storage.alifshop.tj/media/images/settings/899/banner-1768912886295.jpg')] bg-center bg-no-repeat bg-cover rounded-2xl cursor-pointer"/>
      <OurShops />
    </main>
  )
}

export default page