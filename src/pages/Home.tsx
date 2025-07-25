import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Code, Users, Trophy, TrendingUp, CheckCircle, Clock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';

const Home = () => {
  const { userProgress } = useStore();
  const totalProblems = 6; // Update this based on your problems data
  const solvedCount = userProgress.solved.length;
  const attemptedCount = userProgress.attempted.length;
  const isLoggedIn = useStore((s) => s.isLoggedIn);
  const logout = useStore((s) => s.logout);
  const navigate = useNavigate();

  const stats = [
    { icon: CheckCircle, label: 'Solved', value: solvedCount, color: 'text-success' },
    { icon: Clock, label: 'Attempted', value: attemptedCount, color: 'text-warning' },
    { icon: Code, label: 'Total Problems', value: totalProblems, color: 'text-accent' },
    { icon: TrendingUp, label: 'Success Rate', value: `${totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0}%`, color: 'text-primary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CodeForge
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/problems">
              <Button variant="ghost">Problems</Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost">Leaderboard</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/community">
              <Button variant="gradient" size="sm">
                <Users className="h-4 w-4" />
                Join Community
              </Button>
            </Link>
            {isLoggedIn && (
              <Link to="/account">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
          >
            Master Coding
            <br />
            One Problem at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            Sharpen your programming skills with our curated collection of coding challenges.
            Practice algorithms, data structures, and problem-solving techniques.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/problems">
              <Button variant="gradient" size="hero" className="w-full sm:w-auto">
                <Code className="h-5 w-5" />
                Start Solving
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="hero" className="w-full sm:w-auto">
                <Trophy className="h-5 w-5" />
                View Leaderboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <Card className="p-6 text-center bg-gradient-card border-border/50 shadow-card hover:shadow-elevation transition-all duration-300">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Code,
              title: 'Multiple Languages',
              description: 'Code in JavaScript, TypeScript, Python, C++, and more with syntax highlighting.'
            },
            {
              icon: TrendingUp,
              title: 'Track Progress',
              description: 'Monitor your improvement with detailed statistics and achievement tracking.'
            },
            {
              icon: Users,
              title: 'Community Driven',
              description: 'Join thousands of developers improving their skills together.'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
            >
              <Card className="p-8 text-center bg-gradient-card border-border/50 shadow-card hover:shadow-elevation transition-all duration-300 h-full">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background/95 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">CodeForge</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Built with React and TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;