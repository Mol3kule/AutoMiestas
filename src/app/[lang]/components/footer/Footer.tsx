

export const Footer = () => {
    return (
        <footer className="mt-auto">
            <section className="bg-[#F7F7F8]">
                <div className={` mx-[20px] md:mx-[490px] py-[20px] flex flex-col gap-[15px]`}>
                    <p className={`flex justify-between font-medium`}>
                        <span className={`text-[#111] text-[14px]`}>{`Automiestas.lt`}</span>
                        <span className={`text-[#111] text-[11px]`}>{`Informacija`}</span>
                    </p>
                    <p className={`flex justify-between font-normal text-[11px]`}>
                        <span className={`text-[#111]`}>{`Tr. priemonių pardavimo skelbimų portalas. Patogu, Greita, Efektyvu!`}</span>
                        <span className={`text-[#9D9D9D]`}>{`Privatumo politika`}</span>
                    </p>
                    <p className={`flex justify-between font-normal text-[11px]`}>
                        <span className={`text-[#111]`}>{`Visos teisės saugomos ©️ 2023-2024 „Automiestas LTU“`}</span>
                        <span className={`text-[#9D9D9D]`}>{`Taisyklės`}</span>
                    </p>
                </div>
            </section>
            <section className={`bg-[#111] py-[15px]`}>

            </section>
        </footer>
    )
}