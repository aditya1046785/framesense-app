import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto py-12 px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold font-headline mb-8">Terms of Service</h1>
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">1. Acceptance of Terms</h2>
                        <p>By accessing or using FrameSense, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">2. Description of Service</h2>
                        <p>FrameSense provides a web-based tool to help users analyze the fit of eyeglasses based on images. The service provides estimations and recommendations but is not a substitute for professional advice.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">3. Disclaimer of Medical Advice</h2>
                        <p><strong>FrameSense is not a medical device and does not provide medical advice.</strong> The fit analysis, recommendations, and red-flag triage are for informational purposes only. Our service is not intended to diagnose any medical condition or replace a professional consultation with a qualified optometrist or ophthalmologist. Always consult a professional for any health concerns or before making decisions about your eyewear.</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">4. User Conduct</h2>
                        <p>You agree not to use the service for any unlawful purpose or to upload any content that is offensive, harmful, or violates the rights of others. You are responsible for the images you upload and for ensuring you have the right to use them.</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">5. Limitation of Liability</h2>
                        <p>FrameSense is provided "as is," and we make no warranties regarding its accuracy or reliability. In no event shall FrameSense be liable for any damages arising from the use of our service.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">6. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
