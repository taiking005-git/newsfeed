
import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_STORAGE_KEY = 'flashfeed_bookmarks';

export const useBookmarks = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarkedIds(new Set(JSON.parse(storedBookmarks)));
      }
    } catch (error) {
      console.error("Failed to load bookmarks from localStorage", error);
    }
  }, []);

  const saveBookmarks = (ids: Set<number>) => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(ids)));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage", error);
    }
  };

  const toggleBookmark = useCallback((articleId: number) => {
    setBookmarkedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(articleId)) {
        newIds.delete(articleId);
      } else {
        newIds.add(articleId);
      }
      saveBookmarks(newIds);
      return newIds;
    });
  }, []);
  
  const isBookmarked = useCallback((articleId: number) => {
    return bookmarkedIds.has(articleId);
  }, [bookmarkedIds]);

  return { bookmarkedIds, toggleBookmark, isBookmarked };
};
