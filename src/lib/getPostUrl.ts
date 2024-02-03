import { Post } from "@/types/post.type";
import { TVehicleMake, TVehicleModels } from "@/types/vehicle.type";

type getPostUrlProps = {
    vehicleMakes: TVehicleMake[];
    vehicleModels: TVehicleModels[];
    post: Post;
}

export const getPostUrl = ({ vehicleMakes, vehicleModels, post }: getPostUrlProps) => {
    const { id, information: { vehicleData: { make, model, year } }, periods } = post;
    const makeURI = encodeURI(vehicleMakes.find(m => m.id === make)?.make!);
    const modelURI = encodeURI(Object.values(vehicleModels[make]).find(m => m.id === model)?.model!);
    const newUrl = encodeURI(`posts/${id}/${makeURI}-${modelURI}-${year}/${periods.time_created}`);

    return newUrl;
}