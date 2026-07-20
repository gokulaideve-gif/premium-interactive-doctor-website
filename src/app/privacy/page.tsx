import PageHeader from "@/components/ui/PageHeader";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" badge="Legal" />
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert prose-slate">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, including your name, email address, phone number, and health information when you book appointments or contact us.</p>
          
          <h2>How We Use Your Information</h2>
          <p>We use your information to provide medical services, process appointments, send reminders, and improve our healthcare services. We comply with HIPAA regulations for protecting your health information.</p>
          
          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal and health information from unauthorized access, alteration, or disclosure.</p>
          
          <h2>Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
          
          <h2>Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact us at privacy@medicare.com.</p>
          
          <p className="text-sm text-slate-500 mt-8">Last updated: March 2026</p>
        </div>
      </section>
    </>
  );
}
