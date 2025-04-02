
import React from 'react';
import { Music, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Song {
  title: string;
  artist: string;
  youtubeLink: string;
}

interface MusicRecommendationsProps {
  emotion: string;
  songs: Song[];
  isLoading: boolean;
}

const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ emotion, songs, isLoading }) => {
  const emotionTitles = {
    happy: "Feel-Good Tunes",
    sad: "Uplifting Melodies",
    angry: "Calming Vibes",
    neutral: "Balanced Beats",
    surprised: "Exciting Tracks",
    fearful: "Comforting Sounds",
    disgusted: "Pleasant Melodies"
  };

  const emotionDescriptions = {
    happy: "Embrace your good mood with these joyful tracks!",
    sad: "Let's turn that frown upside down with these uplifting songs!",
    angry: "Cool down with these calming melodies...",
    neutral: "Maintain your balanced mood with these perfect tracks",
    surprised: "Exciting music to match your surprised expression!",
    fearful: "Relax and feel safe with these comforting tunes",
    disgusted: "Change your mood with these pleasant melodies"
  };

  const emotionColors = {
    happy: "border-emotion-happy",
    sad: "border-emotion-sad",
    angry: "border-emotion-angry",
    neutral: "border-emotion-neutral",
    surprised: "border-emotion-surprised",
    fearful: "border-emotion-sad",
    disgusted: "border-emotion-angry",
  };

  return (
    <Card className={`w-full h-full overflow-hidden bg-secondary border-2 ${emotionColors[emotion as keyof typeof emotionColors] || 'border-primary'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Music className="h-5 w-5" />
          {emotionTitles[emotion as keyof typeof emotionTitles] || "Music Recommendations"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {emotionDescriptions[emotion as keyof typeof emotionDescriptions] || "Personalized music based on your mood"}
        </p>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Finding the perfect songs for your mood...</p>
          </div>
        ) : songs.length > 0 ? (
          <ul className="space-y-3">
            {songs.map((song, index) => (
              <li key={index} className="recommendation-card">
                <a 
                  href={song.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="youtube-link block p-3 rounded-lg bg-muted hover:bg-accent"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p>No songs found for this mood</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicRecommendations;
