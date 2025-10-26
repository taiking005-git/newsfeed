
import React, { useMemo } from 'react';
import { NewsArticle } from '../types';
import { ArrowLeftIcon, BookmarkIcon } from './Icons';
import { useBookmarks } from '../hooks/useBookmarks';

interface BookmarkScreenProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
}

const BookmarkScreen: React.FC<BookmarkScreenProps> = ({ isOpen, onClose, articles }) => {
  const { bookmarkedIds, toggleBookmark } = useBookmarks();

  const bookmarkedArticles = useMemo(() => {
    const bookmarkedArticlesMap = new Map(articles.map(article => [article.id, article]));
    // Reverse to show most recently bookmarked first
    return Array.from(bookmarkedIds).map(id => bookmarkedArticlesMap.get(id)).filter((article): article is NewsArticle => article !== undefined).reverse();
  }, [bookmarkedIds, articles]);

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
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bookmarked Articles</h2>
      </header>

      <main className="flex-grow overflow-y-auto">
        {bookmarkedArticles.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <BookmarkIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold">No Bookmarks Yet</h2>
            <p>Tap the bookmark icon on an article to save it for later.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {bookmarkedArticles.map(article => (
              <li key={article.id} className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <img src={article.imageUrl} alt="" className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-grow">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{article.source}</p>
                  <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{article.headline}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{article.publishedAgo}</p>
                </div>
                <button onClick={() => toggleBookmark(article.id)} className="p-2 rounded-full text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <BookmarkIcon className="w-6 h-6" filled={true} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default BookmarkScreen;
