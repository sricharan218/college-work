import { Music, Brain, Activity } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8">
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border shadow-glow">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border shadow-glow">
            <Brain className="w-8 h-8 text-secondary" />
          </div>
          <div className="p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border shadow-glow">
            <Activity className="w-8 h-8 text-accent" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          AI Music Genre Classifier
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Analyze and classify music genres using advanced machine learning. 
          Upload your audio files and let AI identify the genre with precision.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-4xl font-bold text-primary mb-2">1</div>
            <h3 className="text-lg font-semibold mb-2">Feature Extraction</h3>
            <p className="text-sm text-muted-foreground">Extract audio features using Librosa-style analysis</p>
          </div>
          
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-4xl font-bold text-secondary mb-2">2</div>
            <h3 className="text-lg font-semibold mb-2">AI Classification</h3>
            <p className="text-sm text-muted-foreground">Deep learning model trained on thousands of tracks</p>
          </div>
          
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-4xl font-bold text-accent mb-2">3</div>
            <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
            <p className="text-sm text-muted-foreground">Real-time accuracy and confidence scores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
