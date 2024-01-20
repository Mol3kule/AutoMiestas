import { Post } from "../post.type";

export enum PostItemConditions { New, Used };

export type PostItem = Post & {
    information: PostItemInformation;
};

type PostItemInformation = {
    title: string;
    description: string;
    location: PostItemLocation;
    itemData: PostItemDataInformation;
    price: number;
}

type PostItemDataInformation = {
    condition: PostItemConditions;
    
}

type PostItemLocation = {
    city: string;
    country: string;
}