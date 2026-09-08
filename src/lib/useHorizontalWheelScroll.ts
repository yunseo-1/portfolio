import { useEffect, useRef } from 'react';

// career,skill 섹션 같은 경우에 마우스 세로 휠을 가로 스크롤로 바꿔주는 훅
// const ref = useHorizontalWheelScroll<HTMLDivElement>(); <div ref={ref}>
export function useHorizontalWheelScroll<T extends HTMLElement>() {
  // ref = 특정 DOM 요소를 직접 가리키는 상자. .current 에 실제 요소가 들어온다.
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return; // 아직 DOM 이 안 붙었으면 중단

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return; // 넘칠 내용이 없으면 그대로 둠
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // 이미 가로 스크롤 중이면 관여 안 함

      // deltaMode: 0=픽셀, 1=줄, 2=페이지 → 픽셀로 정규화
      const factor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;
      const delta = e.deltaY * factor;

      // 끝에 닿았으면 페이지 세로 스크롤로 자연스럽게 넘겨준다
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      e.preventDefault(); // 기본 세로 스크롤을 막고
      el.scrollLeft += delta; // 대신 가로로 이동
    };

    // passive:false 여야 preventDefault() 가 먹는다
    el.addEventListener('wheel', onWheel, { passive: false });
    // 정리: 컴포넌트가 사라질 때 리스너도 반드시 떼어준다 (메모리 누수 방지)
    return () => el.removeEventListener('wheel', onWheel);
  }, []); // [] = 마운트 시 한 번만 등록

  return ref;
}
