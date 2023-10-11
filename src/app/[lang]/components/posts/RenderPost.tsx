'use client';

import Image from "next/image";

export const RenderPost = ({ data }: { data: any }) => {
    return (
        <div className={`w-[300px] h-[210px]`}>
            <Image
                src={`https://images.hgmsites.net/hug/2014-volkswagen-gti-concept_100403401_h.jpg`}
                alt="Image"
                width={300}
                height={50}
            />
            <div className={`h-[50px] bg-[#F7F7F8]`}>
                <div className={`flex px-[16px] py-[10px] flex-col`}>
                    <p className={`flex`}>
                        <span className={`text-[11px] text-[#111]`}>Volkswagen Golf 5 GTI, 2014</span>
                    </p>
                    <p className={`flex items-center gap-[10px] p-0 m-0`}>
                        <span className={`text-[11px] text-[#9D9D9D]`}>8,500€</span>
                        <span className={`text-[9px] text-[#9D9D9D]`}>Hečbekas 1.9l</span>
                    </p>
                </div>
            </div>
        </div>
    )
}