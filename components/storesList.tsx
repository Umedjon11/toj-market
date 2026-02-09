"use client"

import { useTranslations } from "next-intl"
import { Skeleton } from "./ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { IShop } from "@/reducers/products/products"
import Link from "next/link"
import { useEffect } from "react"
import { getShops } from "@/reducers/shops/api"
import { Crown } from "lucide-react"

const StoresList = () => {
    const tt = useTranslations("home")
    const { isLoading, shops } = useSelector((state: RootState) => state.shops)
    const dispatch = useDispatch() as any

    useEffect(() => {
        dispatch(getShops())
    }, [])

  return (
    <section className="flex bg-white p-[7vh_2%] rounded-2xl dark:bg-[#1E2024] w-full gap-[1vh_2%] flex-wrap">
        <aside className="flex gap-4 items-center w-full">
          <h2 className="text-3xl  sm:text-4xl font-semibold">{tt("text8")}</h2>
        </aside>
        {shops &&
          shops.map((store: any) => {
            return <Link href={`/stores/${store.id}`} className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center transition-all duration-300 cursor-pointer hover:text-[#FFC845]" key={store.id}>
              <div className="bg-[#F7F8F9] flex p-[1vh] items-center justify-center rounded-xl w-full h-[20vh]">
                <img
                  src={store.avatar}
                  alt={store.title}
                  width={100}
                  height={100}
                  className="w-fit h-fit max-w-[99%] max-h-[18vh] rounded-xl"
                />
              </div>
              <p className={`flex gap-4 items-center font-semibold ${+store.avg_crowns > 0 ? "text-[#FFC845]" : "text-[#D1D3D4]"}`}><Crown className="fill-[#FFC845] stroke-[#FFC845]" /> {+store.avg_crowns > 0 ? store.avg_crowns : tt("text9")}</p>
              <p>{store.title}</p>
            </Link>
          })
        }
        {isLoading && (
          <div className="flex bg-white p-[7vh_2%] rounded-2xl dark:bg-[#1E2024] w-full gap-[1vh_2%] flex-wrap">
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div><div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[40%] h-[3vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
          </div>
        )}
      </section>
  )
}

export default StoresList