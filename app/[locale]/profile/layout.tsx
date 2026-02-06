import SideBar from "@/components/sideBar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex sm:justify-between flex-col-reverse gap-y-[3vh] sm:flex-row w-full p-[4vh_4%] sm:p-[4vh_2.5%] pb-[15vh] m-[0_auto] sm:items-start bg-[white] min-h-[87vh] dark:bg-black">
            <SideBar />
            <section className="w-full sm:ml-auto sm:w-[72%] sm:mt-[4vh]">
                {children}
            </section>
        </main>
    );
}