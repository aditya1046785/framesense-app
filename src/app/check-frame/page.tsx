"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckFramePage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                        {t('common.backToHome')}
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">{t('checkFrame.title')}</CardTitle>
                        <CardDescription>{t('checkFrame.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 border rounded-lg bg-card">
                            <h3 className="font-semibold mb-2 text-foreground">{t('common.whatYouNeed')}</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>{t('checkFrame.requirement1')}</li>
                                <li>{t('checkFrame.requirement2')}</li>
                                <li>{t('checkFrame.requirement3')}</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-primary/30 rounded-lg bg-primary/10 text-primary-foreground/80">
                           <div className="flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 mt-1 text-primary shrink-0"/>
                                <div>
                                    <h3 className="font-semibold text-primary-foreground/90">{t('common.privacyFirst')}</h3>
                                    <p className="text-sm">{t('common.privacyDescription')}</p>
                                </div>
                           </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Link href="/privacy" passHref>
                            <Button variant="outline">{t('common.learnMore')}</Button>
                        </Link>
                         <Link href="/check-frame/upload" passHref>
                            <Button size="lg">
                                {t('common.continue')}
                            </Button>
                         </Link>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}
