
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, DollarSign, TrendingUp, AlertTriangle, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BudgetTracker = () => {
  const [totalBudget, setTotalBudget] = useState(25000);
  
  const budgetCategories = [
    { id: 1, name: "Venue", budgeted: 8000, spent: 7500, color: "#8884d8" },
    { id: 2, name: "Catering", budgeted: 6000, spent: 5800, color: "#82ca9d" },
    { id: 3, name: "Photography", budgeted: 3000, spent: 2800, color: "#ffc658" },
    { id: 4, name: "Flowers", budgeted: 1500, spent: 1200, color: "#ff7c7c" },
    { id: 5, name: "Music/DJ", budgeted: 1200, spent: 1200, color: "#8dd1e1" },
    { id: 6, name: "Attire", budgeted: 2000, spent: 1800, color: "#d084d0" },
    { id: 7, name: "Transportation", budgeted: 800, spent: 600, color: "#87d068" },
    { id: 8, name: "Miscellaneous", budgeted: 2500, spent: 1500, color: "#ffb347" }
  ];

  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const remaining = totalBudget - totalSpent;
  const percentageSpent = (totalSpent / totalBudget) * 100;

  const expenses = [
    { date: "2024-01-15", description: "Venue Deposit", category: "Venue", amount: 3000, vendor: "Grand Ballroom" },
    { date: "2024-01-20", description: "Wedding Dress", category: "Attire", amount: 1200, vendor: "Bridal Boutique" },
    { date: "2024-02-01", description: "Photography Package", category: "Photography", amount: 2800, vendor: "Smith Photography" },
    { date: "2024-02-10", description: "Catering Deposit", category: "Catering", amount: 2000, vendor: "Gourmet Catering Co." },
    { date: "2024-02-15", description: "Flowers Consultation", category: "Flowers", amount: 500, vendor: "Bloom & Blossom" }
  ];

  const monthlySpending = [
    { month: "Jan", amount: 4200 },
    { month: "Feb", amount: 6300 },
    { month: "Mar", amount: 3800 },
    { month: "Apr", amount: 2100 },
    { month: "May", amount: 1900 }
  ];

  const pieData = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
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
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-600">Export Report</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Budget Tracker
          </h1>
          <p className="text-gray-600">Monitor your wedding expenses and stay on track</p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <div className="text-green-100">Total Budget</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <div className="text-blue-100">Total Spent</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">${remaining.toLocaleString()}</div>
              <div className="text-purple-100">Remaining</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold mb-2">{percentageSpent.toFixed(1)}%</div>
              <div className="text-orange-100">Budget Used</div>
              <Progress value={percentageSpent} className="mt-2 bg-orange-400" />
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {percentageSpent > 80 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Warning: You've used {percentageSpent.toFixed(1)}% of your budget. Consider reviewing upcoming expenses.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Track spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetCategories.map((category) => {
                  const percentSpent = (category.spent / category.budgeted) * 100;
                  const isOverBudget = category.spent > category.budgeted;
                  
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                          </span>
                          {isOverBudget && (
                            <Badge variant="destructive" className="text-xs">
                              Over Budget
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(percentSpent, 100)} 
                        className={`h-2 ${isOverBudget ? 'bg-red-100' : ''}`}
                      />
                      <div className="text-xs text-gray-500">
                        {percentSpent.toFixed(1)}% of budget used
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardContent>
          </Card>

          {/* Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Distribution</CardTitle>
              <CardDescription>Visual breakdown of expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Spending Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trend</CardTitle>
              <CardDescription>Track your spending over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Latest transactions and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-600">{expense.vendor}</div>
                      <div className="text-xs text-gray-500">{expense.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${expense.amount.toLocaleString()}</div>
                      <Badge variant="outline" className="text-xs">
                        {expense.category}
                      </Badge>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
