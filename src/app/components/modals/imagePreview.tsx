import { PostImage } from "@/types/post.type";
import { ModalWrapper } from "../hooks/modal.hook";
import Modal from 'react-modal';
import Image from "next/image";
import { Suspense, useMemo } from "react";
import { useImgPreviewStore } from "@/store/image_preview/imagePreview.store";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Spinner } from "../spinner";

type ImagePreviewProps = {
    images: PostImage[];
}

export const ImagePreviewModal = ({ images }: ImagePreviewProps) => {
    const { isPreviewActive, previewImage, setActivePreview, setActiveImage } = useImgPreviewStore();

    const HandleCloseModal = () => {
        setActivePreview(false);
    }

    const PreviousImageClicked = () => {
        if (previewImage === null) return;

        const idx = images.findIndex(img => img.url === previewImage.url);
        const prevIdx = idx - 1;

        if (prevIdx < 0) {
            setActiveImage(images[images.length - 1]);
            return;
        }

        setActiveImage(images[prevIdx]);
    }

    const NextImageClicked = () => {
        if (previewImage === null) return;

        const idx = images.findIndex(img => img.url === previewImage.url);
        const nextIdx = idx + 1;

        if (nextIdx > images.length - 1) {
            setActiveImage(images[0]);
            return;
        }

        setActiveImage(images[nextIdx]);
    }

    const RenderSmallImages = useMemo(() => ({ img }: { img: PostImage }) => {
        // if (img.url === selectedImage.url) return null;

        const HandlePreviewChange = () => {
            setActiveImage(img);
        }

        return (
            previewImage && (
                <Image
                    src={img.url}
                    alt="Primary Image"
                    width={2560}
                    height={1440}
                    className={`w-[8.3125rem] h-[5.3125rem] justify-between rounded-[0.1875rem] transition-all ${img.url === previewImage.url ? `scale-[1.05]` : ``} object-cover`}
                    onClick={HandlePreviewChange}
                    placeholder="blur"
                    blurDataURL={img.url}
                />
            )
        )
    }, [previewImage]);

    const RenderDisplayedImg = useMemo(() => () => {
        return (
            previewImage && (
                <div className={`flex items-center justify-center w-[60%]`}>
                    <button type="button" onClick={PreviousImageClicked}>
                        <ChevronLeft className={`text-[#FFF] w-[4rem] h-[4rem]`} />
                    </button>
                    <Suspense fallback={<Spinner />}>
                        <Image
                            src={previewImage.url ?? images[0].url}
                            alt="Primary Image"
                            width={2560}
                            height={1440}
                            className={`rounded-[0.1875rem] w-full object-cover`}
                            placeholder="blur"
                            blurDataURL={previewImage.url}
                        />
                    </Suspense>
                    <button type="button" onClick={NextImageClicked}>
                        <ChevronRight className={`text-[#FFF] w-[4rem] h-[4rem]`} />
                    </button>
                </div>
            )
        )
    }, [previewImage]);

    return (
        <Modal isOpen={isPreviewActive} className={`w-full h-full bg-[rgba(0,0,0,0.50)] flex items-center justify-center z-1 absolute`}>
            <button type="button" className={`absolute top-[1rem] right-[1rem]`} onClick={HandleCloseModal}><X className={`text-[#FFF] w-[2rem] h-[2rem]`} /></button>
            <div className={`flex flex-col gap-[1.25rem] justify-center items-center w-full h-full`}>
                <RenderDisplayedImg />
                {/* <div className={`flex gap-[1.25rem] px-[2rem]`}>
                    {images.map((item, idx) => (
                        <RenderSmallImages img={item} key={`image_preview_${idx}`} />
                    ))}
                </div> */}
            </div>
        </Modal>
    )
}