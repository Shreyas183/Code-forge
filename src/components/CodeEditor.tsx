import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Play, RotateCcw, Save, CheckCircle, X } from 'lucide-react';
import CodeRunner from './CodeRunner';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  problemId: string;
}

const languages = [
  { value: 'javascript', label: 'JavaScript', template: '// Write your solution here\nfunction solution() {\n    \n}' },
  { value: 'typescript', label: 'TypeScript', template: '// Write your solution here\nfunction solution(): any {\n    \n}' },
  { value: 'python', label: 'Python', template: '# Write your solution here\ndef solution():\n    pass' },
  { value: 'cpp', label: 'C++', template: '// Write your solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}' },
  { value: 'java', label: 'Java', template: '// Write your solution here\npublic class Solution {\n    public void solution() {\n        \n    }\n}' }
];

interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

const CodeEditor = ({ problemId }: CodeEditorProps) => {
  const { saveCode, getCode, markProblemAttempted, markProblemSolved } = useStore();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState('');

  useEffect(() => {
    const savedCode = getCode(problemId, language);
    if (savedCode) {
      setCode(savedCode);
    } else {
      const template = languages.find(lang => lang.value === language)?.template || '';
      setCode(template);
    }
  }, [language, problemId, getCode]);

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (code.trim()) {
        saveCode(problemId, language, code);
      }
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [code, language, problemId, saveCode]);

  const simulateCodeExecution = (input: string): string => {
    // This is a mock function that simulates code execution
    // In a real implementation, this would send the code to a backend service
    
    // Simple simulation for common test cases
    const mockResults: Record<string, string> = {
      '[2,7,11,15], 9': '[0,1]',
      '[3,2,4], 6': '[1,2]',
      '[3,3], 6': '[0,1]',
      '123': '321',
      '-123': '-321',
      '120': '21',
      '121': 'true',
      '-121': 'false',
      '10': 'false',
      '["flower","flow","flight"]': '"fl"',
      '["dog","racecar","car"]': '""',
      '[1,2,4], [1,3,4]': '[1,1,2,3,4,4]',
      '[], []': '[]',
      '[], [0]': '[0]',
      '[1,3], [2]': '2.00000',
      '[1,2], [3,4]': '2.50000'
    };

    return mockResults[input] || 'Output not available';
  };

  const runCode = async () => {
    setIsRunning(true);
    markProblemAttempted(problemId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get problem test cases (this would come from props or context)
    const mockTestCases = [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { input: '[3,3], 6', expectedOutput: '[0,1]' }
    ];

    const results: TestResult[] = mockTestCases.map(testCase => {
      const actualOutput = simulateCodeExecution(testCase.input);
      return {
        ...testCase,
        actualOutput,
        passed: actualOutput === testCase.expectedOutput
      };
    });

    setTestResults(results);
    setShowResults(true);
    setIsRunning(false);

    // Check if all tests passed
    const allPassed = results.every(result => result.passed);
    if (allPassed) {
      markProblemSolved(problemId);
    }
  };

  const runCustomTest = () => {
    if (!customInput.trim()) return;
    
    const output = simulateCodeExecution(customInput);
    setCustomOutput(output);
  };

  const resetCode = () => {
    const template = languages.find(lang => lang.value === language)?.template || '';
    setCode(template);
  };

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={resetCode}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button 
            variant="run" 
            size="sm" 
            onClick={runCode}
            disabled={isRunning}
            className="flex-1 sm:flex-none"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <Card className="overflow-hidden bg-editor-bg border-border/50">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: 'Monaco, "Courier New", monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            selectOnLineNumbers: true,
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8
            }
          }}
        />
      </Card>

      {/* Custom Test Case */}
      <Card className="p-4 bg-gradient-card border-border/50">
        <h3 className="text-sm font-medium text-foreground mb-3">Custom Test Case</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Input</label>
            <Textarea
              placeholder="Enter custom input..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="h-20 text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Output</label>
            <Textarea
              placeholder="Output will appear here..."
              value={customOutput}
              readOnly
              className="h-20 text-sm font-mono bg-muted/30"
            />
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3"
          onClick={runCustomTest}
          disabled={!customInput.trim()}
        >
          Test
        </Button>
      </Card>

      {/* Test Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Test Results</h3>
              <Badge 
                variant={testResults.every(r => r.passed) ? "default" : "destructive"}
                className={cn(
                  testResults.every(r => r.passed) 
                    ? "bg-success/20 text-success border-success/30" 
                    : "bg-destructive/20 text-destructive border-destructive/30"
                )}
              >
                {testResults.filter(r => r.passed).length} / {testResults.length} Passed
              </Badge>
            </div>

            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all",
                    result.passed 
                      ? "border-success/30 bg-success/5" 
                      : "border-destructive/30 bg-destructive/5"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm font-medium">Test Case {index + 1}</span>
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
                      <code className={cn(
                        "ml-2 px-2 py-1 rounded text-xs font-mono",
                        result.passed ? "bg-success/20" : "bg-destructive/20"
                      )}>
                        {result.actualOutput}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {testResults.every(r => r.passed) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-success/10 border border-success/30 rounded-lg text-center"
              >
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <h4 className="text-success font-semibold mb-1">Congratulations!</h4>
                <p className="text-sm text-muted-foreground">All test cases passed successfully!</p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default CodeEditor;