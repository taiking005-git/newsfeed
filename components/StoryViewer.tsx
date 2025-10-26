
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NewsArticle, Comment } from '../types';
import StoryCard from './StoryCard';
import SummaryModal from './SummaryModal';
import ArticleView from './ArticleView';
import CommentsPage from './CommentsPage';
import { RefreshIcon } from './Icons';

interface StoryViewerProps {
  initialArticles: NewsArticle[];
  isAuthenticated: boolean;
  onAuthAction: () => void;
}

const STORY_DURATION = 5000;
const PULL_THRESHOLD = 80;

const StoryViewer: React.FC<StoryViewerProps> = ({ initialArticles, isAuthenticated, onAuthAction }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalState, setModalState] = useState({ summary: false, article: false, comments: false });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullPosition, setPullPosition] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const touchStartY = useRef(0);

  const currentArticle = articles[currentStoryIndex];

  const goToNextStory = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % articles.length);
  }, [articles.length]);

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
    startTimeRef.current = Date.now();
  
    const isModalOpen = modalState.summary || modalState.article || modalState.comments;

    const tick = () => {
      if (!isPaused && !isModalOpen) {
        const elapsedTime = Date.now() - startTimeRef.current;
        const newProgress = (elapsedTime / STORY_DURATION) * 100;
  
        if (newProgress >= 100) {
          goToNextStory();
        } else {
          progressRef.current = newProgress;
          setProgress(newProgress);
        }
      }
    };
  
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(tick, 50);
  
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStoryIndex, isPaused, goToNextStory, modalState]);
  

  const handleInteractionStart = () => {
    setIsPaused(true);
    if(timerRef.current) clearInterval(timerRef.current);
  };

  const handleInteractionEnd = () => {
    const isModalOpen = modalState.summary || modalState.article || modalState.comments;
    if (!isModalOpen) {
      startTimeRef.current = Date.now() - (progressRef.current / 100) * STORY_DURATION;
      setIsPaused(false);
    }
  };
  
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const isModalOpen = modalState.summary || modalState.article || modalState.comments;
    if (isModalOpen) return;

    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const tapPosition = (clientX - left) / width;

    if (tapPosition < 0.3) {
      goToPreviousStory();
    } else if (tapPosition > 0.7) {
      goToNextStory();
    } else {
        setIsPaused(true);
        setModalState({ ...modalState, summary: true });
    }
  };
  
  const closeAllModalsAndResume = () => {
    setModalState({ summary: false, article: false, comments: false });
    setIsPaused(false);
    startTimeRef.current = Date.now() - (progressRef.current / 100) * STORY_DURATION;
  };

  const handleArticleUpdate = (articleId: number, update: Partial<NewsArticle>) => {
    setArticles(prevArticles => prevArticles.map(art => 
      art.id === articleId ? { ...art, ...update } : art
    ));
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isRefreshing) return;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === 0 || isRefreshing) return;

    const touchY = e.targetTouches[0].clientY;
    let pullDistance = touchY - touchStartY.current;

    if (pullDistance < 0) pullDistance = 0;

    const dampedDistance = Math.pow(pullDistance, 0.8);
    setPullPosition(dampedDistance);
  };

  const handleTouchEnd = () => {
    if (isRefreshing) return;

    if (pullPosition > PULL_THRESHOLD) {
      handleRefresh();
    } else {
      setPullPosition(0);
    }
    touchStartY.current = 0;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPullPosition(60); 

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newArticle: NewsArticle = {
      id: Date.now(),
      headline: "BREAKING: Global Internet Outage Averted by Flock of Pigeons",
      source: "Avian Network News",
      publishedAgo: "Just now",
      publishedDate: new Date().toISOString(),
      imageUrl: "https://picsum.photos/seed/pigeon/1080/1920",
      fullContent: "In a stunning turn of events, a critical trans-atlantic fiber optic cable, damaged by a rogue anchor, was reportedly repaired by a flock of specially-trained pigeons. The birds, part of a secret government project codenamed 'Project Wing-Span,' carried micro-splicing equipment to the remote location, preventing a catastrophic internet outage. Officials are tight-lipped, but sources say the pigeons were rewarded with artisanal bread.",
      articleUrl: "https://example.com/pigeon-internet-saviors",
      likes: Math.floor(Math.random() * 20000) + 5000,
      comments: [],
    };

    setArticles(prev => [newArticle, ...prev]);
    setCurrentStoryIndex(0);
    setProgress(0);
    
    setIsRefreshing(false);
    setPullPosition(0);
  };
  
  const isModalOpen = modalState.summary || modalState.article || modalState.comments;

  return (
    <div 
      className="w-full h-full relative"
      onTouchStart={isModalOpen ? undefined : handleTouchStart}
      onTouchMove={isModalOpen ? undefined : handleTouchMove}
      onTouchEnd={isModalOpen ? undefined : handleTouchEnd}
    >
      <div 
        className="absolute top-5 left-0 right-0 z-30 flex justify-center items-center pointer-events-none"
        style={{ 
          opacity: Math.min(pullPosition / PULL_THRESHOLD, 1),
          transition: 'opacity 0.2s ease-out'
        }}
      >
        <RefreshIcon 
          className={`w-8 h-8 text-white transition-transform ${isRefreshing ? 'animate-spin' : ''}`}
          style={{ transform: `rotate(${pullPosition * 2.5}deg)` }}
        />
      </div>

      <div 
        className="w-full h-full"
        style={{
          transform: `translateY(${pullPosition}px)`,
          transition: pullPosition === 0 && !isRefreshing ? 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
        }}
      >
        <div className="absolute top-4 left-0 right-0 z-20 px-2 flex space-x-1">
          {articles.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: `${index < currentStoryIndex ? 100 : index === currentStoryIndex ? progress : 0}%`,
                  transition: index === currentStoryIndex && progress > 0.1 ? 'width 50ms linear' : 'none',
                }}
              />
            </div>
          ))}
        </div>

        <div 
          className="w-full h-full"
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onClick={handleTap}
        >
          {articles.map((article, index) => (
            <StoryCard
              key={article.id}
              article={article}
              isActive={index === currentStoryIndex}
              onShowComments={() => {
                if (isAuthenticated) {
                  setModalState({ ...modalState, comments: true });
                } else {
                  onAuthAction();
                }
              }}
              onArticleUpdate={handleArticleUpdate}
              isAuthenticated={isAuthenticated}
              onAuthAction={onAuthAction}
            />
          ))}
        </div>
      </div>
      
      <SummaryModal 
        isOpen={modalState.summary}
        onClose={closeAllModalsAndResume}
        article={currentArticle}
        onReadArticle={() => setModalState({ summary: false, article: true, comments: false })}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
      />

      <ArticleView
        isOpen={modalState.article}
        onClose={() => setModalState({ summary: true, article: false, comments: false })}
        article={currentArticle}
        onArticleUpdate={handleArticleUpdate}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
      />

      <CommentsPage
        isOpen={modalState.comments}
        onClose={() => {
            setModalState({ ...modalState, comments: false });
            setIsPaused(false);
            startTimeRef.current = Date.now() - (progressRef.current / 100) * STORY_DURATION;
        }}
        article={currentArticle}
        onArticleUpdate={handleArticleUpdate}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
      />
    </div>
  );
};

export default StoryViewer;
