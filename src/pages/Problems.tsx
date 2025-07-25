import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Circle,
  Code,
  Users,
  TrendingUp,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { allTags } from '@/data/problems';
import { cn } from '@/lib/utils';

const Problems = () => {
  const { 
    filters, 
    setFilters, 
    clearFilters, 
    getFilteredProblems,
    userProgress 
  } = useStore();
  
  const [showFilters, setShowFilters] = useState(false);
  const problems = getFilteredProblems();

  const difficultyColors = {
    Easy: 'bg-easy/20 text-easy border-easy/30',
    Medium: 'bg-medium/20 text-medium border-medium/30',
    Hard: 'bg-hard/20 text-hard border-hard/30'
  };

  const getStatusIcon = (problemId: string) => {
    if (userProgress.solved.includes(problemId)) {
      return <CheckCircle className="h-5 w-5 text-success" />;
    }
    if (userProgress.attempted.includes(problemId)) {
      return <Clock className="h-5 w-5 text-warning" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const toggleDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    setFilters({ difficulty: newDifficulties });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    setFilters({ tags: newTags });
  };

  const toggleStatus = (status: 'Solved' | 'Attempted' | 'Not Started') => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setFilters({ status: newStatus });
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
              <Link to="/">Home</Link>
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
            Problems
          </h1>
          <p className="text-muted-foreground">
            Solve coding challenges and improve your programming skills
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && "bg-accent")}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {(filters.difficulty.length > 0 || filters.tags.length > 0 || filters.status.length > 0) && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="space-y-6">
                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={filters.difficulty.includes(difficulty as any) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleDifficulty(difficulty as any)}
                        className={cn(
                          "transition-all",
                          filters.difficulty.includes(difficulty as any) && difficultyColors[difficulty as keyof typeof difficultyColors]
                        )}
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'Solved', icon: CheckCircle, color: 'text-success' },
                      { key: 'Attempted', icon: Clock, color: 'text-warning' },
                      { key: 'Not Started', icon: Circle, color: 'text-muted-foreground' }
                    ].map((status) => (
                      <Button
                        key={status.key}
                        variant={filters.status.includes(status.key as any) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleStatus(status.key as any)}
                        className="transition-all"
                      >
                        <status.icon className={`h-4 w-4 ${status.color}`} />
                        {status.key}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(allTags || []).map((tag) => (
                      <Button
                        key={tag}
                        variant={filters.tags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTag(tag)}
                        className="transition-all"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-muted-foreground">
            Showing {problems.length} problems
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>{userProgress.solved.length} Solved</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-warning" />
              <span>{userProgress.attempted.length} Attempted</span>
            </div>
          </div>
        </motion.div>

        {/* Problems List */}
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link to={`/problem/${problem.id}`}>
                <Card className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-elevation transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {getStatusIcon(problem.id)}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                          {problem.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge 
                            variant="outline" 
                            className={difficultyColors[problem.difficulty]}
                          >
                            {problem.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <TrendingUp className="h-3 w-3" />
                            {problem.acceptance}%
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {problem.tags?.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {problem.tags && problem.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{problem.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {problems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Circle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No problems found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Problems;