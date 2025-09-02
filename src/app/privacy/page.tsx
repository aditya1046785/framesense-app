import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto py-12 px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold font-headline mb-8">Privacy Policy</h1>
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">1. Introduction</h2>
                        <p>Welcome to FrameSense. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our web application.</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">2. Information We Collect</h2>
                        <p>We are a privacy-first service. We are designed to collect the minimum information necessary to provide our service:</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li><strong>Images:</strong> We require you to provide images (selfies, photos of frames) to perform our fit analysis. These images are used solely for the analysis and are deleted immediately after processing. We do not store your images.</li>
                            <li><strong>Analysis Results:</strong> We store the anonymized text-based results of the analysis (e.g., measurements, fit verdict) for 30 days to allow you to access your report via a shareable link. After 30 days, this data is automatically deleted.</li>
                            <li><strong>Contact Information (Optional):</strong> If you choose to send your report via email or SMS, we collect your email address or phone number. This information is used only to send the report and is not stored long-term or used for marketing purposes.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">3. How We Use Your Information</h2>
                        <p>We use the information we collect strictly to:</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>Provide, operate, and maintain our service.</li>
                            <li>Perform the eyeglass fit analysis.</li>
                            <li>Generate and deliver your fit report if you request it.</li>
                            <li>Improve our service based on fully anonymized usage data and feedback.</li>
                        </ul>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">4. Data Deletion</h2>
                        <p>We take data deletion very seriously. All images you provide are deleted from our servers immediately after the analysis is complete. Anonymized text results are deleted after 30 days. We do not create user accounts, so there is no personal data to manage beyond the temporary analysis results.</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@framesense.example.com" className="text-primary hover:underline">privacy@framesense.example.com</a>.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
