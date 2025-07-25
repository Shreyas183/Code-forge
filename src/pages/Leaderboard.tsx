import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Code, 
  Trophy, 
  Medal, 
  Crown,
  Users,
  Calendar,
  TrendingUp,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', solved: 156, points: 2340, streak: 23, avatar: 'AC' },
    { rank: 2, name: 'Sarah Kim', solved: 142, points: 2100, streak: 15, avatar: 'SK' },
    { rank: 3, name: 'Mike Rodriguez', solved: 138, points: 2050, streak: 18, avatar: 'MR' },
    { rank: 4, name: 'Emily Zhang', solved: 129, points: 1920, streak: 12, avatar: 'EZ' },
    { rank: 5, name: 'David Wilson', solved: 125, points: 1875, streak: 9, avatar: 'DW' },
    { rank: 6, name: 'Lisa Johnson', solved: 119, points: 1785, streak: 7, avatar: 'LJ' },
    { rank: 7, name: 'Tom Anderson', solved: 112, points: 1680, streak: 5, avatar: 'TA' },
    { rank: 8, name: 'Jessica Brown', solved: 108, points: 1620, streak: 11, avatar: 'JB' },
    { rank: 9, name: 'Ryan Davis', solved: 105, points: 1575, streak: 3, avatar: 'RD' },
    { rank: 10, name: 'Anna Miller', solved: 98, points: 1470, streak: 6, avatar: 'AM' },
  ];

  const topContributors = [
    { name: 'CodeMaster Pro', contributions: 45, type: 'Problems Created' },
    { name: 'AlgoExpert', contributions: 38, type: 'Solutions Reviewed' },
    { name: 'DebugHero', contributions: 32, type: 'Comments & Discussions' },
    { name: 'TestCaseQueen', contributions: 28, type: 'Test Cases Added' },
  ];

  const weeklyChallenge = {
    title: 'Binary Tree Week',
    description: 'Solve 5 binary tree problems to earn bonus points',
    progress: 3,
    total: 5,
    reward: '500 bonus points + special badge',
    timeLeft: '4 days left'
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

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
              <Link to="/dashboard">Dashboard</Link>
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
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            See how you rank among the coding community
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card className="p-8 bg-gradient-card border-border/50 shadow-card">
                <h3 className="text-xl font-semibold mb-6 text-center">Top Performers</h3>
                <div className="flex justify-center items-end gap-8">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <div className="w-16 h-20 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">2</span>
                    </div>
                    <Avatar className="h-12 w-12 mx-auto mb-2">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {leaderboardData[1].avatar}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{leaderboardData[1].name}</p>
                    <p className="text-xs text-muted-foreground">{leaderboardData[1].points} pts</p>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <div className="w-16 h-24 bg-yellow-400 rounded-t-lg mb-4 flex items-center justify-center">
                      <Crown className="h-8 w-8 text-yellow-800" />
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {leaderboardData[0].avatar}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{leaderboardData[0].name}</p>
                    <p className="text-sm text-muted-foreground">{leaderboardData[0].points} pts</p>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-600 rounded-t-lg mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-amber-900">3</span>
                    </div>
                    <Avatar className="h-12 w-12 mx-auto mb-2">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {leaderboardData[2].avatar}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{leaderboardData[2].name}</p>
                    <p className="text-xs text-muted-foreground">{leaderboardData[2].points} pts</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Full Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Global Rankings
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 flex justify-center">
                          {getRankIcon(user.rank)}
                        </div>
                        
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{user.solved} solved</span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {user.streak} day streak
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-primary">{user.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Challenge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekly Challenge
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary">{weeklyChallenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{weeklyChallenge.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{weeklyChallenge.progress}/{weeklyChallenge.total}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="text-accent">{weeklyChallenge.reward}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{weeklyChallenge.timeLeft}</p>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    View Challenge Problems
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Top Contributors
                </h3>
                
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">{contributor.type}</p>
                      </div>
                      <Badge variant="secondary">{contributor.contributions}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Your Rank */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-card border-border/50 shadow-card border-primary/50">
                <h3 className="font-semibold mb-4 text-primary">Your Current Rank</h3>
                
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">#247</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Out of 10,247 participants
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Points:</span>
                      <span className="font-medium">456</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Problems Solved:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Streak:</span>
                      <span className="font-medium">3 days</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" size="sm" asChild>
                    <Link to="/problems">Solve More Problems</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;