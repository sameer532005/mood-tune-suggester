
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { songDatabase } from "@/data/songDatabase";
import FaceDetector from "@/components/FaceDetector";
import MusicRecommendations from "@/components/MusicRecommendations";
import { Music, Camera, Github } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentEmotion, setCurrentEmotion] = useState<string>("neutral");
  const [activeTab, setActiveTab] = useState<string>("camera");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Handle emotion detection
  const handleEmotionDetected = (emotion: string) => {
    // Only update if emotion is different to avoid unnecessary re-renders
    if (emotion !== currentEmotion) {
      setIsLoading(true);
      
      // Add slight delay to simulate song recommendation processing
      setTimeout(() => {
        setCurrentEmotion(emotion);
        setIsLoading(false);
        toast({
          title: "Mood detected!",
          description: `We detected you're feeling ${emotion}. Here are some songs for you!`,
          duration: 3000,
        });
      }, 800);
    }
  };

  // Get appropriate songs based on the current emotion
  const recommendedSongs = songDatabase[currentEmotion] || [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="bg-secondary py-4 px-6 sm:px-8 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <Music className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">MoodTunes</h1>
        </div>
        
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm opacity-80 hover:opacity-100 transition-opacity"
        >
          <Github className="h-4 w-4" />
          <span>Source</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-6xl px-4 py-6 md:py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emotion-happy via-emotion-surprised to-primary animate-pulse-light">
            Music Recommendations based on Your Mood
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI detects your facial expressions in real-time and recommends the perfect music for your current mood.
            For sad or angry moods, we'll suggest uplifting songs to help improve your mood!
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="block md:hidden mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="camera" className="flex items-center gap-1">
                <Camera className="h-4 w-4" />
                <span>Camera</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                <span>Music</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="camera" className="mt-4">
              <FaceDetector onEmotionDetected={handleEmotionDetected} />
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-4">
              <MusicRecommendations 
                emotion={currentEmotion} 
                songs={recommendedSongs} 
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FaceDetector onEmotionDetected={handleEmotionDetected} />
          </div>
          <div>
            <MusicRecommendations 
              emotion={currentEmotion} 
              songs={recommendedSongs} 
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-secondary/50 rounded-lg p-4 border border-border">
          <h3 className="font-medium mb-2">How it works:</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Allow camera access when prompted</li>
            <li>The app will detect your facial expression in real-time</li>
            <li>We'll recommend music based on your detected mood</li>
            <li>For sad or angry moods, we'll suggest uplifting songs</li>
            <li>Click on any song to listen to it on YouTube</li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MoodTunes - Music for Every Emotion</p>
      </footer>
    </div>
  );
};

export default Index;
