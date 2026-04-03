"use client"

import { NumberTicker } from "@/components/ui/number-ticker"
import { Skeleton } from "@/components/ui/skeleton"
import { getCartProducts } from "@/reducers/cart/api"
import { ICartProduct } from "@/reducers/cart/cart"
import { createOrder } from "@/reducers/orders/api"
import { RootState } from "@/store/store"
import { Info } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Design = () => {
  const t = useTranslations("cart")
  const tt = useTranslations("design")
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
    <main className="flex gap-y-[4vh] flex-col sm:flex-row sm:justify-between items-start w-[90%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
      <section className="w-full sm:w-[65%] flex flex-col gap-[3vh]">
        <p className="font-semibold text-3xl mt-[2vh]">{tt("text7")}</p>
        <aside className="flex bg-white dark:bg-[#1E2024] p-[2vh_2%] rounded-xl flex-col gap-[3vh] w-full">
          <p className="font-semibold">{tt("text2")}</p>
          <input required suppressHydrationWarning={true} className="w-full p-[1.5vh_20px] rounded-xl border" placeholder={tt("text3")} />
          <input required suppressHydrationWarning={true} className="w-full p-[1.5vh_20px_10vh_20px] rounded-xl border" placeholder={tt("text4")} />
        </aside>
        <aside className="flex bg-white dark:bg-[#1E2024] p-[3vh_4%] sm:p-[3vh_2%] rounded-xl flex-col gap-[3vh] w-full">
          <h2 className="text-2xl font-semibold flex items-center justify-between mb-[2vh] rounded-xl w-full">{tt("text1")} <span className="text-[14px]">{cartProducts ? cartProducts.length : 0}</span></h2>
          {
            cartProducts.map((cartProduct: ICartProduct) => {
              return <div key={cartProduct.id} className="flex w-full justify-between items-center bg-white dark:bg-[#1E2024] rounded-xl">
                <p className="font-semibold">{cartProduct.product_name}</p>
                <div className="font-semibold ml-auto">
                  <NumberTicker
                    value={+cartProduct.product_price * cartProduct.quantity}
                    decimalPlaces={0}
                    className="tracking-tighter whitespace-pre-wrap text-black dark:text-white"
                  /> c
                </div>
              </div>
            })
          }
          {!isLoading && (
            <div className="flex mt-[2vh] p-[1.5vh] bg-[#F7F8F9] dark:bg-[#f7f8f922] w-full gap-3 items-center font-semibold rounded-xl text-[13px]">
              <Info />
              <p>{tt("text6")}</p>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col gap-[3vh] w-full">
              <Skeleton className="w-full h-[12vh] rounded-xl" />
              <Skeleton className="w-full h-[12vh] rounded-xl" />
              <Skeleton className="w-full h-[12vh] rounded-xl" />
              <Skeleton className="w-full h-[12vh] rounded-xl" />
            </div>
          )}
        </aside>
      </section>
      <section className="bg-white sm:mt-[10vh] dark:bg-[#1E2024] p-[3vh_5%] sm:p-[3vh_2%] w-full sm:w-[33%] rounded-xl flex flex-col gap-[1vh]">
        <p className="font-semibold text-2xl mb-[2vh]">{tt("text8")}</p>
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
        <button suppressHydrationWarning={true} onClick={() => dispatch(createOrder())} className="p-[1.5vh_0] rounded-md mt-[1vh] transition-all duration-500 bg-[#FFC845] hover:bg-[#ffc745b3] text-white font-semibold text-center">{t("text7")}</button>
      </section>
    </main>
  )
}

export default Design