import { PostImage } from "@/types/post.type";
import { create } from "zustand";

type PreviewStore = {
    isPreviewActive: boolean;
    previewImage: PostImage | null;
    
    setActiveImage: (previewImage: PostImage) => void;
    setActivePreview: (isActive: boolean) => void;
}

export const useImgPreviewStore = create<PreviewStore>()((set) => ({
    isPreviewActive: false,
    previewImage: null,

    setActiveImage: (previewImage: PostImage) => set({ previewImage }),
    setActivePreview: (isPreviewActive: boolean) => set({ isPreviewActive }),
}));