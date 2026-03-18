import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rss, 
  TrendingUp, 
  GraduationCap, 
  Briefcase, 
  Lightbulb, 
  Bookmark, 
  Share2, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const FEED_ITEMS = [
  {
    id: 1,
    type: 'news',
    category: 'Technology',
    title: 'AI is changing how software engineers write code',
    source: 'TechCrunch',
    time: '2 hours ago',
    image: 'https://picsum.photos/seed/tech/800/400',
    tags: ['AI', 'Software Engineering', 'Future of Work']
  },
  {
    id: 2,
    type: 'opportunity',
    category: 'Internship',
    title: 'Summer 2026 High School Engineering Internship',
    source: 'Google',
    time: '5 hours ago',
    image: 'https://picsum.photos/seed/office/800/400',
    tags: ['High School', 'Paid', 'Remote Option']
  },
  {
    id: 3,
    type: 'scholarship',
    category: 'Scholarship',
    title: 'Women in STEM Memorial Scholarship ($5,000)',
    source: 'STEM Foundation',
    time: '1 day ago',
    image: 'https://picsum.photos/seed/study/800/400',
    tags: ['STEM', 'College Prep', 'Deadline: May 1']
  },
  {
    id: 4,
    type: 'innovation',
    category: 'Design',
    title: 'The rise of spatial computing in UX design',
    source: 'Smashing Magazine',
    time: '2 days ago',
    image: 'https://picsum.photos/seed/design/800/400',
    tags: ['UX/UI', 'AR/VR', 'Design Trends']
  }
];

export default function InsightsFeed() {
  const [activeFilter, setActiveFilter] = useState('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'news': return <TrendingUp className="w-4 h-4" />;
      case 'opportunity': return <Briefcase className="w-4 h-4" />;
      case 'scholarship': return <GraduationCap className="w-4 h-4" />;
      case 'innovation': return <Lightbulb className="w-4 h-4" />;
      default: return <Rss className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-100 text-blue-700';
      case 'opportunity': return 'bg-emerald-100 text-emerald-700';
      case 'scholarship': return 'bg-amber-100 text-amber-700';
      case 'innovation': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Your Daily Insights</h1>
            <p className="text-slate-500 dark:text-slate-400">Curated opportunities based on your Software Engineering & Design interests.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search feed..." 
                className="pl-9 pr-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 w-full md:w-64 text-slate-900 dark:text-white"
              />
            </div>
            <button className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 hide-scrollbar">
          {['all', 'news', 'opportunity', 'scholarship', 'innovation'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
                activeFilter === filter 
                  ? 'bg-slate-900 dark:bg-brand-50 text-white dark:text-slate-900' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {FEED_ITEMS.filter(item => activeFilter === 'all' || item.type === activeFilter).map((item, idx) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-brand-50/90 dark:bg-slate-900/90 shadow-sm ${getColor(item.type).split(' ')[1]} dark:text-opacity-90`}>
                      {getIcon(item.type)}
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.source} • {item.time}</span>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1">
                      Read Full Story
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
