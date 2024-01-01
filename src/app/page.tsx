import { Post } from "@/types/post.type";
import { HomePage } from "./components/pages/home/homePage";

type PostData = {
  status: 'success' | 'error';
  post: Post;
}

const getPostById = async (id: number) => {
  return await fetch(`${process.env.defaultApiEndpoint}/api/posts/getPostById`, {
    method: 'POST',
    body: JSON.stringify({
      postId: id
    })
  }).then(res => res.json()).catch((error) => {
    console.log(`[getPostById]: ${error}`);
    return { status: 'error' }
  });
}

export default async function Home() {
  const { status, post }: PostData = await getPostById(1);

  if (!status || status === 'error') return null; // Return error page
  const posts = Array(10).fill(post);

  return (
    <HomePage posts={posts}/>
  );
}