"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import { useLanguage } from "@/lib/languageUtils";
import { ProductsModal } from "@components/modals/products-modal";
import { DialogBox } from "@/app/components/dialogs/dialogBox";
import { PostVehicle } from "@/types/post.type";

export const ActionsSection = ({ postData }: { postData: PostVehicle }) => {
    const { status, isSubscriptionActive } = postData;
    const router = useRouter();
    const t = useLanguage();

    const [productsDisplayed, setProductsDisplayed] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubscription = async (priceId: string) => {
        const { status, url } = await axios.post(`${process.env.defaultApiEndpoint}/api/stripe/processPayment`, {
            priceId: priceId,
            postId: postData.id
        }).then((res) => res.data);

        if (status !== 200) {
            location.reload();
            return;
        }

        window.location.assign(url);
    };

    const boostPost = async () => {
        const boostResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/posts/boostPost`, { postId: postData.id }).then((res) => res.data);
        if (boostResponse.status === 200) {
            toast.success(t.my_posts.post_boost_success, { duration: 5000 });
            router.refresh();
        } else {
            toast.error(t.my_posts[boostResponse.translation as keyof typeof t.my_posts], { duration: 5000 });
        }
    };


    const removePost = async (status: boolean) => {
        if (!status) {
            setIsDeleting(false);
            return;
        }

        const deleteResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/stripe/deleteSubscription`, { postId: Number(postData.id) }).then(res => res.data);
        if (deleteResponse.status !== 200) {
            toast.error(t.general.bad_request, { duration: 5000 });
            return;
        }

        location.reload();
    };

    return (
        <>
            <ProductsModal isOpen={productsDisplayed} setOpen={setProductsDisplayed} onSelect={handleSubscription} />
            <DialogBox isOpen={isDeleting} title={t.my_posts.delete_post} description={t.my_posts.delete_post_confirmation} onSubmit={removePost} />
            <div className={`flex flex-col gap-[1.25rem]`}>
                <span className={`text-base full_hd:text-base_2xl text-primary`}>{t.my_posts.actions}</span>
                <div className={`flex flex-col laptop:flex-row gap-[1.25rem] text-base full_hd:text-base_2xl`}>
                    {!isSubscriptionActive ? (
                        <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight`} onClick={() => setProductsDisplayed(true)}>{t.my_posts.buy_subscription}</button>
                    ) : (
                        <>
                            <div className={`flex gap-[1.25rem]`}>
                                {status.isPublished && (
                                    <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight disabled:cursor-not-allowed disabled:opacity-80`} onClick={boostPost}>{t.my_posts.boost_post}</button>
                                )}
                                <button type="button" className={`px-[0.62rem] py-[0.5rem] w-full laptop:w-auto text-[#FFF] rounded-[0.1875rem] bg-error_secondary`} onClick={() => setIsDeleting(true)}>{t.my_posts.delete_post}</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};