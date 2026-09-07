import { useEffect, useRef } from 'react';

/**
 * 세로 휠 스크롤을 가로 스크롤로 변환한다. (Shift 없이 좌우 스크롤)
 * - 가로 오버플로가 있을 때만 개입한다.
 * - 트랙패드 가로 제스처는 브라우저 기본 동작에 맡긴다.
 * - 스크롤이 끝(맨 왼쪽/오른쪽)에 닿으면 페이지 세로 스크롤로 넘긴다.
 */
export function useHorizontalWheelScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // deltaMode: 0=픽셀, 1=줄, 2=페이지 → 픽셀로 정규화
      const factor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;
      const delta = e.deltaY * factor;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      e.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return ref;
}
