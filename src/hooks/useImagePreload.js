import { useState, useEffect } from 'react';

export function useImagePreload(url) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!url) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    const img = new Image();
    let timeoutId;

    img.onload = () => {
      clearTimeout(timeoutId);
      setIsLoaded(true);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      // Fail gracefully and allow rendering
      setIsLoaded(true);
    };

    // 10-second timeout fallback to prevent permanent loading states
    timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 10000);

    img.src = url;

    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return isLoaded;
}