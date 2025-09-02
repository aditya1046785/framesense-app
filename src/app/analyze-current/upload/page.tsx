import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AnalyzeCurrentUploadPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href="/analyze-current" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                        Back
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Upload Your Selfies</CardTitle>
                        <CardDescription>Provide two photos of you wearing your glasses.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="front-selfie-upload">1. Front-facing Selfie</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="front-selfie-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <Input id="front-selfie-upload" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="side-selfie-upload">2. Side-profile Selfie</Label>
                             <div className="flex items-center justify-center w-full">
                                <label htmlFor="side-selfie-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <Input id="side-selfie-upload" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button size="lg" className="w-full">
                            Analyze My Fit
                         </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}
