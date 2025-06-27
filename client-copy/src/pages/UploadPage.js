// client/src/pages/UploadPage.js
import React, { useState, useRef } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import MovingNetwork from '../components/MovingNetwork';
import MovingBorder from '../components/MovingBorder';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X, BarChart3, FileText, Database } from 'lucide-react';

// Toast Notification Component
const Toast = ({ message, type, show, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: FileText,
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-pink-500',
    info: 'from-blue-500 to-cyan-500',
  };

  const Icon = icons[type];

  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
      <div className="relative overflow-hidden rounded-2xl">
        <MovingBorder color={type === 'success' ? 'green' : type === 'error' ? 'orange' : 'blue'} />
        <div className="relative z-10 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl min-w-80">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl bg-gradient-to-r ${colors[type]} bg-opacity-20`}>
              <Icon
                className={`w-5 h-5 ${
                  type === 'success' ? 'text-green-400' : type === 'error' ? 'text-red-400' : 'text-blue-400'
                }`}
              />
            </div>
            <p className="text-white font-medium flex-1">{message}</p>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors hover:scale-110">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('ready');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [columnPreview, setColumnPreview] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info',
  });
  const fileInputRef = useRef(null);

  // Mock column data for preview
  const mockColumns = [
    'Product Name',
    'Category',
    'Price',
    'Quantity',
    'Revenue',
    'Date',
    'Customer ID',
    'Region',
    'Sales Rep',
    'Discount',
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
      setToast({
        show: true,
        message: 'Please upload only .xlsx or .xls files',
        type: 'error',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setToast({
        show: true,
        message: 'File size must be less than 10MB',
        type: 'error',
      });
      return;
    }

    setUploadedFile(file);
    setUploadStatus('ready');
    setColumnPreview([]);
  };

  const simulateUpload = async () => {
    if (!uploadedFile) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUploadStatus('uploaded');
    setColumnPreview(mockColumns);
    setToast({
      show: true,
      message: 'Excel file uploaded and processed successfully!',
      type: 'success',
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus('ready');
    setUploadProgress(0);
    setColumnPreview([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'ready':
        return 'text-blue-400';
      case 'uploading':
        return 'text-yellow-400';
      case 'uploaded':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'ready':
        return 'Ready';
      case 'uploading':
        return 'Uploading...';
      case 'uploaded':
        return 'Uploaded ✅';
      case 'error':
        return 'Error ❌';
      default:
        return 'Ready';
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

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Content */}
      <div className="relative z-20 pt-16 pl-4 overflow-y-auto" style={{ height: '100vh' }}>
        <div className="p-6 pb-20">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-4 shadow-xl border border-slate-700 transform group-hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">
              Upload Excel File
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Start by uploading your spreadsheet for analysis. We support .xlsx and .xls formats.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Area - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="blue" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Upload className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300" />
                      <span className="group-hover:text-blue-100 transition-colors">File Upload</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Drag and drop your Excel file or click to browse
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Drag and Drop Area */}
                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                        dragActive
                          ? 'border-blue-400 bg-blue-500/10 scale-105'
                          : uploadedFile
                            ? 'border-green-400 bg-green-500/10'
                            : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/20'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploadStatus === 'uploading'}
                      />

                      {!uploadedFile ? (
                        <div className="space-y-6">
                          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                            <Upload className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Drop your Excel file here</h3>
                            <p className="text-slate-400 mb-4">
                              or <span className="text-blue-400 font-medium">click to browse</span>
                            </p>
                            <p className="text-sm text-slate-500">Supports .xlsx and .xls files up to 10MB</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* File Info */}
                          <div className="flex items-center justify-center space-x-4 p-6 bg-slate-700/30 rounded-xl">
                            <div className="p-3 bg-green-500/20 rounded-xl">
                              <FileSpreadsheet className="w-8 h-8 text-green-400" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="text-white font-medium text-lg">{uploadedFile.name}</h4>
                              <p className="text-slate-400">{formatFileSize(uploadedFile.size)}</p>
                              <p className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</p>
                            </div>
                            <button
                              onClick={removeFile}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                              disabled={uploadStatus === 'uploading'}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Progress Bar */}
                          {uploadStatus === 'uploading' && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Uploading...</span>
                                <span className="text-blue-400">{uploadProgress}%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Upload Button */}
                          {uploadStatus === 'ready' && (
                            <Button
                              onClick={simulateUpload}
                              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-0"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload File
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Column Preview Panel */}
            <div className="space-y-6">
              {/* File Stats */}
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="green" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Database className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-green-400 transition-all duration-300" />
                      <span className="group-hover:text-green-100 transition-colors">File Info</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                        <span className="text-slate-400">Status</span>
                        <span className={`font-medium ${getStatusColor()}`}>{getStatusText()}</span>
                      </div>
                      {uploadedFile && (
                        <>
                          <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                            <span className="text-slate-400">Size</span>
                            <span className="text-white font-medium">{formatFileSize(uploadedFile.size)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                            <span className="text-slate-400">Type</span>
                            <span className="text-white font-medium">
                              {uploadedFile.name.split('.').pop()?.toUpperCase()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Column Preview */}
              {columnPreview.length > 0 && (
                <div className="relative overflow-hidden rounded-2xl">
                  <MovingBorder color="purple" />
                  <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center group">
                        <FileText className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                        <span className="group-hover:text-purple-100 transition-colors">Column Preview</span>
                      </CardTitle>
                      <CardDescription className="text-slate-400">Detected columns in your spreadsheet</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-slate-400 mb-4">Found {columnPreview.length} columns</p>
                        <div className="flex flex-wrap gap-2">
                          {columnPreview.map((column, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium rounded-full hover:scale-105 hover:bg-purple-500/30 transition-all duration-200 cursor-default"
                            >
                              {column}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Next Steps */}
              {uploadStatus === 'uploaded' && (
                <div className="relative overflow-hidden rounded-2xl">
                  <MovingBorder color="orange" />
                  <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center group">
                        <CheckCircle className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:text-green-400 transition-all duration-300" />
                        <span className="group-hover:text-green-100 transition-colors">Next Steps</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full justify-start bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Generate Charts
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white hover:scale-105 transition-all duration-300"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Data Preview
                        </Button>
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

export default UploadPage;