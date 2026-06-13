import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StorySection from "@/components/sections/StorySection";
import CollectionSection from "@/components/sections/CollectionSection";
import SpacesHubSection from "@/components/sections/SpacesHubSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />
      <StorySection />
      <CollectionSection />
      <SpacesHubSection />
    </main>
  );
}
