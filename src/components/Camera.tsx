"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera as CameraIcon, VideoOff, Sun, Moon, SwitchCamera } from 'lucide-react';

type FacingMode = 'user' | 'environment';

interface CameraProps {
    isOpen: boolean;
    onClose: () => void;
    onCapture: (dataUri: string) => void;
    initialFacingMode?: FacingMode;
}

// Constants for lighting analysis
const GOOD_LIGHT_THRESHOLD = 120; // Average brightness for "good" light
const DARK_LIGHT_THRESHOLD = 70; // Below this is "too dark"
const BRIGHT_LIGHT_THRESHOLD = 180; // Above this is "too bright"
const ANALYSIS_INTERVAL = 1000; // ms

export default function Camera({ isOpen, onClose, onCapture, initialFacingMode = 'user' }: CameraProps) {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [feedback, setFeedback] = useState<{ message: string; icon: React.ReactNode } | null>(null);
    const intervalRef = useRef<NodeJS.Timeout>();
    const [facingMode, setFacingMode] = useState<FacingMode>(initialFacingMode);
    const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

    useEffect(() => {
        const checkCameras = async () => {
            if (navigator.mediaDevices?.enumerateDevices) {
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    const videoInputs = devices.filter(device => device.kind === 'videoinput');
                    setHasMultipleCameras(videoInputs.length > 1);
                } catch(e) {
                    console.error("Could not enumerate devices", e)
                }
            }
        };
        checkCameras();
    }, []);
    
    // Reset facing mode when component re-opens with a new initial mode
    useEffect(() => {
        if(isOpen) {
            setFacingMode(initialFacingMode)
        }
    }, [isOpen, initialFacingMode])


    const stopAnalysis = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
        setFeedback(null);
    }, []);

    const startAnalysis = useCallback(() => {
        stopAnalysis(); // Ensure no multiple intervals are running

        intervalRef.current = setInterval(() => {
            if (!videoRef.current || !canvasRef.current || videoRef.current.paused || videoRef.current.ended) {
                return;
            }

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d', { willReadFrequently: true });
            if (!context) return;
            
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            
            if (canvas.width === 0 || canvas.height === 0) return;

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let totalBrightness = 0;

            for (let i = 0; i < data.length; i += 4 * 10) { 
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                totalBrightness += brightness;
            }

            const avgBrightness = totalBrightness / (data.length / 40);

            if (avgBrightness < DARK_LIGHT_THRESHOLD) {
                setFeedback({ message: 'Lighting is too dark', icon: <Moon className="w-5 h-5 mr-2" /> });
            } else if (avgBrightness > BRIGHT_LIGHT_THRESHOLD) {
                setFeedback({ message: 'Lighting is too bright', icon: <Sun className="w-5 h-5 mr-2" /> });
            } else {
                 setFeedback({ message: 'Looking good!', icon: null });
            }

        }, ANALYSIS_INTERVAL);
    }, [stopAnalysis]);

    const cleanupStream = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    const getCameraPermission = useCallback(async (mode: FacingMode) => {
        cleanupStream();
        try {
            const cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
            setStream(cameraStream);
            setHasCameraPermission(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings.',
            });
            onClose();
        }
    }, [cleanupStream, toast, onClose]);

    const handleSwitchCamera = () => {
        const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newFacingMode);
        getCameraPermission(newFacingMode);
    };

    useEffect(() => {
        if (isOpen) {
            getCameraPermission(facingMode);
        } else {
            cleanupStream();
            stopAnalysis();
        }
        
        return () => {
             cleanupStream();
             stopAnalysis();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);


    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                startAnalysis();
            };
        }
    }, [stream, startAnalysis]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUri = canvas.toDataURL('image/jpeg');
                onCapture(dataUri);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Live Camera</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                    <canvas ref={canvasRef} className="hidden" />

                    {feedback?.message && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center shadow-lg">
                           {feedback.icon}
                           {feedback.message}
                        </div>
                    )}
                    
                    {hasCameraPermission === false && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-md">
                            <VideoOff className="w-16 h-16 text-destructive mb-4" />
                            <p className="text-destructive-foreground font-semibold">Camera access denied.</p>
                         </div>
                    )}
                </div>
                <DialogFooter className="sm:justify-between">
                     {hasMultipleCameras ? (
                        <Button variant="outline" onClick={handleSwitchCamera} disabled={!hasCameraPermission}>
                            <SwitchCamera className="mr-2 h-4 w-4" />
                            Switch Camera
                        </Button>
                    ) : <div />}
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                            <CameraIcon className="mr-2 h-4 w-4" />
                            Take Photo
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
