"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
    const { t } = useLanguage();
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto py-12 px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    {t('common.backToHome')}
                </Link>
                <h1 className="text-4xl font-bold font-headline mb-8">{t('terms.title')}</h1>
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('terms.section1.title')}</h2>
                        <p>{t('terms.section1.content')}</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('terms.section2.title')}</h2>
                        <p>{t('terms.section2.content')}</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('terms.section3.title')}</h2>
                        <p><strong>{t('terms.section3.important')}</strong> {t('terms.section3.content')}</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('terms.section4.title')}</h2>
                        <p>{t('terms.section4.content')}</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('terms.section5.title')}</h2>
                        <p>{t('terms.section5.content')}</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('terms.section6.title')}</h2>
                        <p>{t('terms.section6.content')}</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
