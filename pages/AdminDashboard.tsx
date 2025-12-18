import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, LogOut, FileText, Layers, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../src/lib/api";

type Blog = {
  id: string;
  published: boolean;
};

type CaseStudy = {
  id: string;
  published: boolean;
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [caseLoading, setCaseLoading] = useState(true);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [caseError, setCaseError] = useState<string | null>(null);

  useEffect(() => {
    setBlogLoading(true);
    apiFetch<Blog[]>("/api/blogs")
      .then(setBlogs)
      .catch((err) => setBlogError(err.message || "Failed to load blogs"))
      .finally(() => setBlogLoading(false));
  }, []);

  useEffect(() => {
    setCaseLoading(true);
    apiFetch<CaseStudy[]>("/api/case-studies")
      .then(setCases)
      .catch((err) => setCaseError(err.message || "Failed to load case studies"))
      .finally(() => setCaseLoading(false));
  }, []);

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.published).length;
  const draftBlogs = totalBlogs - publishedBlogs;

  const totalCases = cases.length;
  const publishedCases = cases.filter((c) => c.published).length;
  const draftCases = totalCases - publishedCases;

  const totalContent = totalBlogs + totalCases;
  const isLoading = blogLoading || caseLoading;

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
                <p className="text-white text-sm">Total Posts: {blogLoading ? "Loading..." : totalBlogs}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Published: {blogLoading ? "Loading..." : publishedBlogs}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Drafts: {blogLoading ? "Loading..." : draftBlogs}</p>
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
              <button
                onClick={() => navigate('/admin/case-studies/new')}
                className="p-2 bg-[#0020BF] hover:bg-[#0A2CFF] rounded-lg transition-all"
              >
                <Plus className="text-white" size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Create, edit, and manage case studies
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Total Case Studies: {caseLoading ? "Loading..." : totalCases}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Published: {caseLoading ? "Loading..." : publishedCases}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-white text-sm">Drafts: {caseLoading ? "Loading..." : draftCases}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/case-studies/manage')}
              className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
            >
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
          {(blogError || caseError) && (
            <p className="text-sm text-red-300 mb-4">
              {blogError || caseError}
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">{isLoading ? "Loading..." : totalContent}</p>
              <p className="text-gray-400 text-sm">Total Content</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">{blogLoading ? "Loading..." : totalBlogs}</p>
              <p className="text-gray-400 text-sm">Blog Posts</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">{caseLoading ? "Loading..." : totalCases}</p>
              <p className="text-gray-400 text-sm">Case Studies</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center">
              <p className="text-2xl font-bold text-white">{blogLoading || caseLoading ? "Loading..." : draftBlogs + draftCases}</p>
              <p className="text-gray-400 text-sm">Drafts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
