"use client";

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, UploadCloud, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { classifyFrameStyle } from '@/ai/flows/classify-frame-style';
import { generateSizeRecommendations } from '@/ai/flows/generate-size-recommendations';

type FileState = {
  file: File | null;
  preview: string | null;
};

// Helper function to convert a file to a Base64 Data URI
const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


export default function AnalyzeCurrentUploadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [frontSelfie, setFrontSelfie] = useState<FileState>({ file: null, preview: null });
  const [sideSelfie, setSideSelfie] = useState<FileState>({ file: null, preview: null });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<FileState>>) => {
    const file = e.target.files?.[0];
    if (file) {
      setter({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveImage = (setter: React.Dispatch<React.SetStateAction<FileState>>, inputId: string) => {
    setter({ file: null, preview: null });
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) input.value = "";
  };
  
  const handleAnalyze = async () => {
    if (!frontSelfie.file || !sideSelfie.file) {
        toast({
            variant: "destructive",
            title: "Missing Images",
            description: "Please upload both front and side selfies.",
        });
        return;
    }

    setIsLoading(true);

    try {
        // We'll use the front selfie to classify the frame style.
        const framePhotoDataUri = await fileToDataUri(frontSelfie.file);

        // For this demo, we'll use a placeholder for measurements to generate recommendations
        // In a real application, you would extract these from the images.
        const placeholderMeasurements = {
            lensWidth: 50,
            bridgeWidth: 18,
            templeLength: 145,
        };

        const [styleResult, recommendationsResult] = await Promise.all([
            classifyFrameStyle({ framePhotoDataUri }),
            generateSizeRecommendations(placeholderMeasurements),
        ]);

        const results = {
            ...styleResult,
            ...recommendationsResult
        }

        // Store results in session storage to pass to the results page
        sessionStorage.setItem('analysisResults', JSON.stringify(results));
        router.push('/analyze-current/results');

    } catch (error) {
        console.error("Analysis failed:", error);
        toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "Something went wrong. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };


  const isAnalyzable = frontSelfie.file && sideSelfie.file;

  const renderUploadBox = (
    id: string,
    label: string,
    fileState: FileState,
    setter: React.Dispatch<React.SetStateAction<FileState>>
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center justify-center w-full">
        {fileState.preview ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border">
            <Image src={fileState.preview} alt="Selfie preview" fill style={{ objectFit: 'contain' }} />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 rounded-full"
              onClick={() => handleRemoveImage(setter, id)}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label htmlFor={id} className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg  bg-card ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-secondary'} transition-colors`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-center text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
            </div>
            <Input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e, setter)} disabled={isLoading} />
          </label>
        )}
      </div>
    </div>
  );

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
            {renderUploadBox("front-selfie-upload", "1. Front-facing Selfie", frontSelfie, setFrontSelfie)}
            {renderUploadBox("side-selfie-upload", "2. Side-profile Selfie", sideSelfie, setSideSelfie)}
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" disabled={!isAnalyzable || isLoading} onClick={handleAnalyze}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Analyzing...' : 'Analyze My Fit'}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
