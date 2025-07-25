import { TrendingUp, Target, Clock, Lightbulb, Users, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/store/useStore';

interface ProblemStatsProps {
  problemId: string;
  acceptance: number;
  submissions: number;
  companies?: string[];
}

const ProblemStats = ({ problemId, acceptance, submissions, companies }: ProblemStatsProps) => {
  const { userProgress, getSession } = useStore();
  const session = getSession(problemId);
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const getDifficultyColor = (acceptance: number) => {
    if (acceptance >= 60) return 'text-green-600 dark:text-green-400';
    if (acceptance >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Acceptance Rate */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Acceptance Rate</p>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getDifficultyColor(acceptance)}`}>
                {acceptance}%
              </span>
              <Progress value={acceptance} className="flex-1 h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Submissions */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Users className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Submissions</p>
            <p className="text-lg font-bold text-foreground">
              {formatNumber(submissions)}
            </p>
          </div>
        </div>
      </Card>

      {/* Time Spent */}
      {session && session.totalTime > 0 && (
        <Card className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time Spent</p>
              <p className="text-lg font-bold text-foreground">
                {formatTime(session.totalTime)}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Hints Used */}
      {session && session.hintsUsed > 0 && (
        <Card className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Lightbulb className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hints Used</p>
              <p className="text-lg font-bold text-foreground">
                {session.hintsUsed}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* User Stats */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Award className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Your Progress</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {userProgress.solved.length} Solved
              </Badge>
              <Badge variant="outline" className="text-xs">
                Streak: {userProgress.streak.current}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Companies */}
      {companies && companies.length > 0 && (
        <Card className="p-4 bg-gradient-card border-border/50 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2">Asked by Companies</p>
              <div className="flex flex-wrap gap-2">
                {companies.slice(0, 6).map((company) => (
                  <Badge 
                    key={company} 
                    variant="outline" 
                    className="text-xs bg-muted/20"
                  >
                    {company}
                  </Badge>
                ))}
                {companies.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{companies.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProblemStats;