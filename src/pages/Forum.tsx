
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, Search, Plus, ThumbsUp, Reply, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const forumCategories = [
    { id: 'planning', name: 'Wedding Planning', count: 1247, color: 'bg-blue-100 text-blue-800' },
    { id: 'venues', name: 'Venues & Locations', count: 892, color: 'bg-green-100 text-green-800' },
    { id: 'dresses', name: 'Dresses & Attire', count: 634, color: 'bg-pink-100 text-pink-800' },
    { id: 'photography', name: 'Photography', count: 567, color: 'bg-purple-100 text-purple-800' },
    { id: 'catering', name: 'Catering & Food', count: 423, color: 'bg-orange-100 text-orange-800' },
    { id: 'budget', name: 'Budget Tips', count: 389, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'diy', name: 'DIY Projects', count: 312, color: 'bg-red-100 text-red-800' },
    { id: 'honeymoon', name: 'Honeymoon Ideas', count: 278, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const posts = [
    {
      id: 1,
      title: "How to choose the perfect wedding venue on a budget?",
      author: "SarahBride2024",
      category: "Venues & Locations",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      content: "I'm looking for advice on finding a beautiful venue that won't break the bank. What are some creative alternatives to traditional venues?",
      tags: ["budget", "venue", "tips"],
      isPinned: true
    },
    {
      id: 2,
      title: "DIY wedding centerpieces - share your ideas!",
      author: "CraftyBride",
      category: "DIY Projects",
      replies: 18,
      likes: 32,
      timeAgo: "4 hours ago",
      content: "I'm making my own centerpieces and would love to see what others have created. Photos welcome!",
      tags: ["diy", "centerpieces", "decoration"],
      isPinned: false
    },
    {
      id: 3,
      title: "Photography timeline for wedding day - need help!",
      author: "Mike_Groom",
      category: "Photography",
      replies: 15,
      likes: 28,
      timeAgo: "6 hours ago",
      content: "Our photographer wants a detailed timeline but we're not sure how long each photo session should take. Any advice?",
      tags: ["photography", "timeline", "planning"],
      isPinned: false
    },
    {
      id: 4,
      title: "Dress shopping stress - is this normal?",
      author: "NervousBride",
      category: "Dresses & Attire",
      replies: 31,
      likes: 67,
      timeAgo: "8 hours ago",
      content: "I've been to 5 shops and still haven't found 'the one'. Starting to panic! Please tell me this is normal...",
      tags: ["dress", "shopping", "advice"],
      isPinned: false
    },
    {
      id: 5,
      title: "Vegetarian catering options that impressed guests",
      author: "VeggieLove",
      category: "Catering & Food",
      replies: 12,
      likes: 19,
      timeAgo: "1 day ago",
      content: "We had an amazing vegetarian menu at our wedding. Happy to share details for other veggie couples!",
      tags: ["vegetarian", "catering", "menu"],
      isPinned: false
    }
  ];

  const trendingTopics = [
    { topic: "Outdoor weddings", posts: 234 },
    { topic: "Micro weddings", posts: 189 },
    { topic: "Sustainable weddings", posts: 156 },
    { topic: "Destination weddings", posts: 143 },
    { topic: "Vintage themes", posts: 127 }
  ];

  const activeUsers = [
    { name: "WeddingExpert", role: "Moderator", posts: 1234 },
    { name: "SarahBride2024", role: "Active Member", posts: 89 },
    { name: "CraftyBride", role: "DIY Enthusiast", posts: 67 },
    { name: "PhotoPro", role: "Professional", posts: 156 },
    { name: "BudgetBride", role: "Budget Expert", posts: 45 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              WeddingPro
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
            <Link to="/seating" className="text-gray-600 hover:text-gray-900 transition-colors">Seating</Link>
            <Link to="/registry" className="text-gray-600 hover:text-gray-900 transition-colors">Registry</Link>
          </nav>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Wedding Community Forum
          </h1>
          <p className="text-gray-600">Connect, share, and get advice from fellow couples and wedding experts</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="recent" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className={`hover:shadow-lg transition-shadow ${post.isPinned ? 'border-yellow-300 bg-yellow-50' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isPinned && (
                              <Badge className="bg-yellow-500 text-white text-xs">Pinned</Badge>
                            )}
                            <Badge className="text-xs" variant="outline">{post.category}</Badge>
                          </div>
                          <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {post.content}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {post.author.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          <span className="text-xs text-gray-500">{post.timeAgo}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {forumCategories.map((category) => (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.count} discussions</p>
                          </div>
                          <Badge className={category.color}>
                            {category.count}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Most Popular Discussions</h3>
                  <p className="text-gray-600">Showing the most liked and commented posts from this week</p>
                </div>
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4">
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unanswered Questions</h3>
                  <p className="text-gray-600">Help fellow couples by answering their questions</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">#{topic.topic}</span>
                      <Badge variant="secondary" className="text-xs">
                        {topic.posts}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Community Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeUsers.map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-600">{user.role}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {user.posts}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Members</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Posts Today</span>
                  <span className="font-semibold">143</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Now</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Posts</span>
                  <span className="font-semibold">45,627</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full">
                  Ask Question
                </Button>
                <Button variant="outline" className="w-full">
                  Share Experience
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
