"use client";

import { useState } from "react";
import axios from "axios";
import Stripe from "stripe";

import { useLanguage } from "@/lib/languageUtils";
import { PostVehicle } from "@/types/post.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ActionsSection = ({ postData }: { postData: PostVehicle }) => {
    const router = useRouter();
    const { isActive, isSubscriptionActive } = postData;
    const t = useLanguage();
    const [stripeData, setStripeData] = useState<Stripe.Response<Stripe.Subscription>>(null!);

    const buySubscription = () => { };

    const cancelSubscription = () => { };

    const boostPost = async () => {
        const boostResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/posts/boostPost`, { postId: postData.id }).then((res) => res.data);
        if (boostResponse.status === 200) {
            toast.success(t.my_posts.post_boost_success, { duration: 5000 });
            router.refresh();
        } else {
            toast.error(t.my_posts[boostResponse.translation as keyof typeof t.my_posts], { duration: 5000 });
        }
    };

    const removePost = () => { };

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <span className={`text-base full_hd:text-base_2xl text-primary`}>{t.my_posts.actions}</span>
            <div className={`flex flex-col laptop:flex-row gap-[1.25rem] text-base full_hd:text-base_2xl`}>
                {!isSubscriptionActive ? (
                    <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight`}>{t.my_posts.buy_subscription}</button>
                ) : (
                    <>
                        <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight disabled:cursor-not-allowed disabled:opacity-80`} onClick={boostPost}>{t.my_posts.boost_post}</button>
                        <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-error_secondary`}>{t.my_posts.cancel_subscription}</button>
                    </>
                )}
                <div className={`flex flex-1 justify-end`}>
                    <button type="button" className={`px-[0.62rem] py-[0.5rem] w-full laptop:w-auto text-[#FFF] rounded-[0.1875rem] bg-error_secondary`}>{t.my_posts.delete_post}</button>
                </div>
            </div>
        </div>
    )
}