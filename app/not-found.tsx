import TojMarket from "@/components/tojMarket"
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NotFound = () => {
    const t = useTranslations('notFound');
    return (
        <main className="flex flex-col gap-[2vh] items-center orbitron justify-center w-full h-[86vh] sm:h-[87vh]">
            <TojMarket size={4} />
            <TypingAnimation loop={true} className="text-3xl sm:text-5xl font-bold">404 Not Found</TypingAnimation>
            <p className="font-semibold">This Page is not defined</p>
            <Link className="p-[1vh_20px] rounded-md transition-all duration-500 hover:p-[1vh_40px] border hover:bg-linear-to-br hover:bg-[#FFC845] hover:text-white " href={"/"}>{t("text3")}</Link>
        </main>
    )
}

export default NotFound