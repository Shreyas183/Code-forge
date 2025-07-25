import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { Code } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');
  const login = useStore((s) => s.login);
  const signup = useStore((s) => s.signup);
  const isLoggedIn = useStore((s) => s.isLoggedIn);
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isLoggedIn) {
    navigate('/');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !name || !email) {
      setError('Please fill in all fields');
      return;
    }
    const success = signup({ username, password, name, email, avatar: '' });
    if (success) {
      navigate('/');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero">
      {/* Website Name Header */}
      <div className="flex items-center space-x-2 mb-8">
        <Code className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          CodeForge
        </span>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
        </CardHeader>
        <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
            {mode === 'signup' && (
              <>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-destructive text-sm">{error}</div>}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" variant="gradient">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full text-center"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
            >
              {mode === 'login'
                ? "New user? Create an account"
                : "Already have an account? Log in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login; 