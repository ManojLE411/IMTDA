import React, { useState } from 'react';
import { BlogPost } from '@/types/blog.types';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { Loading, Tabs, Pagination, EmptyState, SectionHeader } from '@/components/ui';
import styles from './BlogPage.module.css';

export const BlogPage: React.FC = () => {
  const { posts, loading } = useBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');

  const displayPosts = posts || [];
  const postsPerPage = 6;

  if (loading) {
    return <Loading text="Loading..." fullScreen />;
  }

  // Filter Logic
  const categories = ['All', ...Array.from(new Set(displayPosts.map(p => p.category)))];
  const filteredPosts = filterCategory === 'All' 
    ? displayPosts 
    : displayPosts.filter(p => p.category === filterCategory);

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
      <div className={styles.postDetail}>
        <div className={styles.postDetailContent}>
          <button 
            onClick={handleBackToList}
            className={styles.backButton}
          >
            <ArrowLeft size={20} className={styles.backIcon} /> Back to Articles
          </button>

          <div className={styles.postHeader}>
            <span className={styles.postCategory}>
              {selectedPost.category}
            </span>
            <h1 className={styles.postTitle}>
              {selectedPost.title}
            </h1>
            <div className={styles.postMeta}>
              <span className={styles.postMetaItem}><User size={16} /> {selectedPost.author}</span>
              <span className={styles.postMetaItem}><Calendar size={16} /> {selectedPost.date}</span>
            </div>
          </div>

          <div className={styles.postImage}>
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
            />
          </div>

          <div className={styles.postContent}>
            {selectedPost.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        
        <SectionHeader
          title="Latest Insights & News"
          subtitle="Stay updated with the latest trends in AI, Technology, and Education."
          className={styles.header}
        />

        {/* Categories */}
        <Tabs
          tabs={categories.map(cat => ({ id: cat, label: cat }))}
          activeTab={filterCategory}
          onTabChange={(cat) => { setFilterCategory(cat); setCurrentPage(1); }}
          variant="pills"
          className={styles.categories}
        />

        {/* Grid */}
        <div className={styles.postsGrid}>
          {currentPosts.map(post => (
            <div 
              key={post.id} 
              className={styles.postCard}
              onClick={() => handleViewPost(post)}
            >
              <div className={styles.postImageContainer}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className={styles.postCardImage}
                />
                <div className={styles.postCardCategory}>
                  {post.category}
                </div>
              </div>
              <div className={styles.postCardContent}>
                <div className={styles.postCardDate}>
                  <Calendar size={14} /> {post.date}
                </div>
                <h3 className={styles.postCardTitle}>
                  {post.title}
                </h3>
                <p className={styles.postCardExcerpt}>
                  {post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
                </p>
                <div className={styles.postCardFooter}>
                  Read Article <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
            className={styles.pagination}
          />
        )}

        {filteredPosts.length === 0 && (
          <EmptyState
            type="empty"
            message="No posts found in this category."
            className={styles.emptyState}
          />
        )}
      </div>
    </div>
  );
};

