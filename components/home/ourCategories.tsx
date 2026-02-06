"use client";

import { getCategories } from "@/reducers/categories/api";
import { ICategory } from "@/reducers/categories/categories";
import { RootState } from "@/store/store";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { setCategryId } from "@/reducers/filter/filter";

const OurCategories = () => {
    const ref = useRef<any>(null)
    const { isLoading, categories } = useSelector((state: RootState) => state.categories)
    const dispatch = useDispatch() as any
    const tt = useTranslations("home")

    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <section className="flex bg-white p-[5vh_2%] rounded-2xl dark:bg-[#1E2024] w-full gap-[1vh_2%] flex-wrap">
            <aside className="flex gap-4 items-center w-full">
                <h2 className="text-3xl  sm:text-4xl font-semibold">{tt("text6")}</h2>
            </aside>
            {categories &&
                categories.slice(0, 13).map((category: ICategory) => {
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
            {!isLoading && (
                <Link href={`/categories`} className="flex w-[49%] sm:w-[12%] h-[30vh] flex-col gap-[1.5vh] items-center text-center transition-all duration-300 cursor-pointer hover:text-[#FFC845]">
                    <div className="bg-[#F7F8F9] flex p-[1vh] items-center justify-center rounded-xl w-full h-[20vh]">
                        <div className="flex items-center justify-center bg-[#FFC845] text-white w-22 h-22 rounded-full p-3"><ArrowRight size={90} /></div>
                    </div>
                    <p>{tt("text7")}</p>
                </Link>
            )}
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
                </div>
            )}
        </section>
    )
}

export default OurCategories