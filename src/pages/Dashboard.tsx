import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Code, 
  Trophy, 
  Target, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Star,
  Award,
  Flame,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { problems } from '@/data/problems';

const Dashboard = () => {
  const { userProgress, getFilteredProblems } = useStore();
  const allProblems = getFilteredProblems();
  const totalProblems = allProblems.length;
  const solvedCount = userProgress.solved?.length || 0;
  const attemptedCount = userProgress.attempted?.length || 0;
  const bookmarkedCount = userProgress.bookmarked?.length || 0;
  const currentStreak = userProgress.streak?.current || 0;
  const longestStreak = userProgress.streak?.longest || 0;

  // Get solved problem objects
  const solvedProblems = problems.filter(p => userProgress.solved.includes(p.id));

  const difficultyStats = {
    Easy: allProblems.filter(p => p.difficulty === 'Easy' && p.solved).length,
    Medium: allProblems.filter(p => p.difficulty === 'Medium' && p.solved).length,
    Hard: allProblems.filter(p => p.difficulty === 'Hard' && p.solved).length,
  };

  const achievements = [
    { 
      id: 'first-solve', 
      title: 'First Victory', 
      description: 'Solve your first problem',
      icon: Trophy,
      unlocked: solvedCount >= 1,
      progress: Math.min(solvedCount, 1)
    },
    { 
      id: 'streak-3', 
      title: 'Getting Warmed Up', 
      description: 'Maintain a 3-day streak',
      icon: Flame,
      unlocked: currentStreak >= 3,
      progress: Math.min(currentStreak / 3, 1)
    },
    { 
      id: 'easy-master', 
      title: 'Easy Master', 
      description: 'Solve 10 easy problems',
      icon: Star,
      unlocked: difficultyStats.Easy >= 10,
      progress: Math.min(difficultyStats.Easy / 10, 1)
    },
    { 
      id: 'problem-collector', 
      title: 'Problem Collector', 
      description: 'Bookmark 5 problems',
      icon: Award,
      unlocked: bookmarkedCount >= 5,
      progress: Math.min(bookmarkedCount / 5, 1)
    }
  ];

  const recentActivity = [
    { type: 'solved', problem: 'Two Sum', difficulty: 'Easy', time: '2 hours ago' },
    { type: 'attempted', problem: 'Binary Tree Traversal', difficulty: 'Medium', time: '1 day ago' },
    { type: 'bookmarked', problem: 'Median of Two Arrays', difficulty: 'Hard', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CodeForge
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/problems">Problems</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/leaderboard">Leaderboard</Link>
            </Button>
            <Button variant="gradient" size="sm">
              <Users className="h-4 w-4" />
              Join Community
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress and achievements
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solved</p>
                <p className="text-2xl font-bold text-success">{solvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attempted</p>
                <p className="text-2xl font-bold text-warning">{attemptedCount}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-primary">{currentStreak}</p>
              </div>
              <Flame className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-accent">
                  {totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0}%
                </p>
              </div>
              <Target className="h-8 w-8 text-accent" />
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Progress Overview
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {solvedCount}/{totalProblems}
                    </span>
                  </div>
                  <Progress 
                    value={totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0} 
                    className="h-2" 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(difficultyStats).map(([difficulty, count]) => (
                    <div key={difficulty} className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`mb-2 ${
                          difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                          difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                          'border-red-500 text-red-700'
                        }`}
                      >
                        {difficulty}
                      </Badge>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-xs text-muted-foreground">solved</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Longest Streak</span>
                    <span className="text-lg font-bold text-primary">{longestStreak} days</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Achievements
              </h3>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      achievement.unlocked 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-muted/30 border-border'
                    }`}
                  >
                    <achievement.icon 
                      className={`h-8 w-8 ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`} 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {!achievement.unlocked && (
                        <Progress 
                          value={achievement.progress * 100} 
                          className="h-1 mt-2" 
                        />
                      )}
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Solved Problems List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Solved Problems
            </h3>
            {solvedProblems.length === 0 ? (
              <div className="text-muted-foreground">No problems solved yet.</div>
            ) : (
              <ul className="list-disc pl-6 space-y-2">
                {solvedProblems.map((problem) => (
                  <li key={problem.id} className="text-base text-success">
                    {problem.title} <span className="text-xs text-muted-foreground">({problem.difficulty})</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                  {activity.type === 'solved' && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  {activity.type === 'attempted' && (
                    <Clock className="h-5 w-5 text-warning" />
                  )}
                  {activity.type === 'bookmarked' && (
                    <Star className="h-5 w-5 text-accent" />
                  )}
                  
                  <div className="flex-1">
                    <p className="font-medium">
                      {activity.type === 'solved' && 'Solved'} 
                      {activity.type === 'attempted' && 'Attempted'} 
                      {activity.type === 'bookmarked' && 'Bookmarked'} 
                      <span className="text-primary"> {activity.problem}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={
                          activity.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                          activity.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                          'border-red-500 text-red-700'
                        }
                      >
                        {activity.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;