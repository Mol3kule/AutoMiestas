"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useLanguage } from "@/lib/languageUtils";
import { ProductsModal } from "@/components/modals/products-modal";
import { DialogBox } from "@/components/dialogs/dialogBox";
import { Post } from "@/types/post.type";
import { boostPost } from "@/actions/posts/post.actions";
import { useQueryClient } from "@tanstack/react-query";
import { createCheckoutSession, deleteSubscription } from "@/actions/stripe/stripe.actions";

export const ActionsSection = ({ postData }: { postData: Post }) => {
    const { status, isSubscriptionActive } = postData;
    const t = useLanguage();

    const queryClient = useQueryClient();

    const [productsDisplayed, setProductsDisplayed] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubscription = async (priceId: string) => {
        const { status, url } = await createCheckoutSession(priceId, postData.id!);
        
        if (status !== 200 || !url) {
            toast.error('Ivyko klaida, perkraukite puslapį ir bandykite dar kartą', { duration: 5000 });
            return;
        }

        window.location.assign(url);
    };

    const boostPostBtn = async () => {
        if (typeof postData.id !== 'number') return;
        const { status, translation } = await boostPost(postData.id);
        if (status !== 200) {
            if (!translation) return;
            toast.error(t.my_posts[translation as keyof typeof t.my_posts], { duration: 5000 });
            return;
        }

        await queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
        toast.success(t.my_posts.post_boost_success, { duration: 5000 });
    };


    const removePost = async (status: boolean) => {
        if (!status) {
            setIsDeleting(false);
            return;
        }

        const { status: deleteStatus } = await deleteSubscription(Number(postData.id));
        if (deleteStatus !== 200) {
            toast.error(t.general.bad_request, { duration: 5000 });
            return;
        }

        await queryClient.invalidateQueries({ queryKey: ["getMyPosts"] });
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
                                    <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight disabled:cursor-not-allowed disabled:opacity-80`} onClick={boostPostBtn}>{t.my_posts.boost_post}</button>
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