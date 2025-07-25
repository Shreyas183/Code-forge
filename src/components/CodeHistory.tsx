import { useState } from 'react';
import { History, Calendar, CheckCircle, X, Code2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Editor } from '@monaco-editor/react';
import { useStore } from '@/store/useStore';
import { CodeSubmission } from '@/types/problem';

interface CodeHistoryProps {
  problemId: string;
}

const CodeHistory = ({ problemId }: CodeHistoryProps) => {
  const { getSubmissions } = useStore();
  const [selectedSubmission, setSelectedSubmission] = useState<CodeSubmission | null>(null);
  
  const submissions = getSubmissions(problemId);

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  const getStatusColor = (passed: boolean) => {
    return passed 
      ? 'bg-success/20 text-success border-success/30' 
      : 'bg-destructive/20 text-destructive border-destructive/30';
  };

  if (submissions.length === 0) {
    return (
      <Card className="p-6 bg-gradient-card border-border/50 text-center">
        <History className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-sm font-medium text-foreground mb-1">No Submissions Yet</h3>
        <p className="text-xs text-muted-foreground">
          Your code submissions will appear here after you run your code.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-sm font-medium text-foreground">Code History</h3>
            <p className="text-xs text-muted-foreground">
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="max-h-64">
        <div className="p-4 space-y-3">
          {submissions.slice().reverse().map((submission, index) => (
            <Dialog key={submission.timestamp}>
              <DialogTrigger asChild>
                <div className="p-3 bg-muted/20 hover:bg-muted/30 rounded-lg border border-border/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(submission.passed)}`}
                      >
                        {submission.passed ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        {submission.passed ? 'Passed' : 'Failed'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {submission.language}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(submission.timestamp)}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground line-clamp-2 font-mono bg-code-bg p-2 rounded">
                    {submission.code.substring(0, 100)}
                    {submission.code.length > 100 && '...'}
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Submission Details
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(submission.timestamp)}
                    </span>
                    <Badge variant="outline">{submission.language}</Badge>
                    <Badge className={getStatusColor(submission.passed)}>
                      {submission.passed ? 'Passed' : 'Failed'}
                    </Badge>
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="code" className="h-full">
                  <TabsList>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    {submission.testResults && (
                      <TabsTrigger value="results">Test Results</TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="code" className="mt-4">
                    <Card className="overflow-hidden">
                      <Editor
                        height="400px"
                        language={submission.language}
                        value={submission.code}
                        theme="vs-dark"
                        options={{
                          readOnly: true,
                          fontSize: 14,
                          fontFamily: 'Monaco, "Courier New", monospace',
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          automaticLayout: true
                        }}
                      />
                    </Card>
                  </TabsContent>

                  {submission.testResults && (
                    <TabsContent value="results" className="mt-4">
                      <ScrollArea className="h-96">
                        <div className="space-y-3">
                          {submission.testResults.map((result, resultIndex) => (
                            <Card key={resultIndex} className={`p-3 border ${result.passed ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'}`}>
                              <div className="flex items-center gap-2 mb-2">
                                {result.passed ? (
                                  <CheckCircle className="h-4 w-4 text-success" />
                                ) : (
                                  <X className="h-4 w-4 text-destructive" />
                                )}
                                <span className="text-sm font-medium">Test Case {resultIndex + 1}</span>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Input:</span>
                                  <code className="ml-2 px-2 py-1 bg-code-bg rounded text-xs font-mono">
                                    {result.input}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Expected:</span>
                                  <code className="ml-2 px-2 py-1 bg-code-bg rounded text-xs font-mono">
                                    {result.expectedOutput}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Actual:</span>
                                  <code className={`ml-2 px-2 py-1 rounded text-xs font-mono ${result.passed ? 'bg-success/20' : 'bg-destructive/20'}`}>
                                    {result.actualOutput}
                                  </code>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  )}
                </Tabs>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default CodeHistory;