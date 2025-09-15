import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Zap, Target, TrendingUp, Eye } from "lucide-react";
import cvisionLogo from "@/assets/cvision-logo.png";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const handleGetStarted = () => {
    window.location.href = '/auth';
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-accent blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12 animate-fade-in">
          {/* Logo and Main Heading */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 rounded-2xl" />
                <div className="relative w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight leading-tight">
                  CVision
                </h1>
                <p className="text-lg md:text-xl text-primary/80 font-medium mt-2 tracking-wide">
                  AI-Powered CV Analysis Platform
                </p>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                Transform your career with intelligent CV analysis. Get personalized insights, 
                professional recommendations, and unlock your full potential in seconds.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-primary blur-lg opacity-60 group-hover:opacity-90 transition-all duration-500 rounded-2xl animate-glow" />
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="relative bg-gradient-primary hover:shadow-elegant text-primary-foreground shadow-primary text-lg px-12 py-8 h-auto transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 rounded-2xl font-semibold backdrop-blur-sm"
              >
                <Zap className="mr-3 h-6 w-6" />
                Start Your CV Analysis
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <span className="flex items-center bg-card/50 px-4 py-2 rounded-full backdrop-blur-sm border border-border/50">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                100% Free
              </span>
              <span className="flex items-center bg-card/50 px-4 py-2 rounded-full backdrop-blur-sm border border-border/50">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                Secure Login Required
              </span>
              <span className="flex items-center bg-card/50 px-4 py-2 rounded-full backdrop-blur-sm border border-border/50">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                Instant Results
              </span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Card className="group p-8 bg-gradient-card backdrop-blur-md border-primary/20 shadow-card hover:shadow-elegant hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative space-y-6 text-center">
                <div className="mx-auto w-18 h-18 bg-gradient-primary rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow">
                  <Zap className="h-9 w-9 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Lightning Fast</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Advanced AI engine delivers comprehensive analysis in under 30 seconds with precision insights
                </p>
              </div>
            </Card>

            <Card className="group p-8 bg-gradient-card backdrop-blur-md border-primary/20 shadow-card hover:shadow-elegant hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative space-y-6 text-center">
                <div className="mx-auto w-18 h-18 bg-gradient-primary rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow">
                  <Target className="h-9 w-9 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Precision Insights</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Get detailed, actionable feedback tailored to your specific industry and career goals
                </p>
              </div>
            </Card>

            <Card className="group p-8 bg-gradient-card backdrop-blur-md border-primary/20 shadow-card hover:shadow-elegant hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative space-y-6 text-center">
                <div className="mx-auto w-18 h-18 bg-gradient-primary rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow">
                  <TrendingUp className="h-9 w-9 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Career Growth</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Unlock opportunities with professional-grade optimization strategies and expert recommendations
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};