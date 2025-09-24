import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-click login for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (username !== 'admin' || password !== 'admin123') {
      toast({
        title: "Invalid credentials",
        description: "Please use admin/admin123 for demo access.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome Admin!",
        description: "Successfully logged into admin panel.",
      });
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <Crown className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-elegant font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Access the administrative dashboard</p>
        </div>

        <Card className="border-border shadow-elegant">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Admin Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your admin credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In as Admin'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-secondary/20 border-secondary">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-center mb-2">Demo Admin Access</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="text-center"><strong>Username:</strong> admin</p>
              <p className="text-center"><strong>Password:</strong> admin123</p>
              <p className="text-center text-green-600 mt-2">
                Auto-login in 2 seconds for demo...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;