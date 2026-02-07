"use client";

import { setCategryId, setOpen, setPrice, setQuery } from "@/reducers/filter/filter";
import { RootState } from "@/store/store";
import { ChartBar, Funnel } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { ICategory } from "@/reducers/categories/categories";
import { useEffect, useState } from "react";
import { getCategories } from "@/reducers/categories/api";
import { Slider } from "../ui/slider";

const Filters = () => {
    const { isOpen, categoryId, price, query } = useSelector((state: RootState) => state.filter)
    const { isLoading, categories } = useSelector((state: RootState) => state.categories)
    const dispatch = useDispatch() as any
    const t = useTranslations("filter")
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <div className={`sm:sticky sm:z-30 sm:top-4 transition-all duration-1000 flex flex-col gap-[2vh] sm:h-[80vh] ${isOpen ? "w-full h-[80vh]" : "h-[6vh] w-[14%] sm:w-[3.6%]"} max-w-full sm:max-w-[20%]`}>
            <button onClick={() => dispatch(setOpen())} className={`flex gap-3 transition-all p-[2vh] hover:text-[#FFC845] cursor-pointer font-semibold ${isOpen ? "text-[#FFC845]" : ""} rounded-md duration-1000 w-full bg-white dark:bg-[#1E2024] items-center`}><Funnel /> {isOpen ? t("text1") : ""}</button>
            <div className={`flex flex-col max-h-[50vh] overflow-y-auto gap-[1vh] bg-white transition-all duration-1000 dark:bg-[#1E2024] p-[2vh_0] rounded-md overflow-x-hidden ${isOpen ? "w-full p-[2vh_2vh]" : "w-[0%]"}`}>
                <input className="p-[1vh_20px] rounded-md border" value={query} onChange={(e) => dispatch(setQuery(e.target.value))} type="search" placeholder={t("text7")} />
            </div>
            <div className={`flex flex-col max-h-[50vh] overflow-y-auto gap-[1vh] bg-white transition-all duration-1000 dark:bg-[#1E2024] p-[2vh_0] rounded-md overflow-x-hidden ${isOpen ? "w-full p-[2vh_2vh]" : "w-[0%]"}`}>
                <p className="font-semibold text-xl mb-[2vh]">{t("text2")}</p>
                {!isLoading && !categories && (
                    <div className="flex text-center font-semibold text-[#1e202492] dark:text-[#ffffff41] flex-col w-full items-center justify-center gap-[1vh]">
                        <ChartBar />
                        <p>{t("text3")}</p>
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col gap-[1vh] w-full">
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                        <Skeleton className="w-full h-[4vh] rounded-md" />
                    </div>
                )}
                {!isLoading && categories && (<button className={`font-semibold w-full text-start transition-all duration-500 hover:text-[#FFC845] ${!categoryId ? "text-[#FFC845]" : "text-[#1e202492] dark:text-[#ffffff41]"}`} onClick={() => dispatch(setCategryId(null))}>{t("text6")}</button>)}
                {categories &&
                    categories.map((category: ICategory) => {
                        return <button key={category.id} className={`font-semibold w-full text-start transition-all duration-500 hover:text-[#FFC845] ${categoryId == category.id ? "text-[#FFC845]" : "text-[#1e202492] dark:text-[#ffffff41]"}`} onClick={() => dispatch(setCategryId(category.id))}>{category.title}</button>
                    })
                }
            </div>
            <div className={`flex flex-col max-h-[50vh] overflow-y-auto gap-[1vh] bg-white transition-all duration-1000 dark:bg-[#1E2024] p-[2vh_0] rounded-md overflow-x-hidden ${isOpen ? "w-full p-[2vh_2vh]" : "w-[0%]"}`}>
                <div className="flex justify-between w-full flex-wrap gap-y-[1vh]">
                    <p className="font-semibold text-xl mb-[2vh]">{t("text4")}</p>
                    <span className="text-muted-foreground text-sm">{price.join(", ")}</span>
                </div>
                <Slider
                    id="slider-demo-temperature"
                    value={price}
                    onValueChange={(e: [number, number]) => dispatch(setPrice(e))}
                    min={0}
                    max={1000000}
                    step={1}
                />
            </div>
        </div>
    )
}

export default Filters