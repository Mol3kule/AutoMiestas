import Link from "next/link";

export const FooterBar = async () => {
    return (
        <div className={`flex items-center gap-[1.25rem] px-[1.87rem] laptop:px-[15.5rem] hd:px-[31.25rem] py-[1.5rem] bg-highlight_secondary`}>
            <FooterNavigationLink href={`/`} text={`Automiestas.lt`} style={`font-medium`}/>
            <FooterNavigationLink href={`/`} text={`Kontaktai`}/>
            <FooterNavigationLink href={`/rules`} text={`Taisyklės`}/>
            <FooterNavigationLink href={`/`} text={`D.U.K`}/>
            <FooterNavigationLink href={`/`} text={`Privatumo politika`}/>
        </div>
    )
};

const FooterNavigationLink = ({ text, href, style }: { text: string, href: string, style?: string }) => {
    return (
        <Link href={href}>
            <span className={`text-sm full_hd:text-sm_2xl text-primary ${style} hover:opacity-80 transition-all duration-300`}>{text}</span>
        </Link>
    )
}