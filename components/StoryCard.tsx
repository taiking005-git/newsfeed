
import React, { useState, useEffect, useRef } from 'react';
import { NewsArticle } from '../types';
import { ChevronUpIcon, HeartIcon, CommentIcon, ShareIcon, BookmarkIcon } from './Icons';
import { useBookmarks } from '../hooks/useBookmarks';

interface StoryCardProps {
  article: NewsArticle;
  isActive: boolean;
  onShowComments: () => void;
  onArticleUpdate: (articleId: number, update: Partial<NewsArticle>) => void;
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ article, isActive, onShowComments, onArticleUpdate, isAuthenticated, onAuthAction }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(error => console.error("Video play failed:", error));
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onAuthAction();
      return;
    }
    const newLikesCount = isLiked ? article.likes - 1 : article.likes + 1;
    setIsLiked(!isLiked);
    onArticleUpdate(article.id, { likes: newLikesCount });
  };
  
  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowComments();
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
  
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      onAuthAction();
      return;
    }
    toggleBookmark(article.id);
  };

  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {article.videoUrl ? (
        <video
          ref={videoRef}
          src={article.videoUrl}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          muted
          loop
        />
      ) : (
        <img
          src={article.imageUrl}
          alt={article.headline}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 text-white z-10 flex justify-between items-end">
        <div className="flex-1 pr-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-2" style={{textShadow: '0 2px 8px rgba(0,0,0,0.8)'}}>
              {article.headline}
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              {article.source} &middot; {article.publishedAgo}
            </p>
            <div className="flex flex-col items-start opacity-80 animate-pulse">
                <ChevronUpIcon className="w-6 h-6" />
                <span className="text-xs font-medium tracking-wider">TAP FOR SUMMARY</span>
            </div>
        </div>

        <div className="flex flex-col items-center space-y-6 text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
            <button onClick={handleLike} className="flex flex-col items-center">
                <HeartIcon className={`w-8 h-8 transition-colors ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                <span className="text-sm font-bold">{formatCount(article.likes)}</span>
            </button>
            <button onClick={handleCommentClick} className="flex flex-col items-center">
                <CommentIcon className="w-8 h-8" />
                <span className="text-sm font-bold">{formatCount(article.comments.length)}</span>
            </button>
            <button onClick={handleBookmarkClick} className="flex flex-col items-center">
                <BookmarkIcon 
                    className={`w-8 h-8 transition-colors ${isBookmarked(article.id) ? 'text-cyan-400' : ''}`} 
                    filled={isBookmarked(article.id)} 
                />
                <span className="text-sm font-bold">Save</span>
            </button>
             <button onClick={handleShareClick} className="flex flex-col items-center">
                <ShareIcon className="w-8 h-8" />
                <span className="text-sm font-bold">Share</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
