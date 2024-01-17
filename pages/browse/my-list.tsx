import Modal from "@/components/Modal";
import SectionCard from "@/components/SectionCard";
import { favouritedVideos } from "@/lib/favouritedVideos";
import redirectUser from "@/lib/utils/redirectUsers";
import { VideoData } from "@/models/videos";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { token, userId } = await redirectUser(context);
  let videos: VideoData[] = [];
  if (token) {
    videos = await favouritedVideos({ token, userId });
  }
  return {
    props: { myListVideos: videos },
  };
};

const MyListPage = ({ myListVideos }: { myListVideos: VideoData[] }) => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className="mt-16">
        <SectionCard title="My List" videos={myListVideos} />
      </main>
    </div>
  );
};

export default MyListPage;
