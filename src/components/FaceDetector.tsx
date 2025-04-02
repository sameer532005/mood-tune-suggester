
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CameraOff } from 'lucide-react';

interface FaceDetectorProps {
  onEmotionDetected: (emotion: string) => void;
}

const FaceDetector: React.FC<FaceDetectorProps> = ({ onEmotionDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectionError, setDetectionError] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string>("neutral");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [emotionBuffer, setEmotionBuffer] = useState<Array<string>>([]);
  const [lastEmotionUpdate, setLastEmotionUpdate] = useState(0);

  // Load models and start video
  useEffect(() => {
    const loadModelsAndStartVideo = async () => {
      try {
        setIsLoading(true);
        
        // Load face detection models directly from the CDN instead of local files
        const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          // Add face landmark model for better accuracy
          faceapi.nets.faceLandmarkNet.loadFromUri(MODEL_URL)
        ]);
        
        setModelsLoaded(true);
        console.log("Models loaded successfully");
        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Request higher resolution for better accuracy
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
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

  // Helper function to get most common emotion from buffer
  const getMostCommonEmotion = (emotionArray: string[]): string => {
    if (emotionArray.length === 0) return "neutral";
    
    const counts: Record<string, number> = {};
    emotionArray.forEach(emotion => {
      counts[emotion] = (counts[emotion] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostCommonEmotion = "neutral";
    
    for (const emotion in counts) {
      if (counts[emotion] > maxCount) {
        maxCount = counts[emotion];
        mostCommonEmotion = emotion;
      }
    }
    
    return mostCommonEmotion;
  };

  // Set up face detection once video is playing
  const handleVideoPlay = () => {
    if (!canvasRef.current || !videoRef.current || !modelsLoaded) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    const detectFace = async () => {
      if (!video || !canvas) return;
      
      try {
        // Add minConfidence for better accuracy and include landmarks
        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 });
        
        const detections = await faceapi
          .detectAllFaces(video, options)
          .withFaceLandmarks()
          .withFaceExpressions();
          
        if (detections && detections.length > 0) {
          const expressions = detections[0].expressions;
          const maxExpression = Object.entries(expressions).reduce(
            (prev, current) => (current[1] > prev[1] ? current : prev)
          );
          
          const emotion = maxExpression[0];
          const confidence = maxExpression[1];
          
          // Only consider emotions with sufficient confidence
          if (confidence > 0.6) {
            // Add to buffer for smoothing
            const newBuffer = [...emotionBuffer, emotion];
            if (newBuffer.length > 10) {
              newBuffer.shift(); // Keep buffer size at 10
            }
            setEmotionBuffer(newBuffer);
            
            // Check if it's time to update the emotion (every 2 seconds)
            const now = Date.now();
            if (now - lastEmotionUpdate > 2000) {
              const stableEmotion = getMostCommonEmotion(newBuffer);
              
              // Only update if emotion changed to avoid too many rerenders
              if (stableEmotion !== currentEmotion) {
                console.log("Stable emotion detected:", stableEmotion, "with confidence:", confidence);
                setCurrentEmotion(stableEmotion);
                onEmotionDetected(stableEmotion);
                setLastEmotionUpdate(now);
              }
            }
          }
          
          // Draw results on canvas
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections, 0.6);
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
            <CameraOff className="h-12 w-12 mx-auto mb-4 text-destructive" />
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
