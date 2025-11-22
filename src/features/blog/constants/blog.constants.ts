import { BlogPost } from '../types/blog.types';

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Education',
    excerpt: 'Artificial Intelligence is reshaping how we learn, teach, and assess. From personalized learning paths to automated grading, the possibilities are endless.',
    content: `Artificial Intelligence is reshaping how we learn, teach, and assess. From personalized learning paths to automated grading, the possibilities are endless.

In the last decade, EdTech has moved from simple digitized classrooms to intelligent adaptive learning systems. AI models can now predict student performance, identify learning gaps, and suggest tailored resources.

At IMTDA, we believe in integrating these technologies into our internship programs to ensure students are not just users of AI, but creators of it.`,
    author: 'Kishore Gundu',
    date: 'Jan 15, 2025',
    category: 'AI & Tech',
    image: 'https://picsum.photos/800/400?random=100'
  },
  {
    id: '2',
    title: 'Top Skills for 2025 Engineering Graduates',
    excerpt: 'The job market is evolving. Here are the top technical and soft skills you need to stay relevant in the industry.',
    content: `The job market is evolving rapidly. With the rise of generative AI and automation, traditional coding roles are shifting towards system architecture and problem-solving.

1. **AI & Machine Learning**: Understanding the basics of LLMs and data pipelines.
2. **Full Stack Development**: The ability to build end-to-end solutions.
3. **Cloud Computing**: AWS, Azure, and Google Cloud are now standard requirements.
4. **Soft Skills**: Adaptability and communication are more important than ever.

Start preparing today to secure your future.`,
    author: 'Team IMTDA',
    date: 'Jan 20, 2025',
    category: 'Education',
    image: 'https://picsum.photos/800/400?random=101'
  },
  {
    id: '3',
    title: 'Understanding VLSI: From Logic to Layout',
    excerpt: 'A deep dive into the Very Large Scale Integration industry and why chip design is crucial for modern electronics.',
    content: `VLSI (Very Large Scale Integration) is the process of creating an integrated circuit (IC) by combining millions of MOS transistors onto a single chip.

As devices get smaller and faster, the demand for skilled VLSI engineers is skyrocketing. This post covers the flow from RTL design using Verilog to physical layout and verification.`,
    author: 'Tech Lead',
    date: 'Feb 02, 2025',
    category: 'Industry Trends',
    image: 'https://picsum.photos/800/400?random=102'
  }
];

