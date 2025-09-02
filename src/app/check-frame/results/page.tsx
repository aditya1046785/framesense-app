"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, RefreshCw, Share2, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type AnalysisResults = {
    style: string;
    confidence: number;
};

export default function CheckFrameResultsPage() {
    const router = useRouter();
    const [results, setResults] = useState<AnalysisResults | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedResults = sessionStorage.getItem('analysisResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        } else {
            // Redirect if no results are found
            router.push('/check-frame');
        }
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
                <p>Loading results...</p>
            </div>
        );
    }

    if (!results) {
        return (
             <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
                <p>No analysis results found. Please start a new analysis.</p>
                <Link href="/check-frame" passHref>
                    <Button className="mt-4">Start Over</Button>
                </Link>
            </div>
        )
    }

    const { style, confidence } = results;
    const confidencePercentage = (confidence * 100);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href="/check-frame/upload" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Upload
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-primary" />
                            Frame Analysis
                        </CardTitle>
                        <CardDescription>We've analyzed the style of the frame you uploaded.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Card className="p-6">
                             <h3 className="font-semibold text-lg mb-2">Identified Frame Style</h3>
                             <p className="text-4xl font-bold text-primary capitalize mb-4">{style}</p>
                             <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Confidence</span>
                                    <span>{confidencePercentage.toFixed(0)}%</span>
                                </div>
                                <Progress value={confidencePercentage} />
                             </div>
                        </Card>
                         <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300">
                           <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 mt-1 text-green-500 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold text-green-600 dark:text-green-200">Good News!</h3>
                                    <p className="text-sm">Based on our analysis, frames with a <strong className="capitalize">{style}</strong> shape are generally a good match for your facial structure. You can proceed with confidence.</p>
                                </div>
                           </div>
                        </div>
                        
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                        <Link href="/check-frame/upload" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Analyze Another Frame
                            </Button>
                        </Link>
                        <Button className="w-full sm:w-auto">
                            <Search className="mr-2 h-4 w-4" />
                            Find Similar Frames
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
