
import React, { useState } from 'react';
import { NewsArticle, Comment } from '../types';
import { ArrowLeftIcon, ShareIcon, SendIcon } from './Icons';

interface ArticleViewProps {
  isOpen: boolean;
  article: NewsArticle | null;
  onClose: () => void;
  onArticleUpdate: (articleId: number, update: Partial<NewsArticle>) => void;
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ isOpen, article, onClose, onArticleUpdate, isAuthenticated, onAuthAction }) => {
  const [newComment, setNewComment] = useState('');

  if (!isOpen || !article) {
    return null;
  }

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    if (!isAuthenticated) {
      onAuthAction();
      return;
    }

    const newCommentObj: Comment = {
      id: Date.now(),
      author: 'You',
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
      text: newComment,
      timestamp: 'Just now',
    };

    const updatedComments = [...article.comments, newCommentObj];
    onArticleUpdate(article.id, { comments: updatedComments });
    setNewComment('');
  };

  const handleShare = async () => {
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
    <div 
      className="fixed inset-0 bg-white dark:bg-gray-900 z-[60] flex flex-col transition-transform duration-300 ease-in-out"
      style={{ transform: isOpen ? 'translateY(0%)' : 'translateY(100%)' }}
    >
      <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 truncate px-4">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{article.source}</p>
          <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{article.articleUrl}</a>
        </div>
        <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ShareIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </header>

      <main className="flex-grow overflow-y-auto">
        <article className="max-w-3xl mx-auto p-6 md:p-8 text-gray-900 dark:text-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">{article.headline}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">{article.source} &middot; {article.publishedAgo}</p>
          <p className="text-base leading-relaxed whitespace-pre-line">
            {article.fullContent}
          </p>
        </article>

        <section className="max-w-3xl mx-auto px-6 md:px-8 py-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{article.comments.length} Comments</h2>
          
          {isAuthenticated ? (
            <form onSubmit={handlePostComment} className="flex items-start space-x-3 mb-6">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704c" alt="Your avatar" className="w-10 h-10 rounded-full" />
              <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-100 dark:bg-gray-800 border-transparent rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button type="submit" className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors disabled:bg-gray-400">
                    <SendIcon className="w-6 h-6" />
                  </button>
              </div>
            </form>
          ) : (
            <div className="text-center p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 mb-6">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Want to join the conversation?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                  <button onClick={onAuthAction} className="text-cyan-500 font-bold hover:underline">Log in</button> to post a comment.
              </p>
            </div>
          )}


          {article.comments.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              Be the first to comment.
            </div>
          ) : (
            <ul className="space-y-4">
              {article.comments.map(comment => (
                <li key={comment.id} className="flex items-start space-x-3">
                  <img src={comment.avatarUrl} alt={comment.author} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{comment.author}</p>
                      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{comment.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default ArticleView;
