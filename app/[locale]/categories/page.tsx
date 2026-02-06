"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ICategory } from "@/reducers/categories/categories"
import { setCategryId } from "@/reducers/filter/filter"
import { RootState } from "@/store/store"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { getCategories } from "@/reducers/categories/api"

const Categories = () => {
  const { isLoading, categories } = useSelector((state: RootState) => state.categories)
  const tt = useTranslations("home")
  const dispatch  = useDispatch() as any

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <main className="flex flex-col gap-[5vh] min-h-[85vh] items-center w-[95%] m-[0_auto] pb-[15vh] bg-[#F7F8F9] dark:bg-black">
      <section className="flex bg-white p-[5vh_2%] rounded-2xl dark:bg-[#1E2024] w-full gap-[1vh_2%] flex-wrap">
        <aside className="flex gap-4 items-center w-full">
          <h2 className="text-3xl  sm:text-4xl font-semibold">{tt("text6")}</h2>
        </aside>
        {categories &&
          categories.map((category: ICategory) => {
            return <Link href={`/products`} onClick={() => dispatch(setCategryId(category.id))} className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center transition-all duration-300 cursor-pointer hover:text-[#FFC845]" key={category.id}>
              <div className="bg-[#F7F8F9] flex p-[1vh] items-center justify-center rounded-xl w-full h-[20vh]">
                <img
                  src={category.avatar}
                  alt={category.title}
                  width={100}
                  height={100}
                  className="w-fit h-fit max-w-[99%] max-h-[18vh] rounded-xl"
                />
              </div>
              <p>{category.title}</p>
            </Link>
          })
        }
        {isLoading && (
          <div className="flex bg-white p-[5vh_2%] rounded-2xl dark:bg-[#1E2024] w-full gap-[1vh_2%] flex-wrap">
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
            <div className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center">
              <Skeleton className="rounded-xl w-full h-[20vh]" />
              <Skeleton className="rounded-md w-[80%] h-[3vh]" />
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Categories