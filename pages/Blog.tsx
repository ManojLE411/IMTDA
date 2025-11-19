import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');

  const postsPerPage = 6;

  // Filter Logic
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = filterCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === filterCategory);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Scroll to top when viewing post
  const handleViewPost = (post: BlogPost) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBackToList}
            className="flex items-center text-imtda-primary font-semibold hover:underline mb-8"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Articles
          </button>

          <div className="mb-8">
            <span className="bg-blue-100 text-imtda-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm space-x-4 border-b border-gray-100 pb-8">
              <span className="flex items-center gap-2"><User size={16} /> {selectedPost.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {selectedPost.date}</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {selectedPost.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights & News</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest trends in AI, Technology, and Education.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setFilterCategory(cat); setCurrentPage(1); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-imtda-primary text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
              onClick={() => handleViewPost(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-md text-gray-800 shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  <Calendar size={14} /> {post.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-imtda-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-imtda-accent font-semibold text-sm">
                  Read Article <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${currentPage === 1 ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-600 border-gray-300 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-imtda-primary text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${currentPage === totalPages ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-600 border-gray-300 hover:bg-gray-100'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {currentPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
