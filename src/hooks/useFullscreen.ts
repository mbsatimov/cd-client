import { useCallback, useEffect, useState } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exitRequested, setExitRequested] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setExitRequested(true);
        setTimeout(() => {
          if (exitRequested) {
            document.documentElement.requestFullscreen();
          }
        }, 100);
      } else {
        setIsFullscreen(!!document.fullscreenElement);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, exitRequested]);

  const toggleFullscreen = useCallback((value?: boolean) => {
    if (value === undefined) {
      value = !isFullscreen;
    }
    if (value) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const confirmExit = (confirm: boolean) => {
    if (confirm) {
      setExitRequested(false);
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setExitRequested(false);
    }
  };

  return { isFullscreen, exitRequested, toggleFullscreen, confirmExit };
};
