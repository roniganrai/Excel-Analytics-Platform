// client/src/pages/ChartGeneration.js
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import MovingNetwork from '../components/MovingNetwork';
import MovingBorder from '../components/MovingBorder';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { BarChart3, LineChart, PieChart, ScatterChartIcon as Scatter3D, Download, Play, FileSpreadsheet, Settings, Zap, Palette } from 'lucide-react';

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

// Chart Placeholder Component
const ChartPlaceholder = ({ chartType, isRendering }) => {
  const getChartIcon = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart3 className="w-16 h-16 text-blue-400" />;
      case 'line':
        return <LineChart className="w-16 h-16 text-green-400" />;
      case 'pie':
        return <PieChart className="w-16 h-16 text-purple-400" />;
      case 'scatter':
        return <Scatter3D className="w-16 h-16 text-orange-400" />;
      default:
        return <BarChart3 className="w-16 h-16 text-slate-400" />;
    }
  };

  return (
    <div className="w-full h-96 flex items-center justify-center bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-600 relative overflow-hidden">
      {isRendering && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      )}
      <div className="text-center space-y-4">
        <div className={`transition-all duration-500 ${isRendering ? 'animate-spin' : 'hover:scale-110'}`}>
          {getChartIcon()}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {isRendering ? 'Generating Chart...' : 'Chart Preview'}
          </h3>
          <p className="text-slate-400">
            {isRendering
              ? 'Please wait while we create your visualization'
              : chartType
                ? `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart will appear here`
                : 'Select your data and chart type to preview'}
          </p>
        </div>
      </div>
    </div>
  );
};

const ChartGeneration = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [chartType, setChartType] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [is3DMode, setIs3DMode] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  // Mock data for uploaded files
  const uploadedFiles = [
    'Sales_Q4_2024.xlsx',
    'Marketing_Data.xlsx',
    'Financial_Report.xlsx',
    'Customer_Analytics.xlsx',
    'Product_Performance.xlsx',
  ];

  // Mock column data that changes based on selected file
  const getColumnsForFile = (fileName) => {
    const columnSets = {
      'Sales_Q4_2024.xlsx': ['Date', 'Product', 'Revenue', 'Quantity', 'Region', 'Sales Rep'],
      'Marketing_Data.xlsx': ['Campaign', 'Impressions', 'Clicks', 'Conversions', 'Cost', 'ROI'],
      'Financial_Report.xlsx': ['Month', 'Income', 'Expenses', 'Profit', 'Category', 'Department'],
      'Customer_Analytics.xlsx': ['Customer ID', 'Age', 'Purchase Amount', 'Frequency', 'Satisfaction', 'Segment'],
      'Product_Performance.xlsx': ['Product Name', 'Units Sold', 'Rating', 'Price', 'Category', 'Launch Date'],
    };
    return columnSets[fileName] || [];
  };

  const availableColumns = selectedFile ? getColumnsForFile(selectedFile) : [];

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'line', label: 'Line Chart', icon: LineChart },
    { value: 'pie', label: 'Pie Chart', icon: PieChart },
    { value: 'scatter', label: 'Scatter Plot', icon: Scatter3D },
  ];

  const handleRenderChart = async () => {
    if (!selectedFile || !chartType || !xAxis || !yAxis) return;

    setIsRendering(true);
    // Simulate chart generation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsRendering(false);
  };

  const handleDownloadChart = () => {
    // Simulate download
    console.log('Downloading chart as PNG...');
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log('Downloading chart as PDF...');
  };

  const canRenderChart = selectedFile && chartType && xAxis && yAxis;

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
       <div className="relative z-20 pt-16 pl-4 overflow-y-auto" style={{ height: '100vh' }}>
        <div className="p-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 shadow-xl border border-slate-700 transform group-hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">
              Generate Charts
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Select data from a previously uploaded Excel file to visualize.
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
                  </CardContent>
                </Card>
              </div>

              {/* Chart Configuration */}
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="purple" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Settings className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                      <span className="group-hover:text-purple-100 transition-colors">Chart Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Chart Type</label>
                      <Select value={chartType} onValueChange={setChartType}>
                        <SelectItem value="">Select chart type</SelectItem>
                        {chartTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">X-Axis</label>
                      <Select value={xAxis} onValueChange={setXAxis} disabled={!selectedFile}>
                        <SelectItem value="">Select X-axis column</SelectItem>
                        {availableColumns.map((column) => (
                          <SelectItem key={column} value={column}>
                            {column}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Y-Axis</label>
                      <Select value={yAxis} onValueChange={setYAxis} disabled={!selectedFile}>
                        <SelectItem value="">Select Y-axis column</SelectItem>
                        {availableColumns.map((column) => (
                          <SelectItem key={column} value={column}>
                            {column}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* 3D Toggle */}
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300 font-medium">3D Mode</span>
                      <button
                        onClick={() => setIs3DMode(!is3DMode)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          is3DMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-600'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                            is3DMode ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleRenderChart}
                  disabled={!canRenderChart || isRendering}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 border-0 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isRendering ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Rendering...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Render Chart
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDownloadChart}
                  disabled={!canRenderChart}
                  variant="outline"
                  className="w-full h-12 bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white hover:shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download PNG
                </Button>

                <Button
                  onClick={handleDownloadPDF}
                  disabled={!canRenderChart}
                  variant="outline"
                  className="w-full h-12 bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Chart Display Area */}
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="green" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between group">
                      <div className="flex items-center">
                        <Palette className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-green-400 transition-all duration-300" />
                        <span className="group-hover:text-green-100 transition-colors">Chart Preview</span>
                      </div>
                      {is3DMode && (
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium rounded-full">
                          3D Mode
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {selectedFile
                        ? `Visualizing data from ${selectedFile}`
                        : 'Select your data source and chart configuration'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ChartPlaceholder chartType={chartType} isRendering={isRendering} />
                  </CardContent>
                </Card>
              </div>

              {/* Chart Info */}
              {canRenderChart && (
                <div className="mt-6 relative overflow-hidden rounded-2xl">
                  <MovingBorder color="orange" />
                  <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center group">
                        <Zap className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-orange-400 transition-all duration-300" />
                        <span className="group-hover:text-orange-100 transition-colors">Chart Configuration</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400 text-sm">Data Source</p>
                          <p className="text-white font-medium truncate">{selectedFile}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400 text-sm">Chart Type</p>
                          <p className="text-white font-medium capitalize">{chartType}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400 text-sm">X-Axis</p>
                          <p className="text-white font-medium">{xAxis}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400 text-sm">Y-Axis</p>
                          <p className="text-white font-medium">{yAxis}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
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

export default ChartGeneration;