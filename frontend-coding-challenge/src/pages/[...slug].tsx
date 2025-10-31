import Head from "next/head";

import {
  getStoryblokApi,
  ISbStoryData,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";

interface storyblokProps {
  story: ISbStoryData<void>;
}

export default function Page(props: storyblokProps) {
  const story = useStoryblokState(props.story);
  return (
    <div>
      <Head>
        <title>{story ? story.name : "Null"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Coding Challenge" />
      </Head>
      <StoryblokComponent blok={story.content} />
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { slug: string[] };
}) {
  let slug = params.slug ? params.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "published",
    token: "7FmwGeMV2rQLGkGafUByDAtt",
  });

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
  };
}
