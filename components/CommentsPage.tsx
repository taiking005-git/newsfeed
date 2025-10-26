
import React, { useState, useEffect } from 'react';
import { NewsArticle, Comment } from '../types';
import { CloseIcon, SendIcon } from './Icons';

interface CommentsPageProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  onArticleUpdate: (articleId: number, update: Partial<NewsArticle>) => void;
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const CommentsPage: React.FC<CommentsPageProps> = ({ isOpen, onClose, article, onArticleUpdate, isAuthenticated, onAuthAction }) => {
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNewComment('');
    }
  }, [isOpen]);

  if (!isOpen || !article) return null;

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-300 transform"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease-out' }}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 relative">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{article.comments.length} Comments</h3>
          <button onClick={onClose} className="absolute right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="p-4 overflow-y-auto flex-grow">
          {article.comments.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
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
        </main>

        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          {isAuthenticated ? (
            <form onSubmit={handlePostComment} className="flex items-center space-x-2">
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
            </form>
          ) : (
             <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <button onClick={onAuthAction} className="text-cyan-500 font-bold hover:underline">Log in</button> or <button onClick={onAuthAction} className="text-cyan-500 font-bold hover:underline">sign up</button> to comment.
                </p>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default CommentsPage;
