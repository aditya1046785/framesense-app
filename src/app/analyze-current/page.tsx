import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export default function AnalyzeCurrentPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Home
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Analyze Your Current Glasses</CardTitle>
                        <CardDescription>Let's analyze the fit of the glasses you're wearing now.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 border rounded-lg bg-card">
                            <h3 className="font-semibold mb-2 text-foreground">Here's what you'll need:</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Two selfies wearing your glasses</strong> (one from the front, one from the side).</li>
                                <li>Good lighting and a clear view of your face.</li>
                                <li>A <strong>reference object</strong> is optional but improves accuracy.</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-primary/30 rounded-lg bg-primary/10 text-primary-foreground/80">
                           <div className="flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 mt-1 text-primary shrink-0"/>
                                <div>
                                    <h3 className="font-semibold text-primary-foreground/90">Privacy First</h3>
                                    <p className="text-sm">Your images are processed to extract measurements and then deleted immediately. We never store your photos or face data.</p>
                                </div>
                           </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                         <Button variant="outline">Learn More</Button>
                         <Link href="/analyze-current/upload" passHref>
                            <Button size="lg">
                                Continue
                            </Button>
                         </Link>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}
