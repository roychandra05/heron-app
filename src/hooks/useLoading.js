import { useState, useRef, useEffect } from "react";

const useLoading = (time) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const timeMessage = () => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, time);
  };

  useEffect(() => {
    if (isLoading) {
      timeMessage();
    } else {
      clearTimeout(timeoutRef.current);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  return [isLoading, setIsLoading];
};
export default useLoading;
