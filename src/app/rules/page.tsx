const Rules = [
    {
        title: 'Bendrosios nuostatos',
        rules: [
            "Naudojimasis svetaine ir paslaugomis yra nemokamas. Jeigu paslauga yra mokama - naudotojai yra informuojami apie tai.",

        ]
    },
    {
        title: "Skelbimų talpinimo nuostatos",
        rules: [
            "Skelbimo talpintojas prisiima visą atsakomybę už informaciją kurią talpina Automiestas.lt skelbimu portale pagal visus Lietuvos Respublikos teisės aktus.",
            "Skelbimų turinys turi būti aiškus ir suprantamas. Nurodykite visas svarbias detales, kad būtų išvengta nesklandumų.",
            "Skelbimuose naudokite aukštos kokybės nuotraukas. Gerai pavaizduotos tr. priemonės, prekės ar kt., tai gali padidinti jūsų skelbimo patrauklumą.",
            "Skelbimai turi būti tikroviški ir atitikti skelbimo kategoriją.",
            "Aiškiai nurodykite prekės ar paslaugos kainą. Taip pat pateikite kitą svarbią informcaiją, pvz.: (šalį, miestą kt.).",
            "Skelbime pateikite galimybę susisiekti su jumis. Palikite kontaktinį telefoną arba el. paštą, kad potencialūs klientai galėtų su jumis lengvai susisiekti"
        ]
    },
    {
        title: "Skelbimų talpinimo draudimai",
        rules: [
            "Draudžiama skelbti automobilius, transporto priemones ar kt. kurios neatspindi realios būklės arba turi klaidinančią informaciją.",
            "Pateikti netikrą ar realybės neatitinkančią informaciją.",
            "Draudžiama skelbti nuorodas į kitus interneto puslapius ar svetaines, kurios nesusijusios su skelbimo turiniu.",
            "Draudžiama skelbti prekes, kurios yra nelegalios, vogtos ir kurios nepriklauso talpintojui ar įmonei.",
            "Draudžiama kelti identiškus skelbimus kelis kartus arba kurti kelias paskyras / vartotojo profilius tam tikslui."
        ]
    },
    {
        title: "Vartotojui pažeidus taisykles",
        rules: [
            "Vartotojui pažeidus Automiestas.lt portalo tasykles ar nesilaikant Lietuvos Respublikos Teisės Aktų turime pilną teisę skirti įspėjimą, užblokuoti, pašalinti skelbimus iš portalo ar imtis kitų priemonių."
        ]
    }
];

const RenderRuleTitle = ({ title }: { title: string }) => {
    return (
        <span className={`text-base full_hd:text-base_2xl text-primary font-medium`}>{title}</span>
    );
};

const Page = async () => {
    return (
        <div className={`flex flex-col gap-[0.7rem]`}>
            <div className={`flex flex-col gap-[0.5rem]`}>
                <span className={`text-base full_hd:text-base_2xl text-placeholder_secondary`}>Paskutinį kartą atnaujinta 2024-02-13</span>
            </div>
            <hr className={`w-full border-border`} />
            {Rules.map((ruleObj, ruleObjIdx) => (
                <div className={`flex flex-col gap-[0.5rem]`} key={`rule_tab_${ruleObjIdx}`}>
                    <RenderRuleTitle title={`${ruleObjIdx + 1}. ${ruleObj.title}`} />
                    {ruleObj.rules.map((rule, ruleIdx) => (
                        <span className={`text-base full_hd:text-base_2xl text-placeholder_secondary`} key={`rule_${ruleObjIdx}_${ruleIdx}`}>{ruleIdx + 1}. {rule}</span>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Page;