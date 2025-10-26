import React, { useState, useMemo } from 'react';
import { NewsArticle } from '../types';
import { ArrowLeftIcon, SearchIcon } from './Icons';

interface SearchResultsScreenProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  initialQuery: string;
}

type SortByType = 'relevance' | 'newest';

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({ isOpen, onClose, articles, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortByType>('relevance');

  const filteredAndSortedArticles = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();
    
    let filtered = query.trim() === ''
      ? []
      : articles.filter(article =>
          article.headline.toLowerCase().includes(lowerCaseQuery) ||
          article.fullContent.toLowerCase().includes(lowerCaseQuery)
        );

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    }
    // 'relevance' sort is the default order from the filter, which is sufficient for this example.

    return filtered;
  }, [query, articles, sortBy]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-gray-900 z-[70] flex flex-col transition-transform duration-300 ease-in-out"
      style={{ transform: isOpen ? 'translateX(0%)' : 'translateX(100%)' }}
    >
      <header className="flex-shrink-0 flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-gray-100"
            autoFocus
          />
        </div>
      </header>
      
      <div className="p-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600 dark:text-gray-400">Sort by:</span>
            <button
                onClick={() => setSortBy('relevance')}
                className={`px-3 py-1 text-sm font-medium rounded-full ${sortBy === 'relevance' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
                Relevance
            </button>
            <button
                onClick={() => setSortBy('newest')}
                className={`px-3 py-1 text-sm font-medium rounded-full ${sortBy === 'newest' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
                Newest
            </button>
        </div>
      </div>

      <main className="flex-grow overflow-y-auto">
        {query.trim() !== '' && filteredAndSortedArticles.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <h2 className="text-xl font-semibold">No results found</h2>
            <p>Try searching for something else.</p>
          </div>
        )}
        {query.trim() === '' && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <h2 className="text-xl font-semibold">Search for articles</h2>
            <p>Find news about topics that interest you.</p>
          </div>
        )}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAndSortedArticles.map(article => (
            <li key={article.id} className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
              <img src={article.imageUrl} alt="" className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-xs text-gray-500 dark:text-gray-400">{article.source}</p>
                <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{article.headline}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{article.publishedAgo}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default SearchResultsScreen;
