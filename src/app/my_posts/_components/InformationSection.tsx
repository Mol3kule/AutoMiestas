"use client";

import { getDateFromTimestamp, getDateFromTimestampWithTime } from "@/lib/getDate";
import { useLanguage } from "@/lib/languageUtils";
import { PostVehicle } from "@/types/post.type";
import axios from "axios";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export const InformationSection = ({ postData }: { postData: PostVehicle }) => {
    const t = useLanguage();
    const [stripeData, setStripeData] = useState<Stripe.Response<Stripe.Subscription>>(null!);
    const [boostAvailableTimestamp, setBoostAvailableTimestamp] = useState<number>(null!);

    const { boosts } = postData;

    useEffect(() => {
        axios.post(`${process.env.defaultApiEndpoint}/api/stripe/getStripeDataBySubId`, {
            subscriptionId: postData.subscriptionId
        }).then((res) => {
            const { status, data, metadata } = res.data;

            if (status === 200) {
                setStripeData(data);
                setBoostAvailableTimestamp(new Date(Number(boosts.time_created)).setDate(new Date(Number(boosts.time_created)).getDate() + Number(metadata.boost_timeout)));
            }
        });
    }, []);


    return (
        <div className={`flex flex-col mt-[0.88rem] gap-[1.25rem] text-base full_hd:text-base_2xl`}>
            <span>{t.general.information}</span>
            <div className={`flex gap-[1.25rem] flex-wrap`}>
                <CardItem placeholder={t.my_posts.likes} text={postData.statistics.times_liked.length.toString()} />
                <CardItem placeholder={t.my_posts.views} text={postData.statistics.times_viewed.length.toString()} />
                <CardItem placeholder={t.my_posts.post_uploaded} text={getDateFromTimestamp(postData.periods.time_created)} />
                {stripeData && (
                    <>
                        <CardItem placeholder={t.my_posts.next_payment} text={getDateFromTimestamp(stripeData.current_period_end * 1000)} />
                    </>
                )}
                {postData.boosts.time_created && boostAvailableTimestamp && (
                    <>
                        <CardItem placeholder={t.my_posts.last_boost} text={getDateFromTimestampWithTime(postData.boosts.time_created)} />
                        <CardItem placeholder={t.my_posts.next_boost} text={getDateFromTimestampWithTime(boostAvailableTimestamp)} />
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