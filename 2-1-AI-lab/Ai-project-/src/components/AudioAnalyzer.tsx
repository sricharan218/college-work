import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Loader2 } from "lucide-react";

interface AudioFeatures {
  tempo: number;
  spectralCentroid: number;
  zeroCrossingRate: number;
  mfcc: number[];
}

interface AudioAnalyzerProps {
  audioFile: File | null;
  onFeaturesExtracted: (features: AudioFeatures) => void;
}

const AudioAnalyzer = ({ audioFile, onFeaturesExtracted }: AudioAnalyzerProps) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [features, setFeatures] = useState<AudioFeatures | null>(null);

  useEffect(() => {
    if (audioFile) {
      analyzeAudio();
    }
  }, [audioFile]);

  const analyzeAudio = async () => {
    setAnalyzing(true);
    setProgress(0);

    // Simulate feature extraction process
    const stages = [
      { name: "Loading audio...", duration: 500 },
      { name: "Extracting MFCC features...", duration: 800 },
      { name: "Calculating spectral features...", duration: 600 },
      { name: "Analyzing tempo...", duration: 700 },
    ];

    for (let i = 0; i < stages.length; i++) {
      setProgress((i / stages.length) * 100);
      await new Promise(resolve => setTimeout(resolve, stages[i].duration));
    }

    // Simulated features (in a real app, these would come from actual audio analysis)
    const extractedFeatures: AudioFeatures = {
      tempo: Math.floor(Math.random() * 60) + 100,
      spectralCentroid: Math.random() * 2000 + 1000,
      zeroCrossingRate: Math.random() * 0.1,
      mfcc: Array.from({ length: 13 }, () => Math.random() * 100 - 50),
    };

    setFeatures(extractedFeatures);
    setProgress(100);
    setAnalyzing(false);
    onFeaturesExtracted(extractedFeatures);
  };

  if (!audioFile) return null;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {analyzing && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
        Audio Feature Extraction
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Analysis Progress</span>
            <span className="text-primary font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {features && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Tempo (BPM)</div>
              <div className="text-2xl font-bold text-primary">{features.tempo}</div>
            </div>
            
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Spectral Centroid</div>
              <div className="text-2xl font-bold text-secondary">
                {features.spectralCentroid.toFixed(0)} Hz
              </div>
            </div>
            
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Zero Crossing Rate</div>
              <div className="text-2xl font-bold text-accent">
                {features.zeroCrossingRate.toFixed(4)}
              </div>
            </div>
            
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">MFCC Coefficients</div>
              <div className="text-2xl font-bold text-foreground">13 features</div>
            </div>
          </div>
        )}

        {features && (
          <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">MFCC Visualization</div>
            <div className="flex items-end gap-1 h-20">
              {features.mfcc.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-primary rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${((value + 50) / 100) * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AudioAnalyzer;
