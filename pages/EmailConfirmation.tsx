import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";

const EmailConfirmation = () => {
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResendConfirmation = async () => {
    const email = localStorage.getItem('pending_confirmation_email');
    if (!email) {
      toast({
        title: "Email not found",
        description: "Please go back and sign up again.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      }
    });

    if (error) {
      toast({
        title: "Failed to resend email",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email sent!",
        description: "Please check your inbox for the confirmation link.",
      });
    }
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We've sent a confirmation link to your email address. Please click the link to verify your account and start using CVision.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">What happens next?</p>
                    <ol className="text-muted-foreground space-y-1 list-decimal list-inside ml-2">
                      <li>Check your email inbox (and spam folder)</li>
                      <li>Click the confirmation link</li>
                      <li>You'll be redirected back to CVision</li>
                      <li>Start analyzing your CV instantly!</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleResendConfirmation}
                  disabled={isResending}
                  variant="outline"
                  className="w-full hover:bg-primary/10 border-primary/20"
                >
                  {isResending ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4 mr-2" />
                  )}
                  {isResending ? "Sending..." : "Resend Confirmation Email"}
                </Button>

                <Button
                  onClick={() => navigate('/auth')}
                  variant="ghost"
                  className="w-full group"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Sign In
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border/30">
                Having trouble? Check your spam folder or contact support if the email doesn't arrive within a few minutes.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;