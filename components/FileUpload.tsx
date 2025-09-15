import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing?: boolean;
}

export const FileUpload = ({ onFileUpload, isAnalyzing }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type === "application/pdf" || file.type.startsWith("image/")) {
          setUploadedFile(file);
          onFileUpload(file);
        }
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setUploadedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  return (
    <Card
      className={cn(
        "relative border-2 border-dashed border-border bg-card transition-all duration-300 ease-smooth",
        "hover:border-primary/50 hover:bg-accent/50",
        dragActive && "border-primary bg-accent scale-105",
        isAnalyzing && "pointer-events-none opacity-75"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        {uploadedFile ? (
          <div className="flex flex-col items-center space-y-4">
            {isAnalyzing ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
                <p className="text-sm text-muted-foreground">Analyzing your CV...</p>
              </div>
            ) : (
              <>
                <CheckCircle className="h-12 w-12 text-success" />
                <div>
                  <p className="font-medium text-card-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Ready for analysis
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-primary mb-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-card-foreground">
                Upload your CV or Portfolio
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports PDF and image files
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                PDF, JPG, PNG up to 10MB
              </span>
            </div>
          </>
        )}

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isAnalyzing}
        />

        {!uploadedFile && (
          <Button variant="outline" className="mt-4 pointer-events-none">
            Choose File
          </Button>
        )}
      </div>
    </Card>
  );
};