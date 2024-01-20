"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { RenderProduct } from "./renderProduct";
import { Spinner } from "@/app/components/spinner";
import { TProduct } from "@/app/api/stripe/getProducts/route";

export const PostPaymentPage = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.defaultApiEndpoint}/api/stripe/getProducts`, {
            headers: {
                method: "GET"
            }
        }).then(async (response) => {
            const { products } = await response.data;
            setProducts(products)
            setIsLoading(false);
        })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className={`flex flex-col gap-[1.25rem] `}>
            <div className={`flex flex-col gap-[0.87rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl`}>Skelbimų planai</span>
                <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>Pasirinkite tinkamą planą pagal savo individualius poreikius, finansinius klausimus, bei lūkesčius</span>
            </div>

            <div className={`${isLoading ? `flex items-center justify-center h-[20rem]` : `grid`} grid-cols-1 laptop:grid-cols-3 gap-[1.25rem]`}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    products && products.map((product, idx) => (
                        <RenderProduct item={product} key={`product_payment_${idx}`} />
                    ))
                )}
            </div>
        </div>
    )
}