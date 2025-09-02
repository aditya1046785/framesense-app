"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto py-12 px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    {t('common.backToHome')}
                </Link>
                <h1 className="text-4xl font-bold font-headline mb-8">{t('privacy.title')}</h1>
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('privacy.section1.title')}</h2>
                        <p>{t('privacy.section1.content')}</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('privacy.section2.title')}</h2>
                        <p>{t('privacy.section2.intro')}</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li><strong>{t('privacy.section2.item1.title')}:</strong> {t('privacy.section2.item1.content')}</li>
                            <li><strong>{t('privacy.section2.item2.title')}:</strong> {t('privacy.section2.item2.content')}</li>
                            <li><strong>{t('privacy.section2.item3.title')}:</strong> {t('privacy.section2.item3.content')}</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('privacy.section3.title')}</h2>
                        <p>{t('privacy.section3.intro')}</p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>{t('privacy.section3.item1')}</li>
                            <li>{t('privacy.section3.item2')}</li>
                            <li>{t('privacy.section3.item3')}</li>
                            <li>{t('privacy.section3.item4')}</li>
                        </ul>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('privacy.section4.title')}</h2>
                        <p>{t('privacy.section4.content')}</p>
                    </section>
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold font-headline text-foreground">{t('privacy.section5.title')}</h2>
                        <p>
                            {t('privacy.section5.content')}
                            <a href="mailto:privacy@framesense.example.com" className="text-primary hover:underline">privacy@framesense.example.com</a>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
