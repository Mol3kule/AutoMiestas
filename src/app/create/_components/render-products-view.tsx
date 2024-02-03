import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { TProduct } from "@/actions/stripe/stripe.actions";
import { CreatePost } from "@/actions/posts/post.actions";
import { Moon } from "lucide-react";

export const RenderProduct = ({ item }: { item: TProduct }) => {
    const {
        category, makeId, modelId, modelYear, bodyType, mileage, mileage_type,
        fuelType, drivetrain, transmission, sw_side, condition, price, technical_inspection_due,
        vin, sdk, description, fileImages, primaryImg, countryId, cityId, specifications,
        ccm, power, power_type, title, partNumber
    } = usePostCreateStore();

    const HandleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Promise.all(Object.values(fileImages).map((file, idx) => {
            const isPrimary = file.name === fileImages[primaryImg].name;
            formData.append(`${isPrimary ? `primary_img` : `file_${idx}`}`, file)
        }));

        const data = { priceId: item.id, category, makeId, modelId, modelYear, bodyType, mileage, mileage_type, fuelType, drivetrain, transmission, sw_side, condition, price, technical_inspection_due, vin, sdk, description, primaryImg, countryId, cityId, specifications, ccm, power, power_type, title, partNumber, formDataImages: formData };

        const { status, url } = await CreatePost(data);

        if (status === 200 && url) {
            window.location.assign(url);
        }
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