import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProblemFilters, UserProgress, Problem, CodeSubmission, ProblemSession, User } from '../types/problem';
import { problems } from '../data/problems';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

interface AppStore {
  users: User[];
  currentUserId: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  signup: (user: Omit<User, 'id' | 'progress'> & { password: string }) => boolean;
  updateProfile: (updates: Partial<Omit<User, 'id' | 'username' | 'password' | 'progress'>>) => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  // User progress (for current user)
  userProgress: UserProgress;
  markProblemSolved: (problemId: string) => void;
  markProblemAttempted: (problemId: string) => void;
  saveCode: (problemId: string, language: string, code: string) => void;
  getCode: (problemId: string, language: string) => string;
  toggleBookmark: (problemId: string) => void;
  addSubmission: (problemId: string, submission: Omit<CodeSubmission, 'timestamp'>) => void;
  getSubmissions: (problemId: string) => CodeSubmission[];
  startSession: (problemId: string) => void;
  updateSession: (problemId: string, hintsUsed?: number) => void;
  endSession: (problemId: string) => void;
  getSession: (problemId: string) => ProblemSession | undefined;

  // Filters
  filters: ProblemFilters;
  setFilters: (filters: Partial<ProblemFilters>) => void;
  clearFilters: () => void;

  // Problems
  getFilteredProblems: () => Problem[];
  getProblemById: (id: string) => Problem | undefined;
}

const defaultFilters: ProblemFilters = {
  difficulty: [],
  tags: [],
  status: [],
  search: ''
};

