"use client"

import { addWish, clearWish, getMyWish, isWished } from "@/api/wish/wishList"
import { addToCart } from "@/reducers/cart/api"
import { IProduct } from "@/reducers/products/products"
import { Crown, Heart, ShoppingCart } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const Wish = () => {
  const t = useTranslations("wish")
  const tt = useTranslations("product")
  const [wish, setWish] = useState<IProduct[]>([])
  const dispatch = useDispatch() as any

  useEffect(() => {
    const myWish = getMyWish()
    setWish(myWish)
  }, [])
  return (
    <section className="flex gap-[2vh_2%] flex-wrap">
      <p className="flex gap-2 items-start text-2xl font-semibold w-full mb-[2vh]">{t("text1")} <span className="font-normal text-[13px]">{wish.length}</span> {wish.length != 0 && (
        <button onClick={() => {
          clearWish()
          const newWIsh = getMyWish()
          setWish(newWIsh)
        }} className="ml-auto text-[14px] font-medium text-[#336BFD] cursor-pointer">{t('text2')}</button>
      )}</p>
      {
        wish.map((product: IProduct) => {
          return <div key={product.id} className="w-full sm:w-[30.5%] flex flex-col gap-[1vh] rounded-xl p-[1vh]">
            {product.discount > 0 && (<p className="rounded-md p-[0.5vh_10px] absolute bg-[#FF4444] ml-[2vh] mt-[34.5vh] w-fit text-white">-{product.discount}%</p>)}
            <button onClick={() => {
              addWish(product)
              const newWish = getMyWish()
              setWish(newWish)
            }} className={`rounded-full p-[0.5vh] absolute ml-[3vh] mt-[2.5vh] w-fit cursor-pointer`}><Heart className={`${isWished(wish, product.id) ? "fill-[#FF4444] stroke-[#FF4444]" : "stroke-[black]"}`} /></button>
            <div className="p-[1vh] rounded-xl flex items-center justify-center bg-[#F7F8F9] w-full h-[40vh]">
              <img
                src={product.main_image ? `${product.main_image}` : "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"}
                alt={product.main_image}
                width={100}
                height={100}
                className="w-fit h-fit max-h-[38vh] rounded-xl"
              />
            </div>
            <div className="flex gap-5 mt-[1vh] items-center flex-wrap">
              {product.discount > 0 && (<p className="font-semibold flex gap-2">{((+product.price / 100) * (100 - product.discount)).toFixed(2)} c</p>)}
              <p className={`${product.discount > 0 ? "line-through" : "font-semibold"}`}>{product.price} c</p>
            </div>
            <Link href={`/products/${product.id}`} className="text-xl transition-all duration-300 hover:text-[#FFC845] font-bold">{product.title}</Link>
            <p className={`${+product.avg_crowns > 0 ? "text-[#FFC845]" : "text-[#D1D3D4]"} font-semibold flex`}>{+product.avg_crowns > 0 ? (<span className="flex gap-2 items-center"><Crown className="fill-[#FFC845] stroke-[#FFC845]" /> {product.avg_crowns}</span>) : (<span className="flex gap-2 items-center"><Crown />{tt("text3")}</span>)}</p>
            <button onClick={() => dispatch(addToCart(product.id))} className="flex gap-3 items-center justify-center font-semibold text-white w-[98%] hover:bg-[#ffc745db] m-[0_auto] p-[1vh_0] mb-[1vh] mt-[1vh] border-[#FFC845] bg-[#FFC845] transition-all duration-500 cursor-pointer rounded-xl border"><ShoppingCart /> {tt("text1")}</button>
          </div>
        })
      }
      {wish.length == 0 && (
        <div className="w-full m-[20vh_0] text-[#00000023] dark:text-[#ffffff22] flex flex-col gap-[2vh] items-center justify-center">
          <Heart size={100} />
          <p>{t("text3")}</p>
          <Link href={"/products"} className="text-white hover:bg-[#ffc745db] p-[1vh_30px] border-[#FFC845] bg-[#FFC845] transition-all duration-500 cursor-pointer rounded-md">{t("text4")}</Link>
        </div>
      )}
    </section>
  )
}

export default Wish