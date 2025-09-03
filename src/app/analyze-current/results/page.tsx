"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, RefreshCw, Share2, Download, AlertTriangle, XCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Chatbot from '@/components/Chatbot';

type FitCheck = {
    verdict: 'good' | 'warning' | 'bad';
    observation: string;
};

type AnalysisResults = {
    fitVerdict: string;
    frameWidth: FitCheck;
    bridgePosition: FitCheck;
    templeLength: FitCheck;
    analysisSummary: string;
};

const FitAspectCard = ({ aspect, title, result }: { aspect: string, title: string, result: FitCheck }) => {
    const getIcon = () => {
        switch (result.verdict) {
            case 'good':
                return <ThumbsUp className="w-6 h-6 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
            case 'bad':
                return <XCircle className="w-6 h-6 text-red-500" />;
            default:
                return null;
        }
    };
    
    const getBorderColor = () => {
        switch (result.verdict) {
            case 'good': return 'border-green-500/50';
            case 'warning': return 'border-yellow-500/50';
            case 'bad': return 'border-red-500/50';
            default: return 'border-border';
        }
    }

    return (
        <Card className={`p-4 flex items-start gap-4 ${getBorderColor()}`}>
            <div className="shrink-0 mt-1">{getIcon()}</div>
            <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{result.observation}</p>
            </div>
        </Card>
    );
};


export default function AnalyzeCurrentResultsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [results, setResults] = useState<AnalysisResults | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reportText, setReportText] = useState("");
    const resultsRef = useRef<HTMLDivElement>(null);

    const generateReportText = (res: AnalysisResults) => {
        if (!res) return "";
        return `
FrameSense Fit Analysis Report
==============================

Overall Verdict: ${res.fitVerdict}

Detailed Breakdown:
- Frame Width: [${res.frameWidth.verdict.toUpperCase()}] ${res.frameWidth.observation}
- Bridge Position: [${res.bridgePosition.verdict.toUpperCase()}] ${res.bridgePosition.observation}
- Temple Length: [${res.templeLength.verdict.toUpperCase()}] ${res.templeLength.observation}

Pro's Analysis:
${res.analysisSummary}
        `.trim();
    }

    useEffect(() => {
        const storedResults = sessionStorage.getItem('analysisResults');
        if (storedResults) {
            try {
                const parsedResults = JSON.parse(storedResults);
                // Basic validation to ensure it has the expected structure
                if (parsedResults.fitVerdict && parsedResults.frameWidth) {
                     setResults(parsedResults);
                     setReportText(generateReportText(parsedResults));
                } else {
                    throw new Error("Invalid results format");
                }
            } catch (e) {
                console.error("Failed to parse analysis results:", e);
                toast({ variant: "destructive", title: "Invalid Results", description: "Could not load analysis results. Please try again."})
                router.push('/analyze-current');
            }
           
        } else {
            router.push('/analyze-current');
        }
        setIsLoading(false);
    }, [router, toast]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My FrameSense Fit Analysis',
                    text: reportText,
                });
            } catch (error) {
                console.error('Error sharing:', error);
                toast({ title: "Sharing failed", description: "Could not share the report."});
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(reportText).then(() => {
                toast({ title: "Copied to Clipboard", description: "Analysis results copied to your clipboard." });
            }).catch(err => {
                toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy results to clipboard." });
            });
        }
    };

    const handleDownload = () => {
        const blob = new Blob([reportText], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'FrameSense-Fit-Report.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

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
                <Link href="/analyze-current" passHref>
                    <Button className="mt-4">Start Over</Button>
                </Link>
            </div>
        )
    }
    
    const { fitVerdict, frameWidth, bridgePosition, templeLength, analysisSummary } = results;

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
                <div className="w-full max-w-3xl space-y-8">
                    <Card ref={resultsRef}>
                        <CardHeader>
                            <CardTitle className="text-3xl font-headline flex items-center gap-3">
                                <CheckCircle className="w-8 h-8 text-primary" />
                                Fit Analysis Complete
                            </CardTitle>
                            <CardDescription>Here's the professional breakdown of your current glasses' fit.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Card className="bg-secondary p-6">
                                <h3 className="text-lg font-semibold text-center text-secondary-foreground mb-1">Overall Fit Verdict</h3>
                                <p className="text-3xl font-bold text-primary text-center">{fitVerdict}</p>
                            </Card>
                            
                            <div className="grid md:grid-cols-1 gap-4">
                               <FitAspectCard aspect="frameWidth" title="Frame Width" result={frameWidth} />
                               <FitAspectCard aspect="bridgePosition" title="Bridge Position" result={bridgePosition} />
                               <FitAspectCard aspect="templeLength" title="Temple Length" result={templeLength} />
                            </div>
                            
                             <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Pro's Analysis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{analysisSummary}</p>
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
                                <Button className="w-full" variant="outline" onClick={handleShare}>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                                <Button className="w-full" onClick={handleDownload}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                    
                    <Chatbot report={reportText} />

                </div>
            </main>
        </div>
    );
}
