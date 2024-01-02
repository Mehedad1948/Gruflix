import Head from "next/head";
import useColorMode from "@/hooks/useColorMode";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import SectionCard from "@/components/SectionCard";
import { getVideos } from "@/lib/video";
import { magic } from "@/lib/magic-client";

export async function getStaticProps() {
  const reactVideos = await getVideos("reactjs");
  const tailwindVideos = await getVideos("tailwind");
  const threejsVideos = await getVideos("three js");
  return { props: { reactVideos, tailwindVideos, threejsVideos } };
}
interface Props {
  reactVideos: any;
  tailwindVideos: any;
  threejsVideos: any;
}

export default function Home({
  reactVideos = [],
  tailwindVideos,
  threejsVideos,
}: Props) {
  const [colorMode, setColorMode] = useColorMode();

  const videosSample = [
    { imgUrl: "/static/Lewishowes.jpg", linkTo: "/lecturers/Lewishowes" },
    { imgUrl: "/static/Lewishowes.jpg", linkTo: "/lecturers/Lewishowes" },
    { imgUrl: "/static/Lewishowes.jpg", linkTo: "/lecturers/Lewishowes" },
  ];
  console.log({ magic });

  return (
    <div>
      <Head>
        <title>Gruflix</title>
      </Head>

      <Banner
        title="Jordan B Peterson"
        subtitle="Lecture in harvard university"
        imgUrl="/static/jp2.jpg"
      />

      <SectionCard
        title="React"
        colorClass="bg-gradient-to-tr from-blue-950 to-slate-950"
        videos={reactVideos}
        size="small"
      />
      <SectionCard
        title="TailwindCSS"
        colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={tailwindVideos}
        size="medium"
      />
      <SectionCard
        title="Three.js"
        colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
    </div>
  );
}
