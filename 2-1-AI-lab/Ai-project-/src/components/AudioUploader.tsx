import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

const AudioUploader = ({ onFileSelect }: AudioUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      toast.error("Please upload an audio file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
          isDragging
            ? "border-primary bg-primary/10 scale-105"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="audio-upload"
        />
        
        {!selectedFile ? (
          <div className="text-center">
            <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Upload Audio File</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop your music file here, or click to browse
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-primary hover:opacity-90"
            >
              Choose File
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Supports MP3, WAV, OGG, and other audio formats
            </p>
          </div>
        ) : (
          <div className="text-center">
            <File className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{selectedFile.name}</h3>
            <p className="text-muted-foreground mb-4">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              variant="outline"
              onClick={handleRemoveFile}
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4 mr-2" />
              Remove File
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AudioUploader;
