
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FaceDetectorProps {
  onEmotionDetected: (emotion: string) => void;
}

const FaceDetector: React.FC<FaceDetectorProps> = ({ onEmotionDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectionError, setDetectionError] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string>("neutral");

  // Load models and start video
  useEffect(() => {
    const loadModelsAndStartVideo = async () => {
      try {
        setIsLoading(true);
        
        // Load face detection models
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Start video stream
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          throw new Error("Camera access not supported by your browser");
        }
      } catch (error) {
        console.error("Error initializing face detection:", error);
        setDetectionError("Failed to initialize camera or face detection models");
      } finally {
        setIsLoading(false);
      }
    };

    loadModelsAndStartVideo();

    // Clean up on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Set up face detection once video is playing
  const handleVideoPlay = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    const detectFace = async () => {
      if (!video || !canvas) return;
      
      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
          
        if (detections && detections.length > 0) {
          const expressions = detections[0].expressions;
          const maxExpression = Object.entries(expressions).reduce(
            (prev, current) => (current[1] > prev[1] ? current : prev)
          );
          
          const emotion = maxExpression[0];
          // Only update if emotion changed to avoid too many rerenders
          if (emotion !== currentEmotion) {
            setCurrentEmotion(emotion);
            onEmotionDetected(emotion);
          }
          
          // Draw results on canvas
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      } catch (err) {
        console.error("Error during face detection:", err);
      }
      
      // Continue detection
      requestAnimationFrame(detectFace);
    };
    
    // Start detection
    detectFace();
  };

  const emotionColor = {
    happy: "bg-emotion-happy",
    sad: "bg-emotion-sad",
    angry: "bg-emotion-angry",
    neutral: "bg-emotion-neutral",
    surprised: "bg-emotion-surprised",
    fearful: "bg-emotion-sad",
    disgusted: "bg-emotion-angry",
  };

  return (
    <Card className="w-full overflow-hidden bg-secondary rounded-xl border-2 border-primary">
      <CardContent className="p-0 relative">
        {isLoading && (
          <div className="p-4">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-white animate-pulse">Loading face detection...</p>
            </div>
          </div>
        )}
        
        {detectionError && (
          <div className="p-6 text-center">
            <p className="text-destructive">{detectionError}</p>
            <p className="mt-2">Please make sure you've enabled camera permissions</p>
          </div>
        )}
        
        <div className={`relative ${isLoading ? 'hidden' : 'block'}`}>
          <video 
            ref={videoRef}
            width="100%" 
            height="auto"
            autoPlay 
            muted 
            playsInline
            onPlay={handleVideoPlay}
            className="rounded-t-lg"
          />
          <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full"
          />
          
          <div className={`absolute bottom-0 left-0 right-0 py-2 px-4 flex items-center justify-center gap-2
            ${emotionColor[currentEmotion as keyof typeof emotionColor] || 'bg-secondary'} bg-opacity-90 backdrop-blur-sm
          `}>
            <span className="text-white font-medium">Current Emotion:</span>
            <span className="font-bold text-black capitalize">{currentEmotion}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaceDetector;
