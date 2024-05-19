'use client';

import { Categories } from "@/classes/PostCategories";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { VehiclePostView } from "./post-categories-views/vehicle-post-view";
import { ItemPostView } from "./post-categories-views/item-post-view";

export const PostInformationPage = () => {
    const { category } = usePostCreateStore();

    const FormMapByCategory: { [key in Categories]: JSX.Element } = {
        [Categories.vehicle]: <VehiclePostView />,
        [Categories.motorcycle]: <VehiclePostView />,
        [Categories.heavy]: <VehiclePostView />,
        [Categories.agricultural]: <VehiclePostView />,
        [Categories.construction]: <VehiclePostView />,
        [Categories.trailer]: <></>,
        [Categories.boat]: <></>,
        [Categories.plane]: <></>,
        [Categories.scooter]: <ItemPostView />,
        [Categories.tires_wheels]: <ItemPostView />,
        [Categories.parts]: <ItemPostView />
    };

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            {FormMapByCategory[category]}
        </div>
    );
}