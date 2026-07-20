import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import AchievementsGrid from "@/components/achievements/AchievementsGrid";
import { getPublishedAchievements } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Awards, qualifications, research and milestones from Dr. Swathy Priya Wellness Centre.",
};

export default async function AchievementsPage() {
  const achievements = await getPublishedAchievements();

  return (
    <div data-cms-page="achievements">
      <PageHeader
        title="Achievements & milestones"
        subtitle="A growing record of learning, service and meaningful contributions to patient wellness."
        badge="Dr. Swathy Priya"
      />
      <section className="bg-[#fffafd] py-16 dark:bg-slate-950 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AchievementsGrid achievements={achievements} />
        </div>
      </section>
    </div>
  );
}
