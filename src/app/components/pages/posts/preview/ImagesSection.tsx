'use client';

import Image from "next/image";
import { PostImage } from "@/types/post.type";
import { useMemo, useState } from "react";
import { useImgPreviewStore } from "@/store/image_preview/imagePreview.store";

export const PostImagesSection = ({ images }: { images: PostImage[] }) => {
    const { setActivePreview, setActiveImage } = useImgPreviewStore();
    const [expandedImages, setExpandedImages] = useState(false);

    // 0: PC, 1: Mobile
    const HandleOpenPreview = (type: number, img: PostImage) => {
        if (type === 0) {
            setActivePreview(true);
            setActiveImage(img);
        } else if (type === 1 && expandedImages) {
            setActivePreview(true);
            setActiveImage(img);
        }
        setExpandedImages(true);
    }

    const RenderPrimaryImage = useMemo(() => () => {
        return (
            <>
                {/* Desktop */}
                <div className={`hidden laptop:flex w-full`}>
                    <Image
                        src={images.find(img => img.isPrimary)?.url ?? images[0].url}
                        alt="Primary Image"
                        className={`rounded-[0.1875rem] w-[100%] h-full object-cover hover:cursor-pointer`}
                        width={2560}
                        height={1440}
                        placeholder="blur"
                        blurDataURL={images[0].url}
                        onClick={() => HandleOpenPreview(0, images.find(img => img.isPrimary) ?? images[0])}
                    />
                </div>
                {/* Mobile */}
                <div className={`flex laptop:hidden w-full`}>
                    <Image
                        src={images.find(img => img.isPrimary)?.url ?? images[0].url}
                        alt="Primary Image"
                        className={`rounded-[0.1875rem] w-[100%] h-full object-cover hover:cursor-pointer`}
                        width={2560}
                        height={1440}
                        placeholder="blur"
                        blurDataURL={images[0].url}
                        onClick={() => HandleOpenPreview(1, images.find(img => img.isPrimary) ?? images[0])}
                    />
                </div>
            </>
        );
    }, [expandedImages]);

    const RenderSmallImage = useMemo(() => ({ img, idx }: { img: PostImage, idx: number }) => {
        if (img.isPrimary || idx > 4) return null;

        if (idx == 4) {
            return (
                <div className={`relative w-full hover:cursor-pointer`} onClick={() => HandleOpenPreview(0, img)}>
                    <div className={`absolute flex items-center text-center justify-center w-full h-full bg-[rgba(0,0,0,0.80)] text-[#FFF] text-base full_hd:text-base_2xl rounded-[0.1875rem]`}>Matyti daugiau+</div>
                    <Image
                        src={img.url}
                        alt="Primary Image"
                        className={`rounded-[0.1875rem] w-full h-full object-cover hover:cursor-pointer`}
                        width={1920}
                        height={1080}
                        placeholder="blur"
                        blurDataURL={img.url}
                    />
                </div>
            );
        };

        return (
            <>
                <Image
                    src={img.url}
                    alt="Small Image"
                    className={`rounded-[0.1875rem] laptop:w-[${images.length >= 4 ? `full` : `8.3125rem`}] h-full full_hd:w-full object-cover ${!expandedImages && idx > 4 ? `hidden` : ``} hover:cursor-pointer`}
                    width={2560}
                    height={1440}
                    placeholder="blur"
                    blurDataURL={img.url}
                    onClick={() => HandleOpenPreview(0, img)}
                />
            </>
        );
    }, [images, expandedImages]);

    const RenderSmallImageMobile = useMemo(() => ({ img, idx }: { img: PostImage, idx: number }) => {
        if (img.isPrimary) return null;

        if (idx == 4) {
            return (
                <div className={`relative w-full`} onClick={() => HandleOpenPreview(1, img)}>
                    <div className={`absolute ${expandedImages ? `hidden laptop:block` : ``} flex items-center text-center justify-center w-full h-full bg-[rgba(0,0,0,0.80)] text-[#FFF] text-base full_hd:text-base_2xl rounded-[0.1875rem]`}>Matyti daugiau+</div>
                    <Image
                        src={img.url}
                        alt="Primary Image"
                        className={`rounded-[0.1875rem] w-full h-full object-cover`}
                        width={1920}
                        height={1080}
                        placeholder="blur"
                        blurDataURL={img.url}
                    />
                </div>
            );
        };

        return (
            <>
                <Image
                    src={img.url}
                    alt="Small Image"
                    className={`rounded-[0.1875rem] laptop:w-[${images.length >= 4 ? `full` : `8.3125rem`}] h-full full_hd:w-full object-cover ${!expandedImages && idx > 4 ? `hidden` : `block`}`}
                    width={2560}
                    height={1440}
                    placeholder="blur"
                    blurDataURL={img.url}
                    onClick={() => HandleOpenPreview(1, img)}
                />
            </>
        );
    }, [images, expandedImages]);

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <RenderPrimaryImage />

            {/* Desktop users */}
            <div className={`hidden laptop:grid ${expandedImages ? `grid-cols-1 laptop:grid-cols-4` : `grid-cols-4`} gap-[0.2rem] laptop:gap-[1.25rem] overflow-hidden`}>
                {images.map((item, idx) => (
                    <RenderSmallImage img={item} idx={idx} key={`image_list_${idx}`} />
                ))}
            </div>
            {/* Mobile users */}
            <div className={`grid laptop:hidden ${expandedImages ? `grid-cols-1 laptop:grid-cols-4` : `grid-cols-4`} gap-[0.2rem] laptop:gap-[1.25rem] overflow-hidden`}>
                {images.map((item, idx) => (!item.isPrimary &&
                    <RenderSmallImageMobile img={item} idx={idx} key={`image_list_${idx}`} />
                ))}
            </div>
        </div>
    );
}