"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, RefreshCw, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type AnalysisResults = {
    style: string;
    confidence: number;
    suggestedSize: string;
    similarShapes: string[];
    recommendationText: string;
};

export default function AnalyzeCurrentResultsPage() {
    const router = useRouter();
    const [results, setResults] = useState<AnalysisResults | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedResults = sessionStorage.getItem('analysisResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        } else {
            // Redirect if no results are found
            router.push('/analyze-current');
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
        // This can happen if the user navigates directly to this page
        // or if session storage is cleared.
        return (
             <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
                <p>No analysis results found. Please start a new analysis.</p>
                <Link href="/analyze-current" passHref>
                    <Button className="mt-4">Start Over</Button>
                </Link>
            </div>
        )
    }

    const { style, confidence, suggestedSize, similarShapes, recommendationText } = results;

    const confidencePercentage = (confidence * 100).toFixed(0);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href="/analyze-current/upload" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Upload
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline flex items-center gap-3">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            Analysis Complete
                        </CardTitle>
                        <CardDescription>Here's the breakdown of your current glasses' fit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-4">
                                <h3 className="font-semibold text-lg mb-2">Frame Style</h3>
                                <p className="text-2xl font-bold text-primary capitalize">{style}</p>
                                <p className="text-sm text-muted-foreground">Confidence: {confidencePercentage}%</p>
                            </Card>
                            <Card className="p-4">
                                <h3 className="font-semibold text-lg mb-2">Suggested Size</h3>
                                <p className="text-2xl font-bold text-primary">{suggestedSize}</p>
                                <p className="text-sm text-muted-foreground">General fit category</p>
                            </Card>
                        </div>

                         <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Detailed Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{recommendationText}</p>
                                <div className="flex flex-wrap gap-2">
                                    <h4 className="font-semibold w-full">You might also like:</h4>
                                    {similarShapes.map((shape) => (
                                        <Badge key={shape} variant="secondary" className="capitalize">{shape}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                        <Link href="/analyze-current/upload" passHref>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Start New Analysis
                            </Button>
                        </Link>
                         <div className="flex gap-2 w-full sm:w-auto">
                            <Button className="w-full" variant="outline">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                            <Button className="w-full">
                                <Download className="mr-2 h-4 w-4" />
                                Download Report
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
