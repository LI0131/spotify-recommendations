import { useState, useEffect } from 'react';

function getWindowDim() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height }
};

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimension] = useState(getWindowDim());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimension(getWindowDim());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
};