const defaultUserProgress: UserProgress = {
  solved: [],
  attempted: [],
  bookmarked: [],
  codeByProblem: {},
  submissions: {},
  sessions: {},
  streak: {
    current: 0,
    longest: 0
  }
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUserId: null,
      isLoggedIn: false,
      login: (username: string, password: string) => {
        const user = get().users.find(u => u.username === username && u.password === password);
        if (user) {
          set({ currentUserId: user.id, isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUserId: null, isLoggedIn: false }),
      signup: (user: Omit<User, 'id' | 'progress'> & { password: string }) => {
        if (get().users.some(u => u.username === user.username)) {
          return false;
        }
        const newUser: User = {
          id: uuidv4(),
          username: user.username,
          password: user.password,
          name: user.name,
          email: user.email,
          avatar: user.avatar || '', // TODO: Generate avatar URL if not provided
          progress: defaultUserProgress
        };
        set(state => ({ users: [...state.users, newUser] }));
        set({ currentUserId: newUser.id, isLoggedIn: true });
        return true;
      },
      updateProfile: (updates: Partial<Omit<User, 'id' | 'username' | 'password' | 'progress'>>) => {
        set(state => ({
          users: state.users.map(user =>
            user.id === state.currentUserId ? { ...user, ...updates } : user
          )
        }));
      },
      changePassword: (oldPassword: string, newPassword: string) => {
        const user = get().users.find(u => u.id === get().currentUserId);
        if (user && user.password === oldPassword) {
          set(state => ({
            users: state.users.map(u =>
              u.id === state.currentUserId ? { ...u, password: newPassword } : u
            )
          }));
          return true;
        }
        return false;
      },
      userProgress: defaultUserProgress,
      filters: defaultFilters,

      markProblemSolved: (problemId: string) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            solved: Array.from(new Set([...(state.userProgress?.solved || []), problemId])),
            attempted: (state.userProgress?.attempted || []).filter(id => id !== problemId)
          }
        })),

      markProblemAttempted: (problemId: string) =>
        set((state) => {
          if (state.userProgress?.solved?.includes(problemId)) return state;
          return {
            userProgress: {
              ...state.userProgress,
              attempted: Array.from(new Set([...(state.userProgress?.attempted || []), problemId]))
            }
          };
        }),

      saveCode: (problemId: string, language: string, code: string) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            codeByProblem: {
              ...state.userProgress.codeByProblem,
              [problemId]: {
                ...state.userProgress.codeByProblem[problemId],
                [language]: code
              }
            }
          }
        })),

      getCode: (problemId: string, language: string): string => {
        const state = get();
        return state.userProgress.codeByProblem[problemId]?.[language] || '';
      },

      toggleBookmark: (problemId: string) =>
        set((state) => {
          const isBookmarked = (state.userProgress?.bookmarked || []).includes(problemId);
          return {
            userProgress: {
              ...state.userProgress,
              bookmarked: isBookmarked
                ? (state.userProgress?.bookmarked || []).filter(id => id !== problemId)
                : [...(state.userProgress?.bookmarked || []), problemId]
            }
          };
        }),

      addSubmission: (problemId: string, submission: Omit<CodeSubmission, 'timestamp'>) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            submissions: {
              ...state.userProgress.submissions,
              [problemId]: [
                ...(state.userProgress.submissions[problemId] || []),
                { ...submission, timestamp: Date.now() }
              ]
            }
          }
        })),

      getSubmissions: (problemId: string): CodeSubmission[] => {
        const state = get();
        return state.userProgress.submissions[problemId] || [];
      },

      startSession: (problemId: string) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            sessions: {
              ...state.userProgress.sessions,
              [problemId]: {
                startTime: Date.now(),
                totalTime: 0,
                hintsUsed: 0
              }
            }
          }
        })),

      updateSession: (problemId: string, hintsUsed = 0) =>
        set((state) => {
          const session = state.userProgress.sessions[problemId];
          if (!session) return state;
          
          return {
            userProgress: {
              ...state.userProgress,
              sessions: {
                ...state.userProgress.sessions,
                [problemId]: {
                  ...session,
                  hintsUsed: session.hintsUsed + hintsUsed
                }
              }
            }
          };
        }),

      endSession: (problemId: string) =>
        set((state) => {
          const session = state.userProgress.sessions[problemId];
          if (!session) return state;
          
          return {
            userProgress: {
              ...state.userProgress,
              sessions: {
                ...state.userProgress.sessions,
                [problemId]: {
                  ...session,
                  totalTime: session.totalTime + (Date.now() - session.startTime)
                }
              }
            }
          };
        }),

      getSession: (problemId: string): ProblemSession | undefined => {
        const state = get();
        return state.userProgress.sessions[problemId];
      },

      setFilters: (newFilters: Partial<ProblemFilters>) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),

      clearFilters: () =>
        set(() => ({
          filters: defaultFilters
        })),

      getFilteredProblems: (): Problem[] => {
        const state = get();
        const { filters, userProgress } = state;
        
        return problems
          .map(problem => ({
            ...problem,
            solved: userProgress?.solved?.includes(problem.id) || false,
            attempted: userProgress?.attempted?.includes(problem.id) || false,
            bookmarked: userProgress?.bookmarked?.includes(problem.id) || false
          }))
          .filter(problem => {
            // Difficulty filter
            if (filters.difficulty?.length > 0 && !filters.difficulty.includes(problem.difficulty)) {
              return false;
            }

            // Tags filter
            if (filters.tags?.length > 0 && !filters.tags.some(tag => problem.tags?.includes(tag))) {
              return false;
            }

            // Status filter
            if (filters.status?.length > 0) {
              const status = problem.solved ? 'Solved' : problem.attempted ? 'Attempted' : 'Not Started';
              if (!filters.status.includes(status as any)) {
                return false;
              }
            }

            // Search filter
            if (filters.search && problem.title && !problem.title.toLowerCase().includes(filters.search.toLowerCase())) {
              return false;
            }

            return true;
          });
      },

      getProblemById: (id: string): Problem | undefined => {
        const state = get();
        const problem = problems.find(p => p.id === id);
        if (!problem) return undefined;

        return {
          ...problem,
          solved: (state.userProgress?.solved || []).includes(problem.id),
          attempted: (state.userProgress?.attempted || []).includes(problem.id),
          bookmarked: (state.userProgress?.bookmarked || []).includes(problem.id)
        };
      }
    }),
    {
      name: 'codeforge-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userProgress: state.userProgress,
        isLoggedIn: state.isLoggedIn
      })
    }
  )
);