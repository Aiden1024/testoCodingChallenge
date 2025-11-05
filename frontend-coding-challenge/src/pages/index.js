import Head from "next/head";

// Import functions and components from the Storyblok React SDK
import {
  useStoryblokState,    // Keeps story data in sync with live updates in Storyblok Visual Editor
  getStoryblokApi,      // Initializes the Storyblok API for fetching content
  StoryblokComponent,   // Dynamically renders the Storyblok components from content blocks
} from "@storyblok/react";

// Home page component
export default function Home({ story }) {

  // Enables real-time content updates inside Storyblok Visual Editor
  story = useStoryblokState(story);

  return (
    <div>
      {/* Add meta information using Next.js Head */}
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Dynamically render the content coming from Storyblok.
          "blok" refers to the content tree that Storyblok returns. */}
      <StoryblokComponent blok={story.content} />
    </div>
  );
}

/**
 * getStaticProps:
 * This Next.js function runs at build time (or when revalidated).
 * It fetches the home story from Storyblok’s Content Delivery API.
 */
export async function getStaticProps() {
  // The slug of the story to fetch (in this case, the "home" story)
  let slug = "home";

  // Request parameters:
  // version: 'published' → ensures only published content is fetched
  let sbParams = {
    version: "published",
  };

  // Initialize Storyblok API client
  const storyblokApi = getStoryblokApi();

  // Fetch the story from Storyblok’s CDN API
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  // Return the data as props to the page component
  // revalidate: 10 → ISR, so the page is rebuilt every 10 seconds if content changes
  return {
    props: {
      story: data ? data.story : false,  // The story data from Storyblok
      key: data ? data.story.id : false, // Unique key for re-rendering when story changes
    },
    revalidate: 10, // This keeps the content fresh without redeploying
  };
}