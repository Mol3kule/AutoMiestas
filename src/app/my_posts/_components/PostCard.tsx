import { PostVehicle } from "@/types/post.type";
import Image from "next/image";
import { InformationSection } from "./InformationSection";
import { ActionsSection } from "./ActionsSection";
import { RenderVehicleLabel } from "./RenderLabel";

export const RenderPostCard = async ({ postData }: { postData: PostVehicle }) => {
    const { information, images } = postData;

    return (
        <div className={`p-[2.19rem] flex flex-col bg-highlight_secondary rounded-[0.1875rem] text-base full_hd:text-base_2xl`}>
            <div className={`flex gap-[1.25rem]`}>
                <div className={`w-[3.875rem] h-[3.875rem] rounded-full`}>
                    <Image
                        src={images.find((img) => img.isPrimary)?.url || images[0].url}
                        alt={`post image`}
                        width={1920}
                        height={1080}
                        className={`rounded-full object-cover w-full h-full`}
                    />
                </div>
                <div className={`flex flex-col gap-[0.5rem]`}>
                    <RenderVehicleLabel post={postData} makeId={information.vehicleData.make} modelId={information.vehicleData.model} year={information.vehicleData.year}/>
                    <div className={`flex items-center gap-[0.5rem]`}>
                        <div className={`${postData.isActive ? postData.isVerified ? `bg-[#35E08E]` : `bg-error_third` : `bg-error_secondary`} w-[0.6875rem] h-[0.6875rem] rounded-full border-[1px_solid_#FFF]`} />
                        <span className={`text-base full_hd:text-base_2xl text-primary`}>ID: #{postData.id}</span>
                    </div>
                </div>
                <div className={`flex-1 flex justify-end items-center`}>
                    <div>
                        <button className={`px-[0.62rem] py-[0.5rem] bg-primary text-[#FFF] rounded-[0.1875rem]`}>Koreguoti skelbimą</button>
                    </div>
                </div>
            </div>
            <hr className="border-border mt-[1.31rem] bg-border" />
            <div className={`flex flex-col gap-[1.25rem]`}>
                <InformationSection postData={postData} />
                <ActionsSection postData={postData} />
            </div>
        </div>
    );
};