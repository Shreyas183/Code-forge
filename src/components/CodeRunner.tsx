import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Check, 
  X, 
  Clock, 
  Code,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/useStore';

interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  executionTime?: number;
}

interface CodeRunnerProps {
  problemId: string;
  testCases: Array<{ input: string; expectedOutput: string }>;
  code: string;
  language: string;
}

const CodeRunner = ({ problemId, testCases, code, language }: CodeRunnerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { markProblemSolved, markProblemAttempted, addSubmission } = useStore();

  const runCode = async () => {
    if (!code.trim()) {
      toast({
        title: "No code to run",
        description: "Please write some code before running tests.",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setShowResults(false);

    // Simulate code execution with mock results
    const mockResults: TestResult[] = testCases.map((testCase, index) => {
      // Simple mock logic - in reality this would execute actual code
      const passed = Math.random() > 0.3; // 70% pass rate for demo
      const executionTime = Math.floor(Math.random() * 100) + 10;
      
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: passed ? testCase.expectedOutput : "Different output",
        passed,
        executionTime
      };
    });

    // Simulate execution time
    await new Promise(resolve => setTimeout(resolve, 1500));

    setResults(mockResults);
    setShowResults(true);
    setIsRunning(false);

    const passedCount = mockResults.filter(r => r.passed).length;
    const allPassed = passedCount === testCases.length;

    // Update user progress
    if (allPassed) {
      markProblemSolved(problemId);
      toast({
        title: "Congratulations! 🎉",
        description: "All test cases passed! Problem solved successfully.",
      });
    } else {
      markProblemAttempted(problemId);
      toast({
        title: `${passedCount}/${testCases.length} test cases passed`,
        description: "Keep trying! Review the failed test cases for hints.",
        variant: "destructive"
      });
    }

    // Add submission to history
    addSubmission(problemId, {
      code,
      language,
      passed: allPassed,
      testResults: mockResults
    });
  };

  const getOverallStatus = () => {
    if (!showResults) return null;
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    return { passed: passedCount, total: totalCount, allPassed: passedCount === totalCount };
  };

  const status = getOverallStatus();

  return (
    <div className="space-y-4">
      {/* Run Button */}
      <div className="flex gap-3">
        <Button 
          onClick={runCode} 
          disabled={isRunning}
          className="flex-1"
          size="lg"
        >
          {isRunning ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          disabled={isRunning}
          onClick={() => {
            // Mock submit functionality
            toast({
              title: "Solution submitted!",
              description: "Your solution has been submitted for review.",
            });
          }}
        >
          <Code className="h-4 w-4 mr-2" />
          Submit
        </Button>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-2">Executing test cases...</p>
              <Progress value={66} className="h-2" />
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {showResults && status && (
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {status.allPassed ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <AlertCircle className="h-5 w-5 text-warning" />
              )}
              Test Results
            </h3>
            <Badge 
              variant={status.allPassed ? "default" : "destructive"}
              className={status.allPassed ? "bg-success text-success-foreground" : ""}
            >
              {status.passed}/{status.total} Passed
            </Badge>
          </div>

          {/* Overall Status */}
          <div className="mb-6 p-4 rounded-lg bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                {status.allPassed ? "All tests passed! 🎉" : "Some tests failed"}
              </span>
              <span className="text-sm text-muted-foreground">
                Execution completed
              </span>
            </div>
            <Progress 
              value={(status.passed / status.total) * 100} 
              className="h-2"
            />
          </div>

          {/* Individual Test Results */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Test Case Details:</h4>
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {result.passed ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className="font-medium text-sm">Test Case {index + 1}</span>
                  </div>
                  {result.executionTime && (
                    <Badge variant="outline" className="text-xs">
                      {result.executionTime}ms
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Input:</p>
                    <p className="font-mono bg-muted p-2 rounded text-xs">
                      {result.input}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Expected:</p>
                    <p className="font-mono bg-muted p-2 rounded text-xs">
                      {result.expectedOutput}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Actual:</p>
                    <p className={`font-mono p-2 rounded text-xs ${
                      result.passed ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {result.actualOutput}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CodeRunner;