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

  // Fallback blog posts if none exist in storage
  const fallbackPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI in Enterprise Applications',
      excerpt: 'Exploring how artificial intelligence is transforming business operations and creating new opportunities for innovation.',
      content: 'Artificial intelligence has become a cornerstone of modern enterprise applications. From predictive analytics to automated customer service, AI is revolutionizing how businesses operate. In this comprehensive guide, we explore the latest trends, implementation strategies, and real-world case studies that demonstrate the transformative power of AI in enterprise settings.\n\nKey topics covered include:\n- Machine Learning Models for Business Intelligence\n- Natural Language Processing in Customer Support\n- Computer Vision for Quality Control\n- AI Ethics and Responsible Implementation\n\nAs we look toward the future, the integration of AI will continue to evolve, offering unprecedented opportunities for businesses to optimize operations and deliver exceptional customer experiences.',
      author: 'Dr. Sarah Mitchell',
      date: 'Jan 15, 2024',
      category: 'AI',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
      id: '2',
      title: 'Building Scalable Web Applications with Modern Frameworks',
      excerpt: 'A deep dive into React, Next.js, and microservices architecture for creating robust, scalable web solutions.',
      content: 'Modern web development requires a deep understanding of scalable architecture patterns. This article covers best practices for building applications that can grow with your business needs.\n\nWe discuss:\n- Component-based architecture with React\n- Server-side rendering with Next.js\n- Microservices design patterns\n- Database optimization strategies\n- Performance monitoring and optimization\n\nLearn how leading tech companies structure their applications for scale and maintainability.',
      author: 'Michael Chen',
      date: 'Jan 10, 2024',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'
    },
    {
      id: '3',
      title: 'Cloud Migration Strategies for Legacy Systems',
      excerpt: 'Practical guide to migrating on-premise infrastructure to cloud platforms while minimizing downtime and risks.',
      content: 'Migrating legacy systems to the cloud is one of the most critical decisions modern enterprises face. This comprehensive guide walks through proven strategies for successful cloud migration.\n\nTopics include:\n- Assessment and planning phases\n- Choosing the right cloud provider\n- Data migration best practices\n- Security and compliance considerations\n- Cost optimization techniques\n- Post-migration monitoring and optimization\n\nReal-world case studies demonstrate successful migration patterns and common pitfalls to avoid.',
      author: 'Rajesh Kumar',
      date: 'Jan 5, 2024',
      category: 'Cloud',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
    },
    {
      id: '4',
      title: 'Introduction to VLSI Design: From Concept to Silicon',
      excerpt: 'An educational overview of Very Large Scale Integration design principles and modern chip development workflows.',
      content: 'VLSI (Very Large Scale Integration) design is the foundation of modern electronics. This educational article provides an introduction to the fundamental concepts and processes involved in creating integrated circuits.\n\nWe cover:\n- Digital design fundamentals\n- RTL coding with Verilog\n- Synthesis and optimization\n- Physical design and layout\n- Verification methodologies\n- Industry tools and workflows\n\nPerfect for students and professionals looking to enter the semiconductor industry.',
      author: 'Prof. David Lee',
      date: 'Dec 28, 2023',
      category: 'VLSI',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    },
    {
      id: '5',
      title: 'Data Engineering Best Practices for Modern Analytics',
      excerpt: 'Building robust data pipelines and ETL processes to support real-time analytics and business intelligence.',
      content: 'Effective data engineering is crucial for organizations that rely on data-driven decision making. This article explores modern approaches to building and maintaining data infrastructure.\n\nKey areas covered:\n- ETL vs ELT architectures\n- Real-time streaming data processing\n- Data warehouse design patterns\n- Data quality and governance\n- Performance optimization techniques\n- Cloud-based data solutions\n\nLearn from industry experts about building scalable data pipelines that support your analytics needs.',
      author: 'Emily Rodriguez',
      date: 'Dec 20, 2023',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      id: '6',
      title: 'Cybersecurity in the Age of Cloud Computing',
      excerpt: 'Understanding security challenges and implementing best practices for protecting cloud-based applications and infrastructure.',
      content: 'As organizations move to the cloud, cybersecurity becomes more critical than ever. This article examines the unique security challenges of cloud computing and provides actionable strategies for protection.\n\nWe discuss:\n- Shared responsibility model\n- Identity and access management\n- Network security in cloud environments\n- Data encryption and key management\n- Compliance and regulatory requirements\n- Incident response and recovery\n\nStay ahead of threats with modern security practices tailored for cloud infrastructure.',
      author: 'James Wilson',
      date: 'Dec 15, 2023',
      category: 'Security',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80'
    }
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;
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

