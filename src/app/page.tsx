import { auth } from "@clerk/nextjs";
import axios from "axios";

import { Post } from "@/types/post.type";
import { HomePage } from "./components/pages/home/homePage";

type PostData = {
  status: number;
  data: Post[];
}

const getPosts = async (token: string | null) => {
  return await axios.get(`${process.env.defaultApiEndpoint}/api/posts/getPosts`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

const Home = async () => {
  const { getToken } = auth();
  const { status, data }: PostData = await getPosts(await getToken());

  if (status !== 200) return null; // Return error page

  return (
    <HomePage posts={data} />
  );
}

export default Home;