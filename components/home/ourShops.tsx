import { useDispatch, useSelector } from "react-redux"
import { ScrollVelocityContainer, ScrollVelocityRow } from "../ui/scroll-based-velocity"
import { RootState } from "@/store/store"
import { IShop } from "@/reducers/shops/shops"
import { Crown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { getShops } from "@/reducers/shops/api"
import { Skeleton } from "../ui/skeleton"

const OurShops = () => {
    const { isLoading, shops } = useSelector((state: RootState) => state.shops)
    const t = useTranslations("product")
    const tt = useTranslations("home")
    const dispatch = useDispatch() as any

    useEffect(() => {
        dispatch(getShops())
    }, [])

    return (
        <ScrollVelocityContainer className="bg-white p-[5vh_2%] rounded-2xl dark:bg-[#1E2024] w-full">
            <h2 className="text-3xl  sm:text-4xl w-full mb-[4vh] font-semibold">{tt("text5")}</h2>
            <ScrollVelocityRow baseVelocity={100}>
                {shops &&
                    shops.map((shop: IShop) => {
                        return <div key={shop.id} className="flex key={shop.id} pr-[10vh] gap-4 items-center">
                            <img
                                src={shop.avatar}
                                alt={`${shop.avatar}`}
                                width={60}
                                height={60}
                                draggable={false}
                                className="rounded-full"
                            />
                            {+shop.avg_crowns == 0 ?
                                (<p className="flex gap-1 font-semibold text-xl items-center text-[#D1D3D4]">{t("text3")}</p>) :
                                (<p className="flex gap-1 font-semibold text-xl items-center text-[#FFC845]"><Crown /> {shop.avg_crowns}</p>)
                            }
                        </div>
                    })
                }
                {isLoading ? (
                    <div className="flex pr-[10vh] key={shop.id} gap-4 items-center">
                        <Skeleton className="w-15 h-15 rounded-full" />
                        <Skeleton className="w-30 h-5 rounded-md" />
                    </div>
                ) : null}
            </ScrollVelocityRow>
        </ScrollVelocityContainer >
    )
}

export default OurShops