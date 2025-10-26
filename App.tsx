
import React, { useState, useEffect } from 'react';
import { newsArticles } from './constants';
import StoryViewer from './components/StoryViewer';
import Header from './components/Header';
import { NewsArticle } from './types';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import OnboardingFlow from './components/OnboardingFlow';
import SearchResultsScreen from './components/SearchResultsScreen';
import LoginScreen from './components/LoginScreen';
import BookmarkScreen from './components/BookmarkScreen';
import ProfileScreen from './components/ProfileScreen';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, login, logout } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  useEffect(() => {
    // Logic for showing onboarding is now dependent on isAuthenticated
    if (isAuthenticated) {
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      if (!onboardingComplete) {
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
    } else {
      setShowOnboarding(false);
    }

    // In a real app, you would fetch articles from an API here
    setArticles(newsArticles);
  }, [isAuthenticated]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };
  
  const handleLoginSuccess = () => {
    login();
    setIsLoginOpen(false);
  };

  if (isLoginOpen) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={() => setIsLoginOpen(false)} />;
  }

  if (isAuthenticated && showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`font-sans antialiased text-gray-900 dark:text-gray-100 ${theme}`}>
      <div className="relative h-screen w-screen overflow-hidden bg-black">
        {articles.length > 0 ? (
          <>
            <Header 
              onToggleTheme={toggleTheme} 
              currentTheme={theme} 
              onSearchClick={() => setIsSearchOpen(true)}
              onBookmarksClick={() => isAuthenticated ? setIsBookmarksOpen(true) : setIsLoginOpen(true)}
              onProfileClick={() => isAuthenticated ? setIsProfileOpen(true) : setIsLoginOpen(true)}
            />
            <StoryViewer
              initialArticles={articles}
              isAuthenticated={isAuthenticated}
              onAuthAction={() => setIsLoginOpen(true)}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Loading News...
          </div>
        )}
      </div>
      <SearchResultsScreen
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        initialQuery=""
      />
      <BookmarkScreen
        isOpen={isAuthenticated && isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        articles={articles}
      />
      <ProfileScreen
        isOpen={isAuthenticated && isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={logout}
      />
    </div>
  );
};

export default App;
