import prisma from "@/prisma/prisma"
import { RenderPost } from "./RenderPost";

export const DisplayPosts = async () => {
    const Posts = await prisma.posts.findMany();
    return (
        <div className={`relative flex flex-col gap-[20px] min-w-full`}>
            <div className={`text-[#111] text-[11px]`}>Skelbimai ({Posts.length})</div>
            {/* All posts */}
            <div className={`grid grid-cols-1 grid-rows-1 gap-[20px]`}>
                {/* Sort posts by boosted date */}
                <RenderPost data={Posts}/>
            </div>
        </div>
    )
}