import { Heart, User2 } from 'lucide-react';

const NavigationBar = () => {
    return (
        <div className={`pb-[20px]`}>
            {/* Navigation */}
            <div className={`bg-[#111] h-[64px] flex items-center`}>
                {/* Inner container */}
                <div className={`mx-[490px] flex flex-1 items-center`}>
                    {/* Title side */}
                    <div className={`flex flex-col`}>
                        <span className={`text-[#FFF] text-[16px] font-medium`}>Auto<span className={`text-[#008EFF] text-[16px] font-medium`}>miestas.lt</span></span>
                        <span className={`text-[#FFF] text-[9px] font-medium`}>Skelbimų portalas</span>
                    </div>
                    {/* Content side */}
                    <div className={`flex flex-1 justify-end items-center gap-[15px]`}>
                        <span className={`text-[#FFF] text-[11px]`}>+ Pridėti skelbimą</span>
                        <Heart size={22} color={`#FFF`} />
                        <User2 size={22} color={`#FFF`} />
                    </div>
                </div>
            </div>
            {/* Other navigation */}
            <div className={`bg-[#F7F7F8] h-[31px] flex`}>
                {/* Inner container */}
                <div className={`mx-[490px] flex flex-1 items-center gap-[34px]`}>
                    <span className={`text-[#111] text-[11px]`}>Skelbimai</span>
                    <span className={`text-[#111] text-[11px]`}>Automobilių nuoma</span>
                    <span className={`text-[#111] text-[11px]`}>Paskola</span>
                    <span className={`text-[#111] text-[11px]`}>Švaros broliai</span>
                    <span className={`text-[#111] text-[11px]`}>Carvertical.lt</span>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;