import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Code, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  Circle,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import CodeEditor from '@/components/CodeEditor';
import CodeRunner from '@/components/CodeRunner';
import ProblemTimer from '@/components/ProblemTimer';
import HintsPanel from '@/components/HintsPanel';
import CodeHistory from '@/components/CodeHistory';
import ProblemStats from '@/components/ProblemStats';
import { cn } from '@/lib/utils';

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProblemById, userProgress } = useStore();
  
  if (!id) {
    return <Navigate to="/problems" replace />;
  }

  const problem = getProblemById(id);
  
  if (!problem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Problem Not Found</h1>
          <p className="text-muted-foreground mb-4">The problem you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/problems">Back to Problems</Link>
          </Button>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Easy: 'bg-easy/20 text-easy border-easy/30',
    Medium: 'bg-medium/20 text-medium border-medium/30',
    Hard: 'bg-hard/20 text-hard border-hard/30'
  };

  const getStatusIcon = () => {
    if (userProgress.solved.includes(problem.id)) {
      return <CheckCircle className="h-5 w-5 text-success" />;
    }
    if (userProgress.attempted.includes(problem.id)) {
      return <Clock className="h-5 w-5 text-warning" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusText = () => {
    if (userProgress.solved.includes(problem.id)) {
      return 'Solved';
    }
    if (userProgress.attempted.includes(problem.id)) {
      return 'Attempted';
    }
    return 'Not Started';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/problems">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CodeForge
              </span>
            </Link>
          </div>
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            {/* Problem Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {getStatusIcon()}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground">{problem.title}</h1>
                  <p className="text-sm text-muted-foreground mt-1">Status: {getStatusText()}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge 
                  variant="outline" 
                  className={difficultyColors[problem.difficulty]}
                >
                  {problem.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  {problem.acceptance}% Acceptance
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {problem.submissions.toLocaleString()} Submissions
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Problem Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="constraints">Constraints</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <Card className="p-6 bg-gradient-card border-border/50">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-foreground leading-relaxed whitespace-pre-line">
                        {problem.description}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="examples" className="mt-6">
                  <div className="space-y-4">
                    {problem.examples.map((example, index) => (
                      <Card key={index} className="p-6 bg-gradient-card border-border/50">
                        <h4 className="font-semibold text-foreground mb-3">Example {index + 1}:</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Input:</span>
                            <code className="block mt-1 p-2 bg-code-bg rounded text-sm font-mono">
                              {example.input}
                            </code>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Output:</span>
                            <code className="block mt-1 p-2 bg-code-bg rounded text-sm font-mono">
                              {example.output}
                            </code>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="text-sm text-muted-foreground">Explanation:</span>
                              <p className="mt-1 text-sm text-foreground">{example.explanation}</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="constraints" className="mt-6">
                  <Card className="p-6 bg-gradient-card border-border/50">
                    <h4 className="font-semibold text-foreground mb-4">Constraints:</h4>
                    <ul className="space-y-2">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <code className="font-mono bg-code-bg px-2 py-1 rounded text-xs">
                            {constraint}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4" />
                Discuss
              </Button>
            </motion.div>
          </div>

          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <CodeEditor problemId={problem.id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;