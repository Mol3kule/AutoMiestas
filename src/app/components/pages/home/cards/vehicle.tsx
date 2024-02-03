'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { getVehicles } from "@/lib/getVehicles";

import { Spinner } from "@/components/spinner";
import { VehicleObj } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { animated, useTransition } from "@react-spring/web";

export const VehiclePostCard = ({ postData, idx }: { postData: Post, idx: number }) => {
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const { id, images, information, periods } = postData;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    const t = useLanguage();

    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!vehicleMakes.length || !Object.values(vehicleModels).length) {
            getVehicles().then(async (res) => {
                const { makesData, modelsData } = res;

                if (makesData.status === 200 && modelsData.status === 200) {
                    setMakes(makesData.data);
                    setModels(modelsData.data);
                    setIsLoading(false);
                }
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    const RenderLocation = ({ text }: { text: string }) => {
        return (
            <div className={`flex gap-[1.25] bg-primary px-[0.62rem] py-[0.25rem] rounded-[0.1875rem]`}>
                <p className={`text-[#FFF] text-base full_hd:text-base_2xl`}>{text}</p>
            </div>
        )
    }

    const HandlePostClick = () => {
        const encodedMake = encodeURI(vehicleMakes.find((make) => make.id === information.vehicleData.make)!.make);
        const encodedModel = encodeURI(Object.values(vehicleModels[Number(information.vehicleData.make)]).find((model) => model.id === information.vehicleData.model)?.model!);
        const newUri = encodeURI(`posts/${id}/${encodedMake}-${encodedModel}-${information.vehicleData.year}/${periods.time_created}`)
        router.push(newUri);
    }

    const transitions = useTransition(!isLoading, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        config: { duration: 1000 }
    });

    return (
        !isLoading ? (
            transitions((style) => (
                <animated.button style={style} className={`w-full bg-highlight_secondary rounded-[0.1875rem] h-full`} onClick={HandlePostClick}>
                    <div>
                        <div className={`w-full h-[20rem]`}>
                            {images && images.length > 0 && (
                                <Image
                                    alt="Loading.."
                                    src={images?.find(image => image.isPrimary)?.url || images[0].url}
                                    className={`rounded-t-[0.1875rem] h-full object-cover`}
                                    width={1920}
                                    height={1080}
                                />
                            )}
                        </div>
                        <div className={`px-[1.25rem] py-[1.44rem] flex flex-col gap-[0.87rem]`}>
                            <div className={`flex justify-between gap-[1.25rem] items-center`}>
                                {vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 &&
                                    <p className={`text-primary text-base full_hd:text-base_2xl font-medium`}>{Object.values(vehicleMakes).find((make) => make.id === information.vehicleData.make)?.make} {Object.values(vehicleModels[information.vehicleData.make]).find((model) => model.id === information.vehicleData.model)?.model}</p>
                                }
                                <Heart className={`w-[1.125rem] h-[1.125rem] ${isLoaded && user && postData.statistics.times_liked.includes(user.id) ? `text-highlight` : `text-placeholder`}`} />
                            </div>
                            <hr className="bg-border text-border w-full" />
                            <div className={`flex gap-[1.25rem]`}>
                                <p className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.fuelTypes[VehicleObj.getFuelTypeByIndex(information.vehicleData.fuel_type) as keyof typeof t.vehicleInfo.fuelTypes]}</p>
                                <p className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.transmission[VehicleObj.getTransmissionByIndex(information.vehicleData.transmission) as keyof typeof t.vehicleInfo.transmission]}</p>
                            </div>
                            <hr className="bg-border text-border w-full" />
                            <p className={`text-highlight text-base full_hd:text-base_2xl font-medium text-left`}>{information.price.toLocaleString('lt-LT', { style: 'currency', currency: 'eur' })}</p>
                            <div className={`flex gap-[0.62rem]`}>
                                <RenderLocation text={information.location.city} />
                                <RenderLocation text={information.location.country} />
                            </div>
                        </div>
                    </div>
                </animated.button>
            ))
        ) : (
            <div className={`w-full flex items-center justify-center bg-highlight_secondary py-[2rem]`}>
                <Spinner />
            </div>
        )
    );
}