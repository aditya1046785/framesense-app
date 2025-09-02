import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Glasses, ScanFace } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-foreground tracking-tight">FrameSense</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">Find your best fit, instantly.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:border-primary transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Glasses className="w-8 h-8 text-primary" />
                  <span className="text-2xl">Check a Specific Frame</span>
                </CardTitle>
                <CardDescription>
                  Upload photos of an empty frame to see if it fits you. Use a reference object for best results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/check-frame" passHref>
                  <Button className="w-full" size="lg">Start Analysis</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:border-primary transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ScanFace className="w-8 h-8 text-primary" />
                  <span className="text-2xl">Analyze My Current Glasses</span>
                </CardTitle>
                <CardDescription>
                  Take a selfie wearing your glasses to check their fit and get size recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/analyze-current" passHref>
                  <Button className="w-full" size="lg">Analyze My Fit</Button>
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
