'use client';

import { Categories } from "@/classes/PostCategories";
import { CreateVehiclePostForm } from "../forms/vehicle";
import { usePostCreateStore } from "@/store/posts/postCreate.store";

export const PostInformationPage = () => {
    const { category } = usePostCreateStore();

    const FormMapByCategory: { [key in Categories]: JSX.Element } = {
        [Categories.vehicle]: <CreateVehiclePostForm />,
        [Categories.motorcycle]: <CreateVehiclePostForm />,
        [Categories.heavy]: <CreateVehiclePostForm />,
        [Categories.agricultural]: <CreateVehiclePostForm />,
        [Categories.construction]: <CreateVehiclePostForm />,
        [Categories.trailer]: <CreateVehiclePostForm />,
        [Categories.boat]: <></>,
        [Categories.plane]: <></>,
        [Categories.scooter]: <></>,
        [Categories.tires_wheels]: <></>,
        [Categories.parts]: <></>
    };

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            {FormMapByCategory[category]}
        </div>
    );
}