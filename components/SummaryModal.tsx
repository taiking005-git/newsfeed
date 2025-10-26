
import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { CloseIcon, ShareIcon, BookmarkIcon } from './Icons';
import { summarizeArticle } from '../services/geminiService';
import { useBookmarks } from '../hooks/useBookmarks';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  onReadArticle: () => void;
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose, article, onReadArticle, isAuthenticated, onAuthAction }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    if (isOpen && article) {
      const fetchSummary = async () => {
        setIsLoading(true);
        setError('');
        setSummary('');
        try {
          const result = await summarizeArticle(article.fullContent);
          setSummary(result);
        } catch (err) {
          setError('Failed to generate summary. Please try again.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSummary();
    }
  }, [isOpen, article]);

  if (!isOpen || !article) return null;
  
  const handleBookmarkClick = () => {
    if (!isAuthenticated) {
      onAuthAction();
      return;
    }
    if (article) {
      toggleBookmark(article.id);
    }
  };

  const handleShareClick = async () => {
    if (!article) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.headline,
          text: `Check out this article from FlashFeed: ${article.headline}`,
          url: article.articleUrl,
        });
      } catch (error) {
        console.error("Error sharing article:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(article.articleUrl);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
        alert('Could not copy link to clipboard.');
      }
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-300 transform animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideInUp 0.3s ease-out forwards' }}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Quick Take</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">{article.headline}</h2>
          {isLoading && (
            <div className="space-y-4">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {summary && (
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: summary }} />
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button onClick={handleShareClick} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ShareIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                <button onClick={handleBookmarkClick} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <BookmarkIcon 
                      className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-colors ${isBookmarked(article.id) ? 'text-cyan-500 dark:text-cyan-400' : ''}`}
                      filled={isBookmarked(article.id)}
                    />
                </button>
            </div>
            <button
                onClick={onReadArticle}
                className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
                Read Full Article
            </button>
        </div>
      </div>
      <style>{`
        @keyframes slideInUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SummaryModal;
