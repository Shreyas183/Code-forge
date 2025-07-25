export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  testCases: TestCase[];
  tags: string[];
  acceptance: number;
  submissions: number;
  solved?: boolean;
  attempted?: boolean;
  hints?: string[];
  solution?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  companies?: string[];
  bookmarked?: boolean;
}

export interface ProblemFilters {
  difficulty: ('Easy' | 'Medium' | 'Hard')[];
  tags: string[];
  status: ('Solved' | 'Attempted' | 'Not Started')[];
  search: string;
}

export interface EditorState {
  language: string;
  code: string;
}

export interface CodeSubmission {
  code: string;
  language: string;
  timestamp: number;
  passed: boolean;
  testResults?: TestResult[];
}

export interface ProblemSession {
  startTime: number;
  totalTime: number;
  hintsUsed: number;
}

export interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

export interface UserProgress {
  solved: string[];
  attempted: string[];
  bookmarked: string[];
  codeByProblem: Record<string, Record<string, string>>; // problemId -> language -> code
  submissions: Record<string, CodeSubmission[]>; // problemId -> submissions[]
  sessions: Record<string, ProblemSession>; // problemId -> session
  streak: {
    current: number;
    longest: number;
    lastSolvedDate?: string;
  };
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  avatar: string;
  progress: UserProgress;
}