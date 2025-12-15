import React from "react";
import { motion } from "framer-motion";
import { Shield, LogOut, FileText, Layers, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0020BF]/20 flex items-center justify-center">
              <Shield className="text-[#0020BF]" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">DTales Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome, Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all border border-white/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Blog Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(28px) saturate(160%)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            className="p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <FileText className="text-blue-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Blog Management</h2>
              </div>
              <button 
                onClick={() => navigate('/admin/blogs/new')}
                className="p-2 bg-[#0020BF] hover:bg-[#0A2CFF] rounded-lg transition-all"
              >
                <Plus className="text-white" size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Create, edit, and manage blog posts
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Total Posts: 8</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Published: 8</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Drafts: 0</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/admin/blogs/manage')}
              className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
            >
              Manage Blogs
            </button>
          </motion.div>

          {/* Case Studies Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(28px) saturate(160%)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
            className="p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Layers className="text-purple-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Case Studies Management</h2>
              </div>
              <button className="p-2 bg-[#0020BF] hover:bg-[#0A2CFF] rounded-lg transition-all">
                <Plus className="text-white" size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Create, edit, and manage case studies
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Total Case Studies: 3</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Published: 3</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Drafts: 0</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium">
              Manage Case Studies
            </button>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(28px) saturate(160%)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          className="p-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">11</p>
              <p className="text-gray-400 text-sm">Total Content</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-gray-400 text-sm">Blog Posts</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-gray-400 text-sm">Case Studies</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Drafts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
