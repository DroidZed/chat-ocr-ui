import { useEffect, useRef } from 'react';

/**
 * Hook to automatically cleanup object URLs on unmount
 * Tracks all object URLs created and revokes them when component unmounts
 */
export const useObjectUrlCleanup = () => {
  const objectUrlsRef = useRef<Set<string>>(new Set());

  const registerUrl = (url: string) => {
    objectUrlsRef.current.add(url);
  };

  const unregisterUrl = (url: string) => {
    if (objectUrlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      objectUrlsRef.current.delete(url);
    }
  };

  const createObjectUrl = (blob: Blob | MediaSource): string => {
    const url = URL.createObjectURL(blob);
    registerUrl(url);
    return url;
  };

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrlsRef.current.clear();
    };
  }, []);

  return {
    createObjectUrl,
    registerUrl,
    unregisterUrl,
  };
};
