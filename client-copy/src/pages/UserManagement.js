// client/src/pages/UserManagement.js
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import MovingNetwork from '../components/MovingNetwork';
import MovingBorder from '../components/MovingBorder';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Users, Search, Trash2, Ban, CheckCircle, Shield, UserCheck, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

// Table Components
const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="w-full">{children}</table>
  </div>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children, className }) => <tr className={className}>{children}</tr>;
const TableHead = ({ children, className }) => <th className={`p-3 text-left ${className}`}>{children}</th>;
const TableCell = ({ children, className }) => <td className={`p-3 ${className}`}>{children}</td>;

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-02-20',
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'User',
      status: 'Blocked',
      joinDate: '2024-01-08',
      lastActive: '1 week ago',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-03-10',
      lastActive: '5 minutes ago',
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      email: 'alex.r@company.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-12-05',
      lastActive: '30 minutes ago',
    },
    {
      id: 6,
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-02-28',
      lastActive: '3 hours ago',
    },
    {
      id: 7,
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'User',
      status: 'Blocked',
      joinDate: '2024-01-22',
      lastActive: '2 weeks ago',
    },
    {
      id: 8,
      name: 'Jennifer Lee',
      email: 'jennifer.lee@company.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-03-05',
      lastActive: '1 hour ago',
    },
  ]);

  const usersPerPage = 6;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered users
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' } : user
      )
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
          <Ban className="w-3 h-3 mr-1" />
          Blocked
        </span>
      );
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'Admin') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
          <UserCheck className="w-3 h-3 mr-1" />
          User
        </span>
      );
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
       <div className="relative z-20 pt-16 pl-4 overflow-y-auto" style={{ height: '100vh' }}>
        <div className="p-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-xl border border-slate-700 transform group-hover:scale-105 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">
              User Management
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Manage and moderate all registered users in your platform.
            </p>
          </div>

          
          {/* Search and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Search Bar */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl">
              <MovingBorder color="blue" />
              <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="relative overflow-hidden rounded-2xl">
              <MovingBorder color="green" />
              <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-white">{users.length}</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <MovingBorder color="orange" />
              <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Users</p>
                      <p className="text-2xl font-bold text-white">
                        {users.filter((user) => user.status === 'Active').length}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-500/20 rounded-xl">
                      <UserCheck className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Users Table */}
          <div className="relative overflow-hidden rounded-2xl">
            <MovingBorder color="purple" />
            <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-500 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center group">
                  <Users className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                  <span className="group-hover:text-purple-100 transition-colors">All Users</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Showing {paginatedUsers.length} of {filteredUsers.length} users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/30">
                      <TableHead className="text-slate-300 font-semibold">Name</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Email</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Role</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Last Active</TableHead>
                      <TableHead className="text-slate-300 font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className={`border-slate-700 hover:bg-slate-700/30 transition-all duration-300 ${
                          index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
                        }`}
                      >
                        <TableCell className="text-white font-medium">{user.name}</TableCell>
                        <TableCell className="text-slate-300">{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-slate-400">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleUserStatus(user.id)}
                              className={`h-8 px-3 transition-all duration-300 hover:scale-105 ${
                                user.status === 'Active'
                                  ? 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/20'
                                  : 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30 hover:shadow-lg hover:shadow-green-500/20'
                              }`}
                            >
                              {user.status === 'Active' ? (
                                <>
                                  <Ban className="w-3 h-3 mr-1" />
                                  Block
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Unblock
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteUser(user)}
                              className="h-8 px-3 bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 transition-all duration-300"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-sm">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Confirm Deletion</h3>
          <p className="text-slate-400 mb-6">
            Are you sure you want to delete <span className="font-semibold text-white">{userToDelete?.name}</span>?
            This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              className="flex-1 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500 hover:scale-105 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
 </div>
 </div>
</div>
  );
};

export default UserManagement;