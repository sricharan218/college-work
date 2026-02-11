import { useState } from "react";
import Hero from "@/components/Hero";
import AudioUploader from "@/components/AudioUploader";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import GenreClassifier from "@/components/GenreClassifier";
import ModelMetrics from "@/components/ModelMetrics";

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [features, setFeatures] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="space-y-8">
          <AudioUploader onFileSelect={setAudioFile} />
          
          {audioFile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <AudioAnalyzer 
                  audioFile={audioFile} 
                  onFeaturesExtracted={setFeatures}
                />
                <GenreClassifier 
                  audioFile={audioFile}
                  features={features}
                />
              </div>
              
              <div>
                <ModelMetrics />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
