import { useState, useCallback } from "react";

export const useLoading = (minDuration = 800) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, minDuration);
  }, [minDuration]);

  const withLoading = useCallback(
    async <T>(asyncFunction: () => Promise<T>): Promise<T> => {
      startLoading();
      const startTime = Date.now();
      try {
        const result = await asyncFunction();
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDuration - elapsedTime);
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
        return result;
      } catch (error) {
        stopLoading();
        throw error;
      }
    },
    [startLoading, stopLoading, minDuration]
  );

  return { isLoading, startLoading, stopLoading, withLoading };
};
