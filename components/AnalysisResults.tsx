import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Target, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface AnalysisSection {
  title: string;
  score: number;
  feedback: string[];
  suggestions: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface AnalysisResultsProps {
  overallScore: number;
  sections: AnalysisSection[];
}

export const AnalysisResults = ({ overallScore, sections }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Overall Analysis Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold mb-2">{overallScore}</div>
          <div className="text-xl opacity-90 mb-4">{getScoreLabel(overallScore)}</div>
          <Progress value={overallScore} className="h-3 bg-white/20" />
        </CardContent>
      </Card>

      {/* Section Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-primary/20 transition-all duration-smooth">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                  <Badge 
                    variant={section.score >= 70 ? "default" : "destructive"}
                    className="text-sm font-bold"
                  >
                    {section.score}/100
                  </Badge>
                </div>
                <Progress value={section.score} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Positive Feedback */}
                {section.feedback.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="font-medium text-sm">Strengths</span>
                    </div>
                    <ul className="space-y-1">
                      {section.feedback.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground pl-6">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {section.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Suggestions</span>
                    </div>
                    <ul className="space-y-1">
                      {section.suggestions.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground pl-6">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};