"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera as CameraIcon, Video, VideoOff } from 'lucide-react';

interface CameraProps {
    isOpen: boolean;
    onClose: () => void;
    onCapture: (dataUri: string) => void;
}

export default function Camera({ isOpen, onClose, onCapture }: CameraProps) {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const getCameraPermission = useCallback(async () => {
        if (stream) return;
        try {
            const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    }, [stream, toast, onClose]);

    useEffect(() => {
        if (isOpen) {
            getCameraPermission();
        } else {
            // Stop camera stream when dialog is closed
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }
        
        return () => {
             if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [isOpen, getCameraPermission, stream]);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

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
                    {hasCameraPermission === false && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-md">
                            <VideoOff className="w-16 h-16 text-destructive mb-4" />
                            <p className="text-destructive-foreground font-semibold">Camera access denied.</p>
                         </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                        <CameraIcon className="mr-2 h-4 w-4" />
                        Take Photo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
