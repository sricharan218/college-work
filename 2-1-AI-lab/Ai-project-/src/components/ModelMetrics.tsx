import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { TrendingUp, Target, Zap } from "lucide-react";

const ModelMetrics = () => {
  const metrics = {
    accuracy: 94.2,
    precision: 92.8,
    recall: 93.5,
    f1Score: 93.1,
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-semibold mb-6">Model Performance Metrics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="font-medium">Accuracy</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-3xl font-bold text-primary">{metrics.accuracy}%</span>
          </div>
          <Progress value={metrics.accuracy} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Overall classification accuracy across all genres
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="font-medium">Precision</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-3xl font-bold text-secondary">{metrics.precision}%</span>
          </div>
          <Progress value={metrics.precision} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Percentage of correct positive predictions
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="font-medium">Recall</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-3xl font-bold text-accent">{metrics.recall}%</span>
          </div>
          <Progress value={metrics.recall} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Percentage of actual positives correctly identified
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gradient-primary rounded" />
            <span className="font-medium">F1 Score</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-3xl font-bold">{metrics.f1Score}%</span>
          </div>
          <Progress value={metrics.f1Score} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Harmonic mean of precision and recall
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
        <h4 className="text-sm font-semibold mb-3">Training Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Model Architecture</span>
            <p className="font-medium">Deep CNN</p>
          </div>
          <div>
            <span className="text-muted-foreground">Framework</span>
            <p className="font-medium">TensorFlow</p>
          </div>
          <div>
            <span className="text-muted-foreground">Training Samples</span>
            <p className="font-medium">10,000+</p>
          </div>
          <div>
            <span className="text-muted-foreground">Epochs</span>
            <p className="font-medium">50</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelMetrics;
