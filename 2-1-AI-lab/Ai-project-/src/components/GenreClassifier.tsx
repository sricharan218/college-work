import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Loader2, Music2 } from "lucide-react";
import { Button } from "./ui/button";

interface GenreResult {
  genre: string;
  confidence: number;
}

interface GenreClassifierProps {
  audioFile: File | null;
  features: any;
}

const GENRES = [
  "Rock",
  "Pop",
  "Jazz",
  "Classical",
  "Electronic",
  "Hip Hop",
  "Country",
  "R&B",
];

const GenreClassifier = ({ audioFile, features }: GenreClassifierProps) => {
  const [classifying, setClassifying] = useState(false);
  const [results, setResults] = useState<GenreResult[]>([]);

  useEffect(() => {
    if (features && audioFile) {
      classifyGenre();
    }
  }, [features, audioFile]);

  const classifyGenre = async () => {
    setClassifying(true);
    
    // Simulate model inference
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate simulated results
    const simulatedResults: GenreResult[] = GENRES.map(genre => ({
      genre,
      confidence: Math.random() * 100,
    }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);

    setResults(simulatedResults);
    setClassifying(false);
  };

  if (!audioFile || !features) return null;

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {classifying && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
        Genre Classification Results
      </h3>

      {classifying ? (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Running AI model inference...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-primary rounded-xl text-center shadow-glow">
            <Music2 className="w-12 h-12 mx-auto mb-3 text-primary-foreground" />
            <div className="text-sm text-primary-foreground/80 mb-1">Predicted Genre</div>
            <div className="text-4xl font-bold text-primary-foreground mb-2">
              {results[0].genre}
            </div>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
              {results[0].confidence.toFixed(1)}% Confidence
            </Badge>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Other Predictions
            </h4>
            {results.slice(1).map((result, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{result.genre}</span>
                  <span className="text-sm text-muted-foreground">
                    {result.confidence.toFixed(1)}%
                  </span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>
            ))}
          </div>

          <Button
            onClick={classifyGenre}
            className="w-full bg-gradient-secondary hover:opacity-90"
          >
            Re-classify
          </Button>
        </div>
      ) : null}
    </Card>
  );
};

export default GenreClassifier;
