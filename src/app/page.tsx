import HeroSectionV2 from "@/components/home/HeroSectionV2";
import ServicesPreviewPink from "@/components/home/ServicesPreviewPink";
import WhyChooseUsPink from "@/components/home/WhyChooseUsPink";
import StatsCounterPink from "@/components/home/StatsCounterPink";
import TestimonialsPreviewPink from "@/components/home/TestimonialsPreviewPink";
import CTASectionPink from "@/components/home/CTASectionPink";
import AchievementsPreview from "@/components/home/AchievementsPreview";
import { cmsMap, getCmsContent, getPublishedAchievements } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [contentRows, achievements] = await Promise.all([
    getCmsContent(["global", "home"]),
    getPublishedAchievements(4),
  ]);
  const content = cmsMap(contentRows);

  return (
    <>
      <HeroSectionV2 content={content} />
      <StatsCounterPink />
      <ServicesPreviewPink />
      <WhyChooseUsPink />
      <AchievementsPreview achievements={achievements} content={content} />
      <TestimonialsPreviewPink />
      <CTASectionPink />
    </>
  );
}
