import { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true,
) => {
  const [data, setData] = useState<T | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  const reset = () => {
    setIsLoading(false);
    setData(null);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [autoFetch]);

  return { data, isLoading, error, refetch: fetchData, reset };
};
