

import React from 'react';
import { SearchIcon, ProfileIcon, SunIcon, MoonIcon, BookmarkIcon } from './Icons';

interface HeaderProps {
    onToggleTheme: () => void;
    currentTheme: 'light' | 'dark';
    onSearchClick: () => void;
    onBookmarksClick: () => void;
    onProfileClick: () => void;
}

const categories = ["For You", "Top Stories", "World", "Tech"];

const Header: React.FC<HeaderProps> = ({ onToggleTheme, currentTheme, onSearchClick, onBookmarksClick, onProfileClick }) => {
    const [activeCategory, setActiveCategory] = React.useState("For You");

    return (
        <header className="absolute top-0 left-0 right-0 z-20 text-white p-4 pt-6">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold font-display text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>FlashFeed</h1>
                <div className="flex items-center space-x-4">
                    <button onClick={onSearchClick}>
                        <SearchIcon className="w-6 h-6" />
                    </button>
                    <button onClick={onToggleTheme}>
                        {currentTheme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                    </button>
                    <button onClick={onBookmarksClick}>
                        <BookmarkIcon className="w-6 h-6" />
                    </button>
                    <button onClick={onProfileClick}>
                        <ProfileIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="flex space-x-6">
                {categories.map(category => (
                    <button 
                        key={category} 
                        onClick={() => setActiveCategory(category)}
                        className={`text-sm font-medium transition-colors duration-200 ${activeCategory === category ? 'text-white' : 'text-gray-300/80'}`}
                    >
                        {category}
                        {activeCategory === category && (
                            <div className="h-0.5 bg-cyan-400 mt-1 rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </header>
    );
};

export default Header;
