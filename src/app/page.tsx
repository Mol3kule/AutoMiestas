import { HomePage } from "./components/pages/home/homePage";

type HomeProps = {
  params: any;
  searchParams: { page: number };
};

const Home = async ({ searchParams }: HomeProps) => {
  return (
    <HomePage searchParams={searchParams} />
  );
}

export default Home;