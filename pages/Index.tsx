import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Target, Briefcase, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import { extractTextFromPdf } from "@/utils/pdf";
import { analyzeCv } from "@/utils/ai";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<'hero' | 'upload' | 'results'>('hero');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // If user is on /upload route and authenticated, show upload step
    if (location.pathname === '/upload' && user) {
      setCurrentStep('upload');
    } else if (location.pathname === '/') {
      setCurrentStep('hero');
    }
  }, [location.pathname, user]);

  const handleGetStarted = () => {
    setCurrentStep('upload');
  };

  const handleFileUpload = async (file: File) => {
    try {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'PDFs only for now',
          description: 'Image OCR coming soon. Please upload a PDF CV.',
        });
        return;
      }

      setIsAnalyzing(true);
      const text = await extractTextFromPdf(file);
      const analysis = await analyzeCv({ cvText: text });

      const iconMap: Record<string, any> = {
        'Professional Summary': FileText,
        'Summary': FileText,
        'Work Experience': Briefcase,
        'Experience': Briefcase,
        'Skills & Competencies': Target,
        'Skills': Target,
        'Education': GraduationCap,
      };

      const mapped = analysis.sections.map((s) => ({
        ...s,
        icon: iconMap[s.title] ?? FileText,
      }));

      setAnalysisResults({ overallScore: analysis.overallScore, sections: mapped });
      setCurrentStep('results');
    } catch (err) {
      console.error(err);
      toast({ title: 'Analysis failed', description: err instanceof Error ? err.message : 'Unexpected error', variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setAnalysisResults(null);
  };

  const handleStartOver = () => {
    window.location.href = '/';
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {currentStep === 'hero' && <Hero onGetStarted={handleGetStarted} />}
      
      {currentStep === 'upload' && (
        <div className="min-h-screen flex items-center justify-center p-4 pt-20">
          <div className="w-full max-w-2xl space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Upload Your CV</h1>
              <p className="text-muted-foreground text-lg">
                Upload your CV for instant AI-powered analysis with CVision
              </p>
            </div>
            <div className="animate-slide-up">
              <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button variant="ghost" onClick={handleStartOver} className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {currentStep === 'results' && analysisResults && (
        <div className="min-h-screen p-4 pt-20">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between animate-fade-in">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">CVision Analysis Complete</h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Here's your comprehensive CV analysis and personalized improvement suggestions
                </p>
              </div>
              <div className="space-x-3">
                <Button variant="outline" onClick={handleBackToUpload} className="hover:bg-primary/10">
                  Analyze Another CV
                </Button>
                <Button variant="ghost" onClick={handleStartOver} className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Start Over
                </Button>
              </div>
            </div>
            <div className="animate-slide-up">
              <AnalysisResults {...analysisResults} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
