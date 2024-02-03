"use client";

import { RenderProduct } from "./render-products-view";
import { Spinner } from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { TProduct, getProducts } from "@/actions/stripe/stripe.actions";

export const PostPaymentPage = () => {
    const { isLoading, data: products } = useQuery({
        queryKey: ["getStripeProducts"],
        queryFn: async () => {
            const { status, products } = await getProducts();
            if (status === 200) {
                return products as TProduct[];
            }
            return [];
        }
    });

    return (
        <div className={`flex flex-col gap-[1.25rem] `}>
            <div className={`flex flex-col gap-[0.87rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl`}>Skelbimų planai</span>
                <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>Pasirinkite tinkamą planą pagal savo individualius poreikius, finansinius klausimus, bei lūkesčius</span>
            </div>

            <div className={`${isLoading ? `flex items-center justify-center h-[20rem]` : `grid`} grid-cols-1 laptop:grid-cols-3 gap-[1.25rem]`}>
                {!isLoading ? (
                    products && products.map((product, idx) => (
                        <RenderProduct item={product} key={`product_payment_${idx}`} />
                    ))
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}