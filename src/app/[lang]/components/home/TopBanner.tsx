import Image from "next/image";

import BannerImage from '/public/assets/images/home-banner.jpg';
import BannerLogo from '/public/assets/icons/Carvertical-logo.png';
import { Check } from "lucide-react";

const Images = {
    bannerImage: {
        imageUrl: BannerImage,
        alt: 'Banner image'
    },
    innerInsideImage: {
        imageUrl: BannerLogo,
        alt: 'Logo'
    }
}

const TopBanner = () => {
    return (
        <div className={`w-full h-[100px] flex relative`}>
            <div className={`absolute w-full h-full flex flex-col justify-center px-[30px] gap-[3px]`}>
                <Image
                    src={Images.innerInsideImage.imageUrl}
                    alt={Images.innerInsideImage.alt}
                    width={100}
                    height={14}
                    className={`object-contain`}
                    draggable={false}
                />
                <div className={`flex flex-col gap-[0px] overflow-hidden`}>
                    <span className={`text-[#FFA800] text-[11px]`}>Išvenk brangiai kainuojančių problemų patikrinęs transporto priemonės istoriją.</span>
                    <div className={`flex gap-[6px] text-[11px] text-[#FFF]`}>
                        <span className={`flex items-center gap-[5px]`}><Check color={`#FFF`} size={10} />Ridos klastojimas</span>
                        <span className={`flex items-center gap-[5px]`}><Check color={`#FFF`} size={10} />Užfiksuotos nuotraukos</span>
                        <span className={`flex items-center gap-[5px]`}><Check color={`#FFF`} size={10} />Savininkų kaita</span>
                        <span className={`flex items-center gap-[5px]`}><Check color={`#FFF`} size={10} />Patirtos žalos</span>
                        <span className={`flex items-center gap-[5px]`}><Check color={`#FFF`} size={10} />Gamybos defektai</span>
                        <span className={`flex items-center gap-[5px]`}><Check color={`#FFF`} size={10} />Vagysčių įrašai</span>
                    </div>
                </div>
            </div>
            <div className={`bg-[#111] flex-1 flex`}>
                <Image
                    src={Images.bannerImage.imageUrl}
                    alt={Images.bannerImage.alt}
                    width={490}
                    height={500}
                    className={`object-cover flex-1 opacity-[0.2]`}
                    draggable={false}
                />
            </div>
        </div>
    );
}

export default TopBanner;