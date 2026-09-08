import { useEffect, useState } from 'react';

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useSupabaseQuery<T>(key: string, queryFn: () => Promise<T>): QueryState<T> {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState(prev => ({ ...prev, loading: true }));

    queryFn()
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err as Error });
          console.error(`[useSupabaseQuery:${key}]`, err);
        }
      });

    return () => {
      cancelled = true;
    };
  
  }, [key]);

  return state;
}
