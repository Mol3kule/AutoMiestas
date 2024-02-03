"use client";

import Image from "next/image";
import { animated, useTransition } from "@react-spring/web";

import { Post } from "@/types/post.type";
import { InformationSection } from "./InformationSection";
import { ActionsSection } from "./ActionsSection";
import { RenderVehicleLabel } from "./RenderLabel";

export const RenderPostCard = ({ postData }: { postData: Post }) => {
    const { images, status } = postData;

    const transition = useTransition(true, {
        from: { opacity: 0 },
        enter: { opacity: 1 }
    })

    const HandleEdit = () => { };

    return (
        transition((style) => (
            <animated.div style={style} className={`p-[2.19rem] flex flex-col bg-highlight_secondary rounded-[0.1875rem] text-base full_hd:text-base_2xl opacity-0`}>
                <div className={`flex gap-[1.25rem]`}>
                    <div className={`w-[3.875rem] h-[3.875rem] rounded-full`}>
                        {images && images.length > 0 && (
                            <Image
                                src={images?.find((img) => img.isPrimary)?.url || images[0].url}
                                alt={`post image`}
                                width={1920}
                                height={1080}
                                className={`rounded-full object-cover w-full h-full`}
                            />
                        )}
                    </div>
                    <div className={`flex flex-col gap-[0.5rem]`}>
                        <RenderVehicleLabel post={postData} />
                        <div className={`flex items-center gap-[0.5rem]`}>
                            <div className={`${status.isPublished ? `bg-[#35E08E]` : `bg-error_third`} w-[0.6875rem] h-[0.6875rem] rounded-full border-[1px_solid_#FFF]`} />
                            <span className={`text-base full_hd:text-base_2xl text-primary`}>ID: #{postData.id}</span>
                        </div>
                    </div>
                    <div className={`flex-1 flex justify-end items-center`}>
                        <div>
                            <button className={`px-[0.62rem] py-[0.5rem] bg-primary text-[#FFF] rounded-[0.1875rem]`} onClick={HandleEdit}>Koreguoti skelbimą</button>
                        </div>
                    </div>
                </div>
                <hr className="border-border mt-[1.31rem] bg-border" />
                <div className={`flex flex-col gap-[1.25rem]`}>
                    <InformationSection postData={postData} />
                    <ActionsSection postData={postData} />
                </div>
            </animated.div>
        ))
    );
};