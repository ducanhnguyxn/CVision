import { Button } from "@/components/ui/button";
import { Eye, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import cvisionLogo from "@/assets/cvision-logo.png";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-sm opacity-30 rounded-lg" />
              <div className="relative w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            {/* Brand Text */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CVision
              </h1>
              <p className="text-xs text-muted-foreground">AI CV Analysis</p>
            </div>
          </div>
          
          {/* Right side - Auth info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome, {user.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="hover:bg-primary/10 border-primary/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <div className="hidden sm:flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                    Free Analysis
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="hover:bg-primary/10 border-primary/20"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};