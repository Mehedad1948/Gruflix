import Head from "next/head";
import useColorMode from "@/hooks/useColorMode";
import Banner from "@/components/Banner";
import SectionCard from "@/components/SectionCard";
import { getVideos } from "@/lib/video";
import { queryHasuraGQL } from "@/lib/db/hasura";
import { ReactElement, useEffect, useState } from "react";
import { watchedVideos } from "@/lib/watchedVideos";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { VideoData } from "@/models/videos";
import { verifyToken } from "@/lib/utils/verifiyToken";
import Slider from "@/components/Slider";
import { NextPageWithLayout } from "./_app";
import Default from "@/components/layouts/default";
import { LoadMore } from "@/components/molecules/load-more";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { token = null } = context.req.cookies;

  const sessionToken = context.req.cookies["next-auth.session-token"];
  let watchItAgain: VideoData[] = [];

  if (sessionToken) {
    const userId = await verifyToken(sessionToken);
    if (userId) {
      watchItAgain = await watchedVideos({
        token: sessionToken,
        userId,
      });
    }
  }
  const reactVideos = await getVideos("best reactjs course");
  const tailwindVideos = await getVideos("tailwind");
  const threejsVideos = await getVideos("three js");

  return {
    props: { reactVideos, tailwindVideos, threejsVideos, watchItAgain },
  };
};

interface Props {
  reactVideos: VideoData[];
  tailwindVideos: VideoData[];
  threejsVideos: VideoData[];
  watchItAgain: VideoData[];
}

const Home: NextPageWithLayout = ({
  reactVideos = [],
  tailwindVideos,
  threejsVideos,
  watchItAgain,
}: Props) => {
  console.log({ reactVideos });

  const [colorMode, setColorMode] = useColorMode();
  const videosSample = [
    { imgUrl: "/static/Lewishowes.jpg", linkTo: "/lecturers/Lewishowes" },
    { imgUrl: "/static/Lewishowes.jpg", linkTo: "/lecturers/Lewishowes" },
    { imgUrl: "/static/Lewishowes.jpg", linkTo: "/lecturers/Lewishowes" },
  ];

  useEffect(() => {
    const get = async () => {
      const user = await queryHasuraGQL(
        `query MyQuery {
    users(where: {issuer: {_eq: "test"}})
    {
      id, 
      email,
      issuer
    }
  }`,
        "MyQuery",
        {},
        "WyIweGY0MWEyOGU3YjZjZjNkMzNhZDFkMjA4MmY2NWNkNTBlMzhhYWU3MGY4ZDVmZDYzN2I4OWY4MmY5YjBjZDYxYTk2MmFjNWM2MGVkYmUxMDQwMzQ3YTMyNjMzNzJiNzgyYmZjZDE0ZGZlNWZjYzQxMzAyOTQwMWRkMWZjZWViY2U4MWIiLCJ7XCJpYXRcIjoxNzA0NzMzODAwLFwiZXh0XCI6MTcwNDczNDcwMCxcImlzc1wiOlwiZGlkOmV0aHI6MHg3RTk4MUZjNzQ4NzljQmRkMDE4ZjFFMjk5NkJlN0JDNTQ4ZDJDNTQ5XCIsXCJzdWJcIjpcIjFrMkg2MzU2eXBmdk5KWUxidnJ3aEJ5V05kYUVOY3VyMnFSbWkyVUVLbUk9XCIsXCJhdWRcIjpcIkRxT3oyampLR3htVXAwaWZ4ZTVDYnUycmFpblZidUs2M1JhUlBUM2lCdjQ9XCIsXCJuYmZcIjoxNzA0NzMzODAwLFwidGlkXCI6XCI0NGZlYmVlZC05MGQ1LTQwNDMtOTA3My05YzBlNzRmYTU4YWRcIixcImFkZFwiOlwiMHhlNWYwNTJmNzQzNTk1YmM4MWRiNTRlY2NiZGNlMjNmMjAzNWNlNzU0MjdkMGE0OGQ2YTNhZWMxZDZjMTg3NTA4MWNhYzcxODQyOTFhMGNlMDc4YjMwM2E2NTJlOGIxMjBlOWQyNzZkZTEwNTE0N2I5M2UxYWM4NjNjNTE1NjE1MDFiXCJ9Il0=",
      );
      // console.log({ user });
    };
    get();
  }, []);

  useEffect(() => {
    {
      async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const locomotive = new LocomotiveScroll();
      };
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Gruflix</title>
      </Head>

      <Banner
        videos={[reactVideos[2], tailwindVideos[2], threejsVideos[2]]}
        title="Jordan B Peterson"
        subtitle="Lecture in harvard university"
        imgUrl="https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg"
      />

      <SectionCard
        title="React"
        colorClass="bg-"
        // colorClass="bg-gradient-to-tr from-blue-950 to-slate-950"
        videos={reactVideos}
        size="small"
      />
      {watchItAgain.length > 0 && (
        <SectionCard
          title="ٌWatch it again"
          // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
          videos={watchItAgain}
          size="medium"
        />
      )}
      <SectionCard
        title="Next.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={tailwindVideos}
        size="medium"
      />
      <SectionCard
        title="Typescript"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Three.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />

      <LoadMore />

      {/* <SectionCard
        title="GSAP"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Vue.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Nuxt.js"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      />
      <SectionCard
        title="Clean Code"
        // colorClass="bg-gradient-to-tr from-emerald-900 to-slate-950"
        videos={threejsVideos}
        size="large"
      /> */}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};

export default Home;
