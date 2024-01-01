import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Banner from "@/components/Banner";
import SectionCard from "@/components/SectionCard";
import { getVideosById } from "@/lib/videoByChannelld";
import { useRouter } from "next/router";

export async function getStaticProps(staticProps: {
  params: { lecturerName: string };
}) {
  const { lecturerName } = staticProps.params;
  const videos = await getVideosById(lecturerName);
  return { props: { videos } };
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          lecturerName: "Lewishowes",
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
};

function Lecturer({ videos }: any) {
  // console.log(videos);
  const router = useRouter();
  const { lecturerName } = router.query;
  return (
    <div>
      <Banner
        title="Lewis Howes"
        subtitle="School of Greatness"
        imgUrl="/static/SOG-feature-image2.jpg"
      />

      <SectionCard
        title={lecturerName as string}
        colorClass="bg-[#222]"
        videos={videos}
        size="small"
      />
    </div>
  );
}

export default Lecturer;
