"use client";

import { getSubscription } from "@/actions/stripe/stripe.actions";
import { getDateFromTimestamp, getDateFromTimestampWithTime } from "@/lib/getDate";
import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const InformationSection = ({ postData }: { postData: Post }) => {
    const t = useLanguage();
    const [boostAvailableTimestamp, setBoostAvailableTimestamp] = useState<number>(null!);

    const { boosts } = postData;

    const { isLoading, data: subscriptionData } = useQuery({
        queryKey: ["getSubscriptionData", { subscriptionId: postData.subscriptionId }],
        queryFn: async () => {
            if (!postData.subscriptionId) return null;
            const { status, subscription, product } = await getSubscription(postData.subscriptionId);

            if (status !== 200 || !subscription) {
                return null;
            }

            setBoostAvailableTimestamp(new Date(Number(boosts.time_created)).setDate(new Date(Number(boosts.time_created)).getDate() + Number(product.metadata.boost_timeout)));
            return { subscription };
        },
        staleTime: Infinity
    });

    return (
        <div className={`flex flex-col mt-[0.88rem] gap-[1.25rem] text-base full_hd:text-base_2xl`}>
            <span>{t.general.information}</span>
            <div className={`flex gap-[1.25rem] flex-wrap`}>
                <CardItem placeholder={t.my_posts.likes} text={postData.statistics.times_liked.length.toString()} />
                <CardItem placeholder={t.my_posts.views} text={postData.statistics.times_viewed.length.toString()} />
                <CardItem placeholder={t.my_posts.post_uploaded} text={getDateFromTimestamp(postData.periods.time_created)} />
                {!isLoading && (
                    <>
                        {subscriptionData && (
                            <>
                                <CardItem placeholder={t.my_posts.next_payment} text={getDateFromTimestamp(subscriptionData.subscription.current_period_end * 1000)} />
                            </>
                        )}
                        {postData.boosts.time_created && boostAvailableTimestamp && (
                            <>
                                <CardItem placeholder={t.my_posts.last_boost} text={getDateFromTimestampWithTime(postData.boosts.time_created)} />
                                <CardItem placeholder={t.my_posts.next_boost} text={getDateFromTimestampWithTime(boostAvailableTimestamp)} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

const CardItem = ({ placeholder, text }: { placeholder: string, text: string }) => {
    return (
        <div className={`px-[0.62rem] py-[0.5rem] rounded-[1.125rem] flex gap-[0.5rem] bg-[#FFF]`}>
            <span className={`text-primary text-base full_hd:text-base_2xl`}>{placeholder}</span>
            <span className={`text-highlight text-base full_hd:text-base_2xl`}>{text}</span>
        </div>
    )
}