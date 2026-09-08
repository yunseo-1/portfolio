import { useEffect, useState } from 'react';

// 서버 데이터를 가져올 때 쓰는 조회 훅
// 컴포넌트는 로딩/에러 처리를 신경 안 쓰고 { data, loading, error } 만 받아씀
interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// <T> = 제네릭. 호출하는 쪽의 queryFn 이 무엇을 반환하든 그 타입을 그대로 data 타입으로 쓴다.
// key: 캐시/로그 구분용 문자열. queryFn: 실제로 데이터를 가져오는 async 함수.
export function useSupabaseQuery<T>(key: string, queryFn: () => Promise<T>): QueryState<T> {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // 비동기 요청의 흔한 함정: 응답이 늦게 도착하는 사이 컴포넌트가 사라지거나
    // key 가 바뀔 수 있다. 그때 낡은 응답으로 setState 하지 않도록 플래그로 막는다.
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

    // effect 의 반환 함수 = cleanup. 다음 실행 전, 그리고 언마운트 시 호출
    return () => {
      cancelled = true;
    };
  }, [key]);

  return state;
}
