import axios from "axios";
import { TProduct } from "@/app/api/stripe/getProducts/route";
import { Check } from "lucide-react";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { ILocationCity, useCityStateStore } from "@/store/citystate/citystate.store";
import { getCityState } from "@/lib/getCityState";

const ProductsMap = {
    "bronze": {
        included: [
            "Skelbimo iškėlimas į viršų 1 kartą per savaitę",
            "Skelbimo iškėlimas į viršų 1 kartą per savaitę",
            "Skelbimo iškėlimas į viršų 1 kartą per savaitę",
            "Skelbimo iškėlimas į viršų 1 kartą per savaitę",
            "Skelbimo iškėlimas į viršų 1 kartą per savaitę"
        ],
        outcluded: [
            // ""
        ]
    }
}

export const RenderProduct = ({ item }: { item: TProduct }) => {
    const { category, makeId, modelId, modelYear, bodyType, mileage, fuelType, drivetrain, transmission, sw_side, condition, price, technical_inspection_due, vin, sdk, description, fileImages, primaryImg, countryId, cityId } = usePostCreateStore();
    const { CountryList, CityList } = useCityStateStore();

    const HandleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.values(fileImages).forEach((file, idx) => {
            formData.append(`file_${idx}`, file)
        });

        const uploadImageResponse = await fetch(`${process.env.defaultApiEndpoint}/api/posts/uploadImage`, {
            body: formData,
            method: "POST"
        }).then(res => res.json());

        if (uploadImageResponse.status !== 200) {
            redirect('/');
        };

        const newImages = uploadImageResponse.data.map((img: any) => ({ key: img.data.key, url: img.data.url, isPrimary: img.data.name === fileImages[primaryImg].name }));

        const createPostResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/posts/createPost`, {
            category, makeId, modelId, modelYear,
            bodyType, mileage, fuelType, drivetrain,
            transmission, sw_side, condition, price,
            technical_inspection_due, vin, sdk, description,
            images: newImages, country: CountryList.find((country) => country.id === countryId)?.name, city: Object.values(CityList[countryId]).find((city) => city.id === cityId)?.name
        });

        if (createPostResponse.data.status !== 200) {
            console.log(createPostResponse.data);
            return;
        };

        return;

        const { data } = await axios.post(`${process.env.defaultApiEndpoint}/api/stripe/processPayment`, {
            priceId: item.id,
            postId: createPostResponse.data.postId
        }, {
            headers: {
                "Content-Type": "application/json",
                "method": "POST"
            }
        });

        window.location.assign(data);
    }

    const RenderIncluded = ({ item }: { item: string }) => {
        return (
            <span className={`flex gap-[0.5rem] text-base full_hd:text-base_2xl items-center`}>
                <Check className={`text-highlight w-[0.9375rem] h-[0.9375rem]`} />
                {item}
            </span>
        );
    }

    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col gap-[1.25rem] px-[2.19rem] py-[2.69rem] bg-primary rounded-t-[0.1875rem]`}>
                <div className={`flex flex-col gap-[0.87rem]`}>
                    <span className={`text-[#FFF] text-header full_hd:text-header_2xl font-medium`}>{item.name}</span>
                    <span className={`text-placeholder text-base full_hd:text-base_2xl`}>Galioja 30 dienų</span>
                </div>
                <div>
                    <span className={`text-header_2xl full_hd:text-[1.8rem] text-[#FFF]`}>{(item.unit_amount / 100).toLocaleString('lt-LT')}</span>
                    <span className={`text-header_2xl full_hd:text-[1.8rem] text-highlight`}>&euro;</span>
                </div>
                <button onClick={HandleSubscription} className={`w-full py-[0.62rem] text-[#FFF] border-[1px] border-[#FFF] rounded-[0.1875rem] text-base full_hd:text-base_2xl`}>Pasirinkti planą</button>
            </div>
            <div className={`flex flex-col gap-[1.25rem] bg-highlight_secondary px-[2.19rem] py-[1.56rem] rounded-b-[0.1875rem]`}>
                {ProductsMap[item.name.toLowerCase() as keyof typeof ProductsMap] && (
                    ProductsMap[item.name.toLowerCase() as keyof typeof ProductsMap]?.included.map((value, idx) => (
                        <RenderIncluded item={value} key={`product_included_${item.name}_${idx}`} />
                    ))
                )}
            </div>
        </div>
    );
}