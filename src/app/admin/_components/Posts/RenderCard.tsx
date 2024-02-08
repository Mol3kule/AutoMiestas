"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useLanguage } from "@/lib/languageUtils";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { getDateFromTimestampWithTime } from "@/lib/getDate";
import { ApprovePost, StopPost } from "@/actions/posts/post.actions";
import { VehicleObj } from "@/classes/Vehicle";

import { Post } from "@/types/post.type";

import { animated, useTransition } from "@react-spring/web";
import toast from "react-hot-toast";
import { useState } from "react";
import { StopPostModal } from "@/components/modals/stop-post-modal";

type PostStatus = "active" | "inactive";

type PostCardProps = {
    children: React.ReactNode;
    post: Post;
};

const PostCard = ({ children, post }: PostCardProps) => {
    const { id, images, information, status: { isPublished } } = post;
    const { vehicleMakes, vehicleModels } = useVehicleStore();

    const t = useLanguage();
    const router = useRouter();

    const PostStatuses: { [key in PostStatus]: string } = {
        active: "Aktyvus",
        inactive: "Neaktyvus"
    };

    const { isLoading, data: useVehicleData } = useQuery({
        queryKey: ["getVehicleData", { vehicleMakes, vehicleModels }],
        queryFn: async () => {
            if (!vehicleMakes.length || !Object.values(vehicleModels).length) return;
            if ('vehicleData' in information) {
                const vehicleData = information.vehicleData;
                return VehicleObj.getVehicleDataByIdx(vehicleMakes, vehicleModels, vehicleData.make, vehicleData.model, vehicleData.body_type, vehicleData.condition, vehicleData.fuel_type, vehicleData.drive_train, vehicleData.transmission, vehicleData.sw_side);
            }
            return null;
        }
    });

    const RedirectToPost = () => {
        router.push(`/posts/${post.slug}`);
    };

    const transitions = useTransition(!isLoading, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        config: { duration: 1000 }
    });

    return (
        !isLoading && (
            transitions((style) => (
                <animated.div style={style} className={`flex flex-col gap-[1.25rem] px-[1.75rem] py-[1.56rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                    <div className={`w-max px-[0.62rem] py-[0.25rem] rounded-[0.1875rem] ${isPublished ? `bg-[rgba(92,131,116,0.08)] text-highlight` : `bg-[rgba(255,168,0,0.08)] text-error_third`}`}>
                        <span className={`text-base full_hd:text-base_2xl`}>{isPublished ? PostStatuses.active : PostStatuses.inactive}</span>
                    </div>
                    <div className={`flex gap-[1.25rem] items-center`}>
                        <div className={`w-[3.125rem] h-[3.125rem] rounded-full`}>
                            {post.images && (
                                <Image
                                    src={images.find(img => img.isPrimary)?.url || images[0].url}
                                    alt="post_image"
                                    className={`rounded-full w-full h-full object-cover`}
                                    width={1920}
                                    height={1080}
                                />
                            )}
                        </div>
                        {'vehicleData' in information && useVehicleData && (
                            <div className={`flex flex-col text-primary text-base full_hd:text-base_2xl hover:cursor-pointer hover:opacity-60 duration-500`} onClick={RedirectToPost}>
                                <span>{useVehicleData.make?.make} {useVehicleData.model?.model}</span>
                                <span>{t.general.id}: #{id}</span>
                            </div>
                        )}
                        {'itemData' in information && (
                            <div className={`flex flex-col text-primary text-base full_hd:text-base_2xl hover:cursor-pointer hover:opacity-60 duration-500`} onClick={RedirectToPost}>
                                <span>{information.title}</span>
                                <span>{t.general.id}: #{id}</span>
                            </div>
                        )}
                    </div>
                    <div className={`text-highlight text-base full_hd:text-base_2xl flex flex-col`}>
                        <span>{t.my_posts.post_uploaded} {getDateFromTimestampWithTime(post.periods.time_created)}</span>
                        <span>{t.my_posts.post_edited} {getDateFromTimestampWithTime(post.periods.time_updated)}</span>
                    </div>
                    {children}
                </animated.div>
            ))
        )
    );
};

export const RenderActivePostCard = ({ post }: { post: Post }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const queryClient = useQueryClient();
    const t = useLanguage();

    const HandleStop = async ({ type, errors }: { type: number, errors: Number[] }) => {
        setIsModalOpen(false);

        const { status } = await StopPost(post.id!, { type, errors });

        await queryClient.invalidateQueries({ queryKey: ["getAllPosts"], exact: true });
        if (status !== 200) {
            toast.error(t.errors.error_stopping_post.replace(`{{id}}`, `${post.id}`));
            return;
        }
        toast.success(`Sėkmingai sustabdytas skelbimas - #${post.id}`);
    };

    const DeleteBtn = async () => { };

    return (
        <PostCard post={post}>
            <div className={`flex gap-[0.87rem]`}>
                <RenderActionButton className={`bg-highlight text-[#FFF]`} onClick={() => setIsModalOpen(true)}>Sustabdyti skelbimą</RenderActionButton>
                <RenderActionButton className={`bg-error_secondary text-[#FFF]`} onClick={DeleteBtn}>Pašalinti</RenderActionButton>
            </div>
            <StopPostModal isOpen={isModalOpen} setOpen={setIsModalOpen} onSelect={HandleStop} />
        </PostCard>
    )
};

export const RenderInactivePostCard = ({ post }: { post: Post }) => {
    const queryClient = useQueryClient();

    const { mutateAsync: approvePost } = useMutation({
        mutationFn: async () => {
            return await ApprovePost(post.id!);
        },
        onSuccess: (response) => {
            if (response) {
                toast.success(`Sėkmingai patvirtinote skelbimą - #${post.id}`);
            } else {
                toast.error(`Nepavyko patvirtinti skelbimo - #${post.id}`);
            }
            queryClient.invalidateQueries({ queryKey: ["getPosts"], exact: true });
        }
    });

    const ApproveBtn = async () => {
        await approvePost();
    };

    const RejectBtn = async () => { };

    const DeleteBtn = async () => { };

    return (
        <PostCard post={post}>
            <div className={`flex gap-[0.87rem]`}>
                <RenderActionButton className={`bg-highlight text-[#FFF]`} onClick={ApproveBtn}>Patvirtinti</RenderActionButton>
                <RenderActionButton className={`bg-error_third text-[#FFF]`} onClick={RejectBtn}>Atmesti</RenderActionButton>
                <RenderActionButton className={`bg-error_secondary text-[#FFF]`} onClick={DeleteBtn}>Pašalinti</RenderActionButton>
            </div>
        </PostCard>
    )
};

export const RenderDraftPostCard = ({ post }: { post: Post }) => {
    const DeleteBtn = async () => { };

    return (
        <PostCard post={post}>
            <div className={`flex gap-[0.87rem]`}>
                <RenderActionButton className={`bg-error_secondary text-[#FFF]`} onClick={DeleteBtn}>Pašalinti</RenderActionButton>
            </div>
        </PostCard>
    )
};

const RenderActionButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick: () => void }) => {
    return (
        <button className={`px-[0.62rem] py-[0.5rem] rounded-[0.1875rem] ${className} hover:opacity-80 duration-500`} onClick={onClick}>{children}</button>
    )
};