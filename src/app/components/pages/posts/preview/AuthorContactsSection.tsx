'use client';

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios from "axios";

import { animated, useSpring } from '@react-spring/web';
import { Spinner } from "@/components/spinner";
import { Heart, Link, Phone } from "lucide-react";

import { useLanguage } from "@/lib/languageUtils";
import { Post, PostStatistics } from "@/types/post.type";
import { useRouter } from "next/navigation";
import { getPostById } from "@/actions/posts/post.actions";

export const AuthorContactsSection = ({ post, phoneNumber }: { post: Post, phoneNumber: string }) => {
    const t = useLanguage();
    const { user, isLoaded } = useUser();
    const [isPhoneExpanded, setIsPhoneExpanded] = useState<boolean>(false);
    const [postLikes, setPostLikes] = useState<string[]>(post.statistics.times_liked);

    const [phoneButtonSpring, api] = useSpring(() => ({
        config: { duration: 1000 }
    }));

    const router = useRouter();

    const HandlePhoneClick = () => {
        if (!user) {
            toast.error(t.general.user_not_logged_in, { duration: 5000 });
            return;
        }

        setIsPhoneExpanded(!isPhoneExpanded);
        api.start({
            from: {
                width: '0%',
            },
            to: [
                { width: '100%' }
            ]
        });
    };

    const HandleCopyLinkClick = () => {
        navigator.clipboard.writeText(window.location.toString());
        toast.success(t.general.link_copied, { duration: 5000 });
    };

    const HandleLikeClick = async () => {
        if (!user) {
            toast.error(t.general.user_not_logged_in, { duration: 5000 });
            return;
        }

        const favoriteResponse = axios.post(`${process.env.defaultApiEndpoint}/api/posts/setFavoriteById`, { postId: post.id }).then(res => res.data);

        const responseData = await favoriteResponse as { status: number, translation: string };
        if (responseData.status !== 200) {
            toast.error(t.general[responseData.translation as keyof typeof t.general], { duration: 5000 });
            return;
        }

        const getPostResponse = await getPostById(post.id!);

        if (!getPostResponse) {
            toast.error('Error, post not found', { duration: 5000 });
            return;
        }

        const postStats = getPostResponse.statistics as PostStatistics;

        setPostLikes(postStats.times_liked);

        await toast.promise(favoriteResponse, {
            loading: t.general.action_in_progress,
            error: t.general.server_error,
            success: t.general[responseData.translation as keyof typeof t.general],
        }, { duration: 5000 });
    };

    return (
        <div className={`flex flex-col laptop:flex-row gap-[0.94rem] laptop:h-[4.5rem] bg-highlight_secondary rounded-[0.1875rem] px-[0.94rem] py-[0.94rem] ${!isLoaded ? `items-center justify-center` : `justify-between`}`}>
            {isLoaded ? (
                <>
                    <animated.button
                        type="button" onClick={HandlePhoneClick}
                        style={phoneButtonSpring}
                        className={`flex gap-[0.88rem] bg-primary w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.9] duration-700`}>
                        <Phone className={`text-[#FFF] w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                        {isPhoneExpanded && (
                            <span className={`text-[#FFF] text-sm laptop:text-base`}>{phoneNumber}</span>
                        )}
                    </animated.button>
                    {!isPhoneExpanded && (
                        <>
                            <button type="button" onClick={HandleCopyLinkClick} className={`flex bg-[#FFF] w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.6] duration-700`}>
                                <Link className={`text-primary w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                            </button>
                            <button type="button" onClick={HandleLikeClick} className={`flex bg-[#FFF] w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.6] duration-700`}>
                                <Heart className={`${user && postLikes.includes(user.id) ? `text-highlight` : `text-primary`} w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                            </button>
                        </>
                    )}
                </>
            ) : (
                <Spinner color="dark" />
            )}
        </div>
    )
}