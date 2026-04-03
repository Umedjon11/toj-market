"use client"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion";
import Image from "next/image";
const About = () => {
    const t = useTranslations("about")
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };
    return (

        <main className="flex flex-col gap-24 sm:gap-32 items-center pb-24 w-[90%] max-w-7xl mx-auto overflow-hidden">
            <motion.section
                {...fadeInUp}
                className="text-center flex flex-col items-center gap-6 mt-12"
            >
                <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                    {t("text1")} <span className="text-[#FFC845] drop-shadow-sm">Toj Market</span>
                </h2>
                <div className="h-1.5 w-24 bg-[#FFC845] rounded-full" />
            </motion.section>
            <motion.section
                {...fadeInUp}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
            >
                <div className="order-2 lg:order-1 flex flex-col gap-6">
                    <h3 className="text-3xl font-bold">{t("text3")}</h3>
                    <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                        {t("text2")}
                    </p>
                </div>
                <div className="order-1 lg:order-2 relative group">
                    <div className="absolute -inset-4 bg-[#FFC845]/10 rounded-3xl blur-2xl group-hover:bg-[#FFC845]/20 transition-all" />
                    <Image
                        src="/Map.png"
                        alt="map"
                        width={550}
                        height={100}
                        className="w-full h-full rounded-xl"
                    />
                </div>
            </motion.section>
            <p className="text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                {t("text4")}
            </p>
            <motion.section
                {...fadeInUp}
                className="w-full flex flex-col items-center gap-10"
            >
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("text5")}</h2>
                </div>

                <div className="relative w-full h-[50vh] sm:h-[80vh] rounded-3xl overflow-hidden border-8 border-white dark:border-[#1E2024] shadow-2xl">
                    <iframe
                        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3121.123!2d68.78!3d38.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDM0JzEyLjAiTiA2OMKwNDYnNDguMCJF!5e0!3m2!1sru!2stj!4v1620000000000!5m2!1sru!2stj"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Google Maps"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-3xl" />
                </div>
            </motion.section>

        </main>
    )
}

export default About