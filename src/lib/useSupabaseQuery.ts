import { useEffect, useState } from 'react';

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * key가 바뀔 때마다 queryFn을 실행하는 간단한 데이터 패칭 훅.
 * (react-query 없이 쓰는 최소 구현 — 캐시/재검증 없음)
 */
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
    // queryFn은 모듈 스코프 함수라 매 렌더 동일 참조 → key만 의존성으로 충분
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
