// Import global CSS styles.  This ensures global styling is applied to all pages.
import "../styles/globals.css";

// Import Storyblok initialization utilities and plugin.
import { storyblokInit, apiPlugin } from "@storyblok/react";

// Import React components that correspond to Storyblok "Bloks" (content types)
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import ImageTextSection from "../components/ImageTextSection";

// Map Storyblok component names (as defined in the CMS)
// to the actual React components in your codebase.
// This tells Storyblok how to render each type of content block.
const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  "default-page": Page,
  "image-text-section": ImageTextSection
};

// Initialize Storyblok with:
// - Your access token (links to a specific Storyblok space)
// - The API plugin (to fetch content from the Storyblok CDN API)
// - The components mapping above, which enables dynamic rendering
storyblokInit({
  accessToken: "7AYvqGn4sJQV8tWRrG4g7Att", // Storyblok space token
  use: [apiPlugin], // Adds API capabilities (fetching stories, etc.)
  components, // Connect Storyblok components to your React components
});

// The custom App component in Next.js
// Next.js uses this top-level component to initialize pages.
// It wraps all page-level components, injecting any needed providers or setup logic.
function MyApp({ Component, pageProps }) {
  // Renders the active page (Component) with its props.
  // Storyblok setup runs automatically now for all pages.
  return <Component {...pageProps} />;
}

export default MyApp;