import PageHeader from "@/components/ui/PageHeader";

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" badge="Legal" />
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert prose-slate">
          <h2>Acceptance of Terms</h2>
          <p>By using our website and services, you agree to these terms of service. Please read them carefully.</p>
          
          <h2>Medical Disclaimer</h2>
          <p>The information provided on this website is for general informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for medical concerns.</p>
          
          <h2>Appointment Policy</h2>
          <p>We require 24-hour notice for appointment cancellations. Late cancellations may result in a fee. We reserve the right to reschedule appointments as needed.</p>
          
          <h2>Telemedicine</h2>
          <p>Telemedicine services are subject to availability and may not be suitable for all medical conditions. We comply with all applicable telemedicine regulations.</p>
          
          <h2>Limitation of Liability</h2>
          <p>MediCare shall not be liable for any damages arising from the use of our website or services, to the extent permitted by law.</p>
          
          <h2>Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>
          
          <p className="text-sm text-slate-500 mt-8">Last updated: March 2026</p>
        </div>
      </section>
    </>
  );
}
