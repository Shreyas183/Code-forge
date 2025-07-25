import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  BookOpen,
  TrendingUp,
  Clock,
  Tag,
  Search,
  Plus,
  Eye,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: 'Best approach for solving Two Pointer problems?',
      author: 'Sarah Kim',
      avatar: 'SK',
      category: 'Algorithms',
      time: '2 hours ago',
      replies: 15,
      likes: 23,
      views: 156,
      excerpt: 'I\'ve been struggling with two pointer technique. Can someone explain the intuition behind it?'
    },
    {
      id: 2,
      title: 'How to optimize recursive solutions using memoization',
      author: 'Mike Chen',
      avatar: 'MC',
      category: 'Dynamic Programming',
      time: '4 hours ago',
      replies: 8,
      likes: 31,
      views: 89,
      excerpt: 'Sharing some tips on converting recursive solutions to use memoization for better performance.'
    },
    {
      id: 3,
      title: 'Common mistakes in binary tree traversals',
      author: 'Alex Rodriguez',
      avatar: 'AR',
      category: 'Trees',
      time: '1 day ago',
      replies: 22,
      likes: 45,
      views: 234,
      excerpt: 'Let\'s discuss the most common pitfalls when implementing tree traversal algorithms.'
    },
    {
      id: 4,
      title: 'Interview experience at Big Tech companies',
      author: 'Emily Zhang',
      avatar: 'EZ',
      category: 'Career',
      time: '2 days ago',
      replies: 67,
      likes: 128,
      views: 567,
      excerpt: 'Sharing my recent interview experiences and the types of problems they asked.'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Master Binary Search in 30 Minutes',
      author: 'CodeMaster Pro',
      avatar: 'CM',
      difficulty: 'Intermediate',
      duration: '30 min',
      likes: 234,
      views: 1250,
      description: 'A comprehensive guide to understanding and implementing binary search algorithms.'
    },
    {
      id: 2,
      title: 'Graph Algorithms: From Basics to Advanced',
      author: 'AlgoExpert',
      avatar: 'AE',
      difficulty: 'Advanced',
      duration: '2 hours',
      likes: 567,
      views: 3400,
      description: 'Deep dive into graph theory and practical implementations of graph algorithms.'
    },
    {
      id: 3,
      title: 'Dynamic Programming Patterns',
      author: 'DP Master',
      avatar: 'DM',
      difficulty: 'Advanced',
      duration: '45 min',
      likes: 445,
      views: 2100,
      description: 'Learn the most common DP patterns and how to recognize them in problems.'
    }
  ];

  const categories = [
    { name: 'Algorithms', count: 234, color: 'bg-blue-500' },
    { name: 'Data Structures', count: 189, color: 'bg-green-500' },
    { name: 'Dynamic Programming', count: 156, color: 'bg-purple-500' },
    { name: 'Trees', count: 145, color: 'bg-orange-500' },
    { name: 'Graphs', count: 123, color: 'bg-red-500' },
    { name: 'Career', count: 98, color: 'bg-yellow-500' },
    { name: 'Interview Tips', count: 87, color: 'bg-pink-500' },
    { name: 'Beginner', count: 76, color: 'bg-indigo-500' }
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
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/leaderboard">Leaderboard</Link>
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="h-4 w-4" />
              New Post
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
            Community
          </h1>
          <p className="text-muted-foreground">
            Connect with fellow developers, share knowledge, and learn together
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions, tutorials..."
              className="pl-10"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1">
              <Button
                variant={activeTab === 'discussions' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('discussions')}
                className="flex-1"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions
              </Button>
              <Button
                variant={activeTab === 'tutorials' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('tutorials')}
                className="flex-1"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Tutorials
              </Button>
            </div>

            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-elevation transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {discussion.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{discussion.category}</Badge>
                            <span className="text-sm text-muted-foreground">{discussion.time}</span>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                            {discussion.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {discussion.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {discussion.likes} likes
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {discussion.views} views
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium">{discussion.author}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Tutorials Tab */}
            {activeTab === 'tutorials' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {tutorials.map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-gradient-card border-border/50 shadow-card hover:shadow-elevation transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {tutorial.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline"
                              className={
                                tutorial.difficulty === 'Beginner' ? 'border-green-500 text-green-700' :
                                tutorial.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-700' :
                                'border-red-500 text-red-700'
                              }
                            >
                              {tutorial.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {tutorial.duration}
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                            {tutorial.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4">
                            {tutorial.description}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {tutorial.likes} likes
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {tutorial.views} views
                            </div>
                            <span>by {tutorial.author}</span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Start Discussion
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Write Tutorial
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Solution
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Popular Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Community Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Members</span>
                    <span className="font-bold">15,429</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Today</span>
                    <span className="font-bold text-green-600">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Discussions</span>
                    <span className="font-bold">8,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tutorials</span>
                    <span className="font-bold">2,345</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;