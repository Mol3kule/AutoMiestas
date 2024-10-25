'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";

import { Spinner } from "@/components/spinner";
import { VehicleObj } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { animated, useTransition } from "@react-spring/web";
import Countries from "@/classes/Countries";
import Cities from "@/classes/Cities";

export const VehiclePostCard = ({ postData }: { postData: Post }) => {
    const { vehicleMakes, vehicleModels } = useVehicleStore();
    const { images, information } = postData;
    const router = useRouter();

    const isLoading = false;

    const t = useLanguage();

    const { user, isLoaded } = useUser();

    const RenderLocation = ({ text }: { text: string }) => {
        return (
            <div className={`flex gap-[1.25] bg-primary px-[0.62rem] py-[0.25rem] rounded-[0.1875rem]`}>
                <p className={`text-[#FFF] text-base full_hd:text-base_2xl capitalize`}>{text}</p>
            </div>
        )
    }

    const HandlePostClick = () => {
        router.push(`/posts/${postData.slug}`);
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
                                {'vehicleData' in information && (
                                    vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 &&
                                    <p className={`text-primary text-base full_hd:text-base_2xl font-medium`}>{Object.values(vehicleMakes).find((make) => make.id === information.vehicleData.make)?.make} {Object.values(vehicleModels[information.vehicleData.make]).find((model) => model.id === information.vehicleData.model)?.model}</p>
                                )}
                                <Heart fill={`${isLoaded && user && postData.statistics.times_liked.includes(user.id) ? '#E74F71' : 'none'}`} className={`w-[1.125rem] h-[1.125rem] ${isLoaded && user && postData.statistics.times_liked.includes(user.id) ? `text-error_secondary` : `text-placeholder_secondary`}`} />
                            </div>
                            <hr className="bg-border text-border w-full" />
                            <div className={`flex gap-[1.25rem]`}>
                                {'vehicleData' in information && (
                                    <>
                                        <p className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.fuelTypes[VehicleObj.getFuelTypeByIndex(information.vehicleData.fuel_type) as keyof typeof t.vehicleInfo.fuelTypes]}</p>
                                        <p className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.transmission[VehicleObj.getTransmissionByIndex(information.vehicleData.transmission) as keyof typeof t.vehicleInfo.transmission]}</p>
                                    </>
                                )}
                            </div>
                            <hr className="bg-border text-border w-full" />
                            <p className={`text-highlight text-base full_hd:text-base_2xl font-medium text-left`}>{information.price.toLocaleString('lt-LT', { style: 'currency', currency: 'eur' })}</p>
                            <div className={`flex gap-[0.62rem]`}>
                                <RenderLocation text={Countries.getCountryByIndex(Number(information.location.countryId))} />
                                <RenderLocation text={Cities.getCityByIndex(information.location.countryId, Number(information.location.cityId))} />
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