import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { useTranslations } from "next-intl";

const TopOfDay = () => {
    const t = useTranslations("home")

    return (
        <Swiper
            dir="rtl"
            pagination={{
                clickable: true,
            }}
            autoplay={{ delay: 2000 }}
            keyboard={{
                enabled: true,
                onlyInViewport: false
            }}
            modules={[Pagination, Keyboard, Autoplay]}
            className="rounded-xl h-[80vh] w-full"
        >
            <SwiperSlide></SwiperSlide>
        </Swiper>
    )
}

export default TopOfDay