import { CreatePostPage } from "../components/pages/posts/create/page";

const getAllMakes = async () => {
    return await fetch(`${process.env.defaultApiEndpoint}/api/vehicles/getAllMakes`)
        .then(res => res.json())
        .catch(err => console.log(err));
}

const PostCreatePage = async () => {
    const { status, data } = await getAllMakes();

    return (
        <CreatePostPage allMakes={data} />
    );
}

export default PostCreatePage;