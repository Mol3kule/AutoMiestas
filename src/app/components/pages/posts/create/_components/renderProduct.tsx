import axios from "axios";
import { TProduct } from "@/app/api/stripe/getProducts/route";
import { Moon } from "lucide-react";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { ILocationCity, useCityStateStore } from "@/store/citystate/citystate.store";
import { getCityState } from "@/lib/getCityState";
import { auth } from "@clerk/nextjs";

export const RenderProduct = ({ item }: { item: TProduct }) => {
    const { category, makeId, modelId, modelYear, bodyType, mileage, fuelType, drivetrain, transmission, sw_side, condition, price, technical_inspection_due, vin, sdk, description, fileImages, primaryImg, countryId, cityId, specifications } = usePostCreateStore();
    const { CountryList, CityList } = useCityStateStore();

    const HandleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.values(fileImages).forEach((file, idx) => {
            formData.append(`file_${idx}`, file)
        });

        const uploadImageResponse: { status: number, data: string[] | [] } = await fetch(`${process.env.defaultApiEndpoint}/api/posts/uploadImage`, {
            body: formData,
            method: "POST"
        }).then(res => res.json());

        if (uploadImageResponse.status !== 200) {
            redirect('/');
        };

        const newImages = uploadImageResponse.data.map((img: string) => ({ url: img, isPrimary: img.includes(fileImages[primaryImg].name) }));

        const createPostResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/posts/createPost`, {
            category, makeId, modelId, modelYear,
            bodyType, mileage, fuelType, drivetrain,
            transmission, sw_side, condition, price,
            technical_inspection_due, vin, sdk, description, specifications,
            images: newImages, country: CountryList.find((country) => country.id === countryId)?.name, city: Object.values(CityList[countryId]).find((city) => city.id === cityId)?.name
        }).then((res) => res.data);

        if (createPostResponse.status !== 200) {
            return;
        };

        const { status, url } = await axios.post(`${process.env.defaultApiEndpoint}/api/stripe/processPayment`, {
            priceId: item.id,
            postId: createPostResponse.postId
        }).then((res) => res.data);

        if (status !== 200) {
            redirect('/my_posts');
        }

        window.location.assign(url);
    }

    return (
        <div className={`flex flex-col rounded-[0.1875rem] px-[2.19rem] py-[1.87rem] gap-[0.88rem] bg-highlight_secondary`}>
            <div className={`flex gap-[1.25rem] items-center`}>
                <div className={`flex items-center justify-center rounded-[0.375rem] p-[0.5rem] bg-[#FFF]`}>
                    <Moon className={`text-highlight w-[1.125rem] h-[1.125rem]`} />
                </div>
                <span className={`text-primary text-base full_hd:text-base_2xl font-medium uppercase`}>{item.name} - {(item.unit_amount / 100).toLocaleString('lt-LT')}&euro;</span>
            </div>
            <hr className={`text-border bg-border`} />
            <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>
                Planas automobilių skelbimų puslapiui yra puikus pradžios taškas tiems, kurie nori surasti klientus internete. Pagrindines funkcijos, leidžiančios išskleisti svarbiausią informaciją apie automobilį, pritraukti dėmesį potencialių pirkėjų bei lengvai valdyti savo skelbimus.
            </span>
            <button onClick={HandleSubscription} className={`text-base full_hd:text-base_2xl mt-[2.5rem] py-[0.75rem] rounded-[0.1875rem] bg-primary text-[#FFF]`}>Įsigyti prenumeratą</button>
        </div>
    );
}