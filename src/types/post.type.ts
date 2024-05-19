import { Categories } from "@/classes/PostCategories";
import { PostVehicle } from "./posts/vehiclePost.type";
import { PostItem } from "./posts/postItem.type";

export type PostType = {
    id?: number;
    authorId: string;
    information: PostInformation;
    images: PostImage[];
    statistics: PostStatistics;
    periods: PostPeriods;
    boosts: PostBoosts;
    subscriptionId: string | null;
    status: PostStatus;
    isSubscriptionActive: boolean;
    category: Categories;
    slug: string;
}

export type PostInformation = {
    description: string;
    location: {
        cityId: number;
        countryId: number;
    };
    price: number;
}

export type PostStatus = {
    isPublished: boolean;
    isAttentionRequired: boolean;
    isEditedAfterAttentionRequired: boolean;
}

export type PostImage = {
    key: string;
    url: string;
    isPrimary: boolean;
}

export type PostStatistics = {
    times_viewed: Array<string>;
    times_liked: Array<string>;
}

export type PostPeriods = {
    time_created: number;
    time_updated: number;
}

export type PostBoosts = {
    time_created: number | null;
}

export type Post = PostVehicle | PostItem;