"use client"

import { NumberTicker } from "@/components/ui/number-ticker"
import { Skeleton } from "@/components/ui/skeleton"
import { deleteItem, editItem, getCartProducts } from "@/reducers/cart/api"
import { ICartProduct } from "@/reducers/cart/cart"
import { RootState } from "@/store/store"
import { Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
  const t = useTranslations("cart")
  const { isLoading, cartProducts } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch() as any
  const [total, setTotal] = useState(0)

  const setingTotal = async () => {
    const res = await dispatch(getCartProducts())
    if (res) {
      console.log(res, "   /  ")
      const theTotalPrices = res?.payload?.map((product: ICartProduct) => {
        return +product.product_price * +product.quantity
      })
      console.log(theTotalPrices, "   /  ")
      const newTotal = theTotalPrices.reduce((price: number, tot: number) => {
        return price + tot
      }, 0)
      console.log(newTotal, "   /  ")
      setTotal(newTotal)
    }
  }
  useEffect(() => {
    setingTotal()
  }, [])

  return (
    <section className="flex gap-y-[4vh] flex-col sm:flex-row sm:justify-between w-full items-start">
      <aside className="flex flex-col gap-[3vh] w-full sm:w-[65%]">
        <h2 className="text-2xl font-semibold flex items-start gap-3 bg-[#F7F8F9] dark:bg-[#1E2024] p-[3vh_40px] rounded-xl w-full">{t("text1")} <span className="font-normal text-[14px] text-[#00000087] dark:text-white">{cartProducts ? cartProducts.length : 0}</span></h2>
        {
          cartProducts.map((cartProduct: ICartProduct) => {
            return <div key={cartProduct.id} className="flex w-full justify-between items-center bg-[#F7F8F9] dark:bg-[#1E2024] rounded-xl p-[3vh_3%]">
              <p className="text-xl font-semibold max-w-[50%] line-clamp-1">{cartProduct.product_name}</p>
              <div className="font-semibold ml-auto mr-[2vh] sm:mr-[10vh]">
                <NumberTicker
                  value={+cartProduct.product_price * cartProduct.quantity}
                  decimalPlaces={0}
                  className="tracking-tighter whitespace-pre-wrap text-black dark:text-white"
                /> c
              </div>
              <div className="flex flex-col gap-[1vh] text-center items-center">
                <div className="flex gap-3 items-center">
                  <button onClick={async () => {
                    if (cartProduct.quantity > 1) {
                      await dispatch(editItem({ id: cartProduct.id, product: cartProduct.product, quantity: cartProduct.quantity - 1 }))
                      setingTotal()
                    }
                    else {
                      await dispatch(deleteItem(cartProduct.id))
                      setingTotal()
                    }
                  }} className="cursor-pointer w-10 h-10 rounded-xl transition-all duration-500 font-semibold flex items-center justify-center bg-[#FFC845] hover:bg-[#ffc745b3]">{cartProduct.quantity == 1 ? (<Trash size={14} />) : "-"}</button>
                  <p className="flex justify-center items-center min-w-14 h-10 font-semibold">{cartProduct.quantity}</p>
                  <button onClick={async () => {
                    await dispatch(editItem({ id: cartProduct.id, product: cartProduct.product, quantity: cartProduct.quantity + 1 }))
                    setingTotal()
                  }} className="cursor-pointer w-10 h-10 rounded-xl transition-all duration-500 font-semibold flex items-center justify-center bg-[#FFC845] hover:bg-[#ffc745b3]">+</button>
                </div>
              </div>
            </div>
          })
        }
        {isLoading && (
          <div className="flex flex-col gap-[3vh] w-full">
            <Skeleton className="w-full h-[12vh] rounded-xl" />
            <Skeleton className="w-full h-[12vh] rounded-xl" />
            <Skeleton className="w-full h-[12vh] rounded-xl" />
            <Skeleton className="w-full h-[12vh] rounded-xl" />
          </div>
        )}
      </aside>
      <aside className="bg-[#F7F8F9] dark:bg-[#1E2024] p-[3vh_5%] sm:p-[3vh_2%] w-full sm:w-[33%] rounded-xl flex flex-col gap-[1vh]">
        <p className="font-semibold text-2xl mb-[2vh]">{t("text2")}</p>
        <div className="flex gap-2 items-end">
          <p className="font-semibold text-[#777777]">{t("text3")}</p>
          <p className="text-[#777777] w-full overflow-hidden">..................................................................................</p>
          <p>{cartProducts ? cartProducts.length : 0}</p>
        </div>
        <div className="flex gap-2 items-end">
          <p className="font-semibold text-[#777777]">{t("text4")}</p>
          <p className="text-[#777777] w-full overflow-hidden">...................................................................................</p>
          <div className="flex gap-1">
            <NumberTicker
              value={total}
              decimalPlaces={0}
              className="tracking-tighter whitespace-pre-wrap text-black dark:text-white"
            /> c
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <p className="font-semibold text-[#777777]">{t("text5")}</p>
          <p className="text-[#777777] w-full overflow-hidden">...................................................................................</p>
          <p className="flex gap-1">0 <span>c</span></p>
        </div>
        <div className="flex gap-2 items-end">
          <p className="font-semibold text-xl mt-[2vh]">{t("text6")}</p>
          <p className="text-[#777777] w-full overflow-hidden">...................................................................................</p>
          <div className="font-semibold flex gap-1">
            <NumberTicker
              value={total}
              decimalPlaces={0}
              className="tracking-tighter whitespace-pre-wrap text-black dark:text-white"
            /> c
          </div>
        </div>
        <Link className="p-[1.5vh_0] rounded-md mt-[1vh] transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745b3] text-white font-semibold text-center" href={"/design"}>{t("text7")}</Link>
      </aside>
    </section>
  )
}

export default Cart