import Beam from "@/components/beam";
import { useTranslations } from "next-intl"

const About = () => {
    const t = useTranslations("about")

    return (
        <main className="flex flex-col gap-[10vh] items-center pb-[15vh] w-[95%] m-[0_auto]">
            <h2 className="text-3xl sm:text-5xl font-semibold">{t("text1")} <span className="text-[#FFC845]">Toj Market</span></h2>
            <section className="flex w-full gap-[3vh_4%] items-center">
                <p className="font-semibold text-[#00000054] dark:text-[#ffffff58]">{t("text2")}</p>
                <img
                    src={"https://i.ytimg.com/vi/ZmeZ56L0lTQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA8cjrLbQcCRKDI-CPjPmyVgXbRJQ"}
                    alt="image"
                    width={1100}
                    height={600}
                    draggable={false}
                    className="rounded-xl"
                />
            </section>
            <h2 className="text-3xl font-semibold">{t("text3")}</h2>
            <p className="font-semibold text-[#00000054] dark:text-[#ffffff58]">{t("text4")}</p>
            <h2 className="text-3xl font-semibold">{t("text6")}</h2>
            <Beam />
            <h2 className="text-3xl font-semibold">{t("text5")}</h2>
            <iframe className="w-full h-[80vh] rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d641.6567398389748!2d68.91396540466043!3d37.86600615470701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38c9f7e53f5a551d%3A0x494a20ed5ca51969!2z0KHQsNGA0LHQsNC90LQsINCi0LDQtNC20LjQutC40YHRgtCw0L0!5e1!3m2!1sru!2s!4v1770126828808!5m2!1sru!2s" width="600" height="450" style={{ border: 0 }} loading="lazy"></iframe>
        </main>
    )
}

export default About