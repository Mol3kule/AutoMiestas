import { Conditions } from "@/classes/Vehicle";
import { PostType, PostInformation } from "../post.type";

export type PostItem = PostType & {
    information: PostItemInformation;
};

type PostItemInformation = PostInformation & {
    title: string;
    itemData: PostItemData;
}

export type PostItemData = {
    condition: Conditions;
    partNumber?: string;
}