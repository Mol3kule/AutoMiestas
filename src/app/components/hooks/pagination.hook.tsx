"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link"
import { useRouter } from "next/navigation";

type PaginationWrapperProps = {
    currentPage: number;
    pages: number;
};

export const PaginationWrapper = ({ currentPage, pages }: PaginationWrapperProps) => {
    const router = useRouter();
    const NextPage = () => {
        router.push(`?page=${currentPage + 1}`);
        location.reload();
    }

    const PreviousPage = () => {
        router.push(`?page=${currentPage - 1}`);
        location.reload();
    }

    const paginate = (pageNumber: number) => {
        if (currentPage === pageNumber) return;

        router.push(`?page=${pageNumber}`);
        location.reload();
    };

    const RenderPaginationItem = ({ page }: { page: number }) => {
        console.log(`Current: ${currentPage} | page: ${page}`)
        return (
            <PaginationItem onClick={() => paginate(page)} className={`px-[0.85rem] py-[0.3rem] rounded-[0.1875rem] hover:cursor-pointer ${page === currentPage ? `bg-primary text-[#FFF]` : `bg-highlight_secondary text-placeholder_secondary`}`}>
                <span className={`text-base full_hd:text-base_2xl`}>
                    {page}
                </span>
            </PaginationItem>
        );
    }

    return (
        <Pagination>
            <PaginationContent className={`flex gap-[0.75rem]`}>
                {currentPage > 1 && (
                    <PaginationItem>
                        <ChevronLeft className={`text-placeholder_secondary text-sm full_hd:text-sm_2xl hover:cursor-pointer`} onClick={PreviousPage} />
                    </PaginationItem>
                )}
                {Array.from(Array(pages).keys()).map((page, idx) => (
                    <RenderPaginationItem page={page + 1} key={`pagination_button_${page}`}/>
                ))}
                {currentPage < pages && (
                    <PaginationItem>
                        <ChevronRight className={`text-placeholder_secondary text-sm full_hd:text-sm_2xl hover:cursor-pointer`} onClick={NextPage} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}