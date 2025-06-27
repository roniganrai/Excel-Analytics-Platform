// client/src/pages/AIInsights.js
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import MovingNetwork from '../components/MovingNetwork';
import MovingBorder from '../components/MovingBorder';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Brain, Zap, TrendingUp, AlertTriangle, Target, BarChart3, Clock, Sparkles, FileSpreadsheet, Lightbulb, Activity, Eye } from 'lucide-react';

// Select Component (simplified)
const Select = ({ value, onValueChange, children, disabled, className }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      disabled={disabled}
      className={`w-full h-12 px-3 rounded-md bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ${className}`}
    >
      {children}
    </select>
  );
};

const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

// ScrollArea Component (simplified)
const ScrollArea = ({ children, className }) => {
  return <div className={`overflow-auto ${className}`}>{children}</div>;
};

// Animated Text Component
const AnimatedText = ({ text, isGenerating }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (isGenerating && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (!isGenerating) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [currentIndex, text, isGenerating]);

  return <span>{displayedText}</span>;
};

const AIInsights = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(null);
  const [insightHistory, setInsightHistory] = useState([
    {
      id: '1',
      fileName: 'Sales_Q4_2024.xlsx',
      timestamp: '2024-12-21 14:30',
      summary:
        'Your Q4 sales data reveals exceptional performance with a 34% increase compared to Q3. The analysis shows strong seasonal patterns with December being the peak month, contributing 45% of quarterly revenue. Product categories show varied performance with Electronics leading at 52% growth, while Clothing maintained steady 12% growth. Regional analysis indicates North America and Europe as top performers, with emerging opportunities in the Asia-Pacific region.',
      keyInsights: [
        {
          type: 'trend',
          text: '34% quarterly growth with accelerating momentum',
          icon: TrendingUp,
        },
        {
          type: 'opportunity',
          text: 'Asia-Pacific region shows 67% untapped potential',
          icon: Target,
        },
        {
          type: 'pattern',
          text: 'December sales peak suggests strong holiday strategy effectiveness',
          icon: BarChart3,
        },
        {
          type: 'alert',
          text: 'Inventory levels may be insufficient for Q1 demand surge',
          icon: AlertTriangle,
        },
      ],
      recommendations: [
        'Increase inventory allocation for Electronics category by 40%',
        'Expand marketing efforts in Asia-Pacific region',
        'Prepare for Q1 demand surge based on current trajectory',
        'Consider premium pricing strategy for high-performing products',
      ],
    },
    {
      id: '2',
      fileName: 'Marketing_Data.xlsx',
      timestamp: '2024-12-20 16:45',
      summary:
        'Marketing campaign analysis reveals significant ROI improvements across digital channels. Social media campaigns achieved 156% ROI, while email marketing delivered consistent 89% ROI. Customer acquisition costs decreased by 23% while lifetime value increased by 31%. The data suggests optimal budget allocation should favor social media and content marketing strategies.',
      keyInsights: [
        {
          type: 'trend',
          text: '156% ROI from social media campaigns',
          icon: TrendingUp,
        },
        {
          type: 'opportunity',
          text: 'Content marketing shows 89% engagement rate potential',
          icon: Lightbulb,
        },
        {
          type: 'pattern',
          text: 'Customer lifetime value increased 31% year-over-year',
          icon: Activity,
        },
      ],
      recommendations: [
        'Reallocate 35% more budget to social media campaigns',
        'Implement advanced content marketing automation',
        'Focus on customer retention programs to maximize LTV',
      ],
    },
  ]);

  // Mock uploaded files
  const uploadedFiles = [
    'Sales_Q4_2024.xlsx',
    'Marketing_Data.xlsx',
    'Financial_Report.xlsx',
    'Customer_Analytics.xlsx',
    'Product_Performance.xlsx',
    'Regional_Analysis.xlsx',
  ];

  const generateAIInsight = async () => {
    if (!selectedFile) return;

    setIsGenerating(true);
    setCurrentInsight(null);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock AI insight generation
    const mockInsight = {
      id: Date.now().toString(),
      fileName: selectedFile,
      timestamp: new Date().toLocaleString(),
      summary: `Advanced AI analysis of ${selectedFile} reveals comprehensive patterns and actionable insights. The data demonstrates strong performance indicators with notable trends in key metrics. Machine learning algorithms have identified optimization opportunities and potential risk factors that require strategic attention. The analysis incorporates predictive modeling to forecast future performance based on historical patterns and current market conditions.`,
      keyInsights: [
        {
          type: 'trend',
          text: 'Revenue growth accelerating at 28% month-over-month',
          icon: TrendingUp,
        },
        {
          type: 'opportunity',
          text: 'Untapped market segment worth $2.3M potential',
          icon: Target,
        },
        {
          type: 'alert',
          text: 'Customer churn rate increased by 15% - immediate action needed',
          icon: AlertTriangle,
        },
        {
          type: 'pattern',
          text: 'Seasonal demand patterns suggest Q1 surge incoming',
          icon: BarChart3,
        },
      ],
      recommendations: [
        'Implement customer retention program to address churn rate',
        'Allocate resources to capture identified market opportunity',
        'Prepare inventory and staffing for predicted Q1 demand surge',
        'Optimize pricing strategy based on revenue growth trends',
      ],
    };

    setCurrentInsight(mockInsight);
    setInsightHistory([mockInsight, ...insightHistory]);
    setIsGenerating(false);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'trend':
        return TrendingUp;
      case 'alert':
        return AlertTriangle;
      case 'opportunity':
        return Target;
      case 'pattern':
        return BarChart3;
      default:
        return Lightbulb;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'trend':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'alert':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'opportunity':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'pattern':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      default:
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
   <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <div className="flex flex-col flex-1">
        <div className="relative z-30">
      <Navbar />
    </div>
      {/* Moving Network Background */}
      <div className="absolute inset-0 z-0">
        <MovingNetwork />
      </div>

      {/* Content */}
       <div className="relative z-20 pt-16 pl-4 overflow-y-auto " style={{ height: '100vh' }} >
        <div className="p-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 shadow-xl border border-slate-700 transform group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">
              AI-Powered Data Insights
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Select an uploaded file and let AI interpret your data with advanced analytics and predictive insights.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* File Selection */}
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="blue" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <FileSpreadsheet className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300" />
                      <span className="group-hover:text-blue-100 transition-colors">Data Source</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Select File</label>
                      <Select value={selectedFile} onValueChange={setSelectedFile}>
                        <SelectItem value="">Choose uploaded file</SelectItem>
                        {uploadedFiles.map((file) => (
                          <SelectItem key={file} value={file}>
                            {file}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Button
                      onClick={generateAIInsight}
                      disabled={!selectedFile || isGenerating}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 border-0 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Get AI Insight
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI Status */}
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="purple" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Sparkles className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                      <span className="group-hover:text-purple-100 transition-colors">AI Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-slate-300">Model</span>
                        <span className="text-white font-medium">GPT-4 Turbo</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-slate-300">Status</span>
                        <span className="text-green-400 font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                          Online
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-slate-300">Accuracy</span>
                        <span className="text-blue-400 font-medium">94.7%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Insight Display */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Insight */}
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="pink" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Brain className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-pink-400 transition-all duration-300" />
                      <span className="group-hover:text-pink-100 transition-colors">AI Analysis</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {currentInsight
                        ? `Analysis of ${currentInsight.fileName}`
                        : isGenerating
                          ? 'AI is analyzing your data...'
                          : "Select a file and click 'Get AI Insight' to begin"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-center py-12">
                          <div className="relative">
                            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                            <Brain className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-medium mb-2">AI is processing your data...</p>
                          <p className="text-slate-400 text-sm">
                            Analyzing patterns, trends, and generating actionable insights
                          </p>
                        </div>
                      </div>
                    ) : currentInsight ? (
                      <div className="space-y-6">
                        {/* Summary */}
                        <div className="p-6 bg-slate-700/30 rounded-xl">
                          <h3 className="text-white font-semibold mb-3 flex items-center">
                            <Eye className="w-4 h-4 mr-2 text-blue-400" />
                            Executive Summary
                          </h3>
                          <ScrollArea className="h-32 hide-scrollbar">
                            <p className="text-slate-300 leading-relaxed">
                              <AnimatedText text={currentInsight.summary} isGenerating={false} />
                            </p>
                          </ScrollArea>
                        </div>

                        {/* Key Insights */}
                        <div>
                          <h3 className="text-white font-semibold mb-4 flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                            Key Insights
                          </h3>
                          <div className="space-y-3">
                            {currentInsight.keyInsights.map((insight, index) => {
                              const IconComponent = insight.icon;
                              return (
                                <div
                                  key={index}
                                  className={`p-4 rounded-xl border ${getInsightColor(insight.type)} hover:scale-105 transition-all duration-300`}
                                >
                                  <div className="flex items-center">
                                    <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="text-white font-medium">{insight.text}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <h3 className="text-white font-semibold mb-4 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-green-400" />
                            AI Recommendations
                          </h3>
                          <div className="space-y-2">
                            {currentInsight.recommendations.map((rec, index) => (
                              <div
                                key={index}
                                className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 group"
                              >
                                <div className="flex items-start">
                                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5 group-hover:scale-110 transition-transform">
                                    {index + 1}
                                  </div>
                                  <span className="text-slate-300 group-hover:text-white transition-colors">{rec}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">Ready for AI Analysis</h3>
                        <p className="text-slate-400">
                          Select a data file and click "Get AI Insight" to generate comprehensive analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* History Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="green" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Clock className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-green-400 transition-all duration-300" />
                      <span className="group-hover:text-green-100 transition-colors">Insight History</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">Previous AI analyses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96 hide-scrollbar">
                      <div className="space-y-4">
                        {insightHistory.map((insight) => (
                          <div
                            key={insight.id}
                            className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group"
                            onClick={() => setCurrentInsight(insight)}
                           >
                            <div className="flex items-center justify-between mb-2">
                              <FileSpreadsheet className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                              <span className="text-xs text-slate-500">{insight.timestamp}</span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-2 group-hover:text-blue-100 transition-colors truncate">
                              {insight.fileName}
                            </h4>
                            <p className="text-slate-400 text-xs line-clamp-3 group-hover:text-slate-300 transition-colors">
                              {insight.summary.substring(0, 100)}...
                            </p>
                            <div className="flex items-center mt-2 space-x-1">
                              {insight.keyInsights.slice(0, 3).map((keyInsight, index) => {
                                const IconComponent = getInsightIcon(keyInsight.type);
                                return (
                                  <IconComponent
                                    key={index}
                                    className="w-3 h-3 text-slate-500 group-hover:text-slate-400 transition-colors"
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
    </div>
    
  );
};

export default AIInsights;