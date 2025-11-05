import Head from "next/head";

// Importing Storyblok SDK functions and types
import {
  getStoryblokApi,      // Utility to connect to the Storyblok API
  ISbStoryData,         // TypeScript type for Storyblok story data
  StoryblokComponent,   // Component that knows how to render Storyblok components dynamically
  useStoryblokState,    // Custom hook to keep stories in sync for real-time editing
} from "@storyblok/react";

// Define the expected properties for this component (the story data)
interface storyblokProps {
  story: ISbStoryData<void>;
}

// Default export — this is the Next.js page component
export default function Page(props: storyblokProps) {
  // useStoryblokState enables live-editing inside Storyblok’s visual editor
  // It updates the content when the editor changes without a full reload
  const story = useStoryblokState(props.story);

  return (
    <div>
      {/* Manage the page’s metadata using the Next.js Head component */}
      <Head>
        <title>{story ? story.name : "Null"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Coding Challenge" />
      </Head>

      {/* Render the Storyblok content tree.
          StoryblokComponent automatically matches and renders
          the components defined in Storyblok’s CMS editor */}
      <StoryblokComponent blok={story.content} />
    </div>
  );
}

/**
 * Next.js getServerSideProps function
 * - Runs on every request
 * - Fetches the Storyblok story based on the slug in the URL
 */
export async function getServerSideProps({
  params,
}: {
  params: { slug: string[] };
}) {
  // If there's no slug, default to the "home" story
  let slug = params.slug ? params.slug.join("/") : "home";

  // Initialize Storyblok API client
  const storyblokApi = getStoryblokApi();

  // Fetch story data from Storyblok’s CDN API
  // "version: published" ensures you fetch the live published story
  // The token authenticates requests to your Storyblok space
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "published",
    token: "7FmwGeMV2rQLGkGafUByDAtt",
  });

  // Send the fetched story back to the page as props
  return {
    props: {
      story: data ? data.story : false, // The actual story content
      key: data ? data.story.id : false, // Helps Next.js re-render on story change
    },
  };
}