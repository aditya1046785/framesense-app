"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Glasses, ScanFace } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-foreground tracking-tight">FrameSense</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">{t('home.tagline')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:border-primary transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Glasses className="w-8 h-8 text-primary" />
                  <span className="text-2xl">{t('home.checkFrameTitle')}</span>
                </CardTitle>
                <CardDescription>
                  {t('home.checkFrameDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/check-frame" passHref>
                  <Button className="w-full" size="lg">{t('home.startAnalysis')}</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:border-primary transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ScanFace className="w-8 h-8 text-primary" />
                  <span className="text-2xl">{t('home.analyzeCurrentTitle')}</span>
                </CardTitle>
                <CardDescription>
                  {t('home.analyzeCurrentDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/analyze-current" passHref>
                  <Button className="w-full" size="lg">{t('home.analyzeMyFit')}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
