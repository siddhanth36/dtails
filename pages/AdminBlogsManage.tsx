import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { apiDelete, apiFetch } from "../src/lib/api";

type Blog = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
};

const AdminBlogsManage: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setError(null);
    try {
      const data = await apiFetch<Blog[]>("/api/blogs");
      setBlogs(data);
    } catch (e: any) {
      setError(e.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await apiDelete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (e: any) {
      setError(e.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Manage Blogs</h1>
          <button
            onClick={() => navigate("/admin/blogs/new")}
            className="bg-[#0020BF] hover:bg-[#0A2CFF] text-white px-5 py-2 rounded-xl"
          >
            + New Blog
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-400">No blogs found.</p>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between bg-white/10 border border-white/10 rounded-xl px-4 py-3"
              >
                <div>
                  <p className="text-white font-medium">{blog.title}</p>
                  <p className="text-gray-400 text-sm">{blog.slug}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      blog.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/blogs/edit/${blog.id}`)
                    }
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogsManage;
