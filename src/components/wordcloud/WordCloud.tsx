// npm install d3-cloud d3          # 런타임 라이브러리
// npm install --save-dev @types/d3  # d3 타입 (d3-cloud는 타입이 없고 .d.ts로 대체)

// 이 컴포넌트는 React 로 화면을 그리지 않고, d3 라이브러리가 직접 <svg> 안에 요소를 그린다.
// 흐름: React 는 빈 <svg> 만 만들고, 나머지는 useEffect 안에서 d3 가 채운다.

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud'; // 단어들이 안 겹치게 배치 좌표를 계산해주는 플러그인
import styles from './WordCloud.module.css';

interface WordItem {
  text: string;
  value: number; // 클수록 글자가 크게 표시
  color: string;
}

interface WordCloudProps {
  // ? = 선택적 prop. 부모가 안 넘겨도 된다. 키워드를 클릭하면 이 함수가 불린다.
  onKeywordClick?: (keyword: string) => void;
}

// 색상은 CSS 변수로 지정해 라이트/다크 테마에 자동으로 맞춤
const wordData: WordItem[] = [
  { text: '개발', value: 90, color: 'var(--text-h)' },
  { text: '프론트엔드', value: 75, color: 'var(--pink)' },
  { text: 'React', value: 55, color: 'var(--pink)' },
  { text: '성장', value: 48, color: 'var(--pink)' },
  { text: '실행력', value: 46, color: 'var(--pink)' },
  { text: 'TypeScript', value: 38, color: 'var(--text-muted)' },
  { text: '데브옵스', value: 32, color: 'var(--text-dim)' },
  { text: '협업', value: 24, color: 'var(--text-dim)' },
  { text: '꾸준함', value: 20, color: 'var(--dot)' },
  { text: '문제해결', value: 18, color: 'var(--dot)' },
  { text: 'JavaScript', value: 30, color: 'var(--text-muted)' },
  { text: '커뮤니케이션', value: 22, color: 'var(--text-dim)' },
  { text: '백엔드', value: 65, color: 'var(--text-muted)' },
  { text: '도전', value: 34, color: 'var(--pink)' },
  { text: '성실함', value: 16, color: 'var(--dot)' },
  { text: '팀워크', value: 28, color: 'var(--text-dim)' },
  { text: '몰입', value: 21, color: 'var(--dot)' },
];

const WIDTH = 620;
const HEIGHT = 360;

// 단어마다 조금씩 다른 리듬으로 떠다니게 하려고 미리 만들어 둔 애니메이션 값 묶음.
// 아래에서 index 를 이 배열 길이로 나눈 나머지(%)로 골라 CSS 변수에 넣어준다.
const FLOAT_PRESETS = [
  { delay: '0s', dur: '5.4s', rot: '2deg' },
  { delay: '-1.8s', dur: '6.2s', rot: '-3deg' },
  { delay: '-3.2s', dur: '4.8s', rot: '1.5deg' },
  { delay: '-0.7s', dur: '5.8s', rot: '-2deg' },
  { delay: '-2.4s', dur: '6.6s', rot: '2.5deg' },
  { delay: '-4.1s', dur: '5.1s', rot: '-1.5deg' },
  { delay: '-1.2s', dur: '6.0s', rot: '3deg' },
  { delay: '-2.9s', dur: '5.6s', rot: '-2.5deg' },
];

export default function WordCloud({ onKeywordClick }: WordCloudProps) {
  // 아래 <svg> 요소를 가리키는 ref. d3 가 이 요소를 붙잡고 내용을 채운다.
  const svgRef = useRef<SVGSVGElement>(null);

  // 그리기 effect 는 마운트 때 딱 한 번만 돌린다(아래 의존성 []). 그런데 그 안에서
  // 최신 onKeywordClick 을 써야 하므로, 값을 ref 에 계속 갱신해두고 클릭 때 ref 로 꺼낸다.
  const onKeywordClickRef = useRef(onKeywordClick);
  useEffect(() => {
    onKeywordClickRef.current = onKeywordClick;
  });

  // 마운트 직후 한 번: d3-cloud 로 배치를 계산하고, 끝나면 draw() 로 실제 그림을 그린다.
  useEffect(() => {
    if (!svgRef.current) return;

    // { 단어: 색상 } 형태의 조회용 객체 
    const colorMap = Object.fromEntries(wordData.map(w => [w.text, w.color]));

    // d3-cloud 설정. 메서드를 .으로 계속 이어 붙임
    const layout = cloud()
      .size([WIDTH, HEIGHT])
      .words(wordData.map(d => ({ text: d.text, size: Math.max(14, d.value * 0.6) }))) // value → 글자 크기
      .padding(4) // 단어 사이 간격
      .rotate(() => (Math.random() > 0.8 ? 90 : 0)) // 20% 확률로 세로쓰기
      .font('sans-serif')
      .fontSize((d: any) => d.size)
      .on('end', draw); // 계산이 끝나면 draw(배치된 단어들) 호출

    layout.start(); // 계산 시작 (비동기)

    // d3 가 각 단어의 위치(x, y, rotate)를 계산해 넘겨주면 여기서 SVG 를 그린다
    function draw(words: any[]) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // 재실행 대비: 기존 내용 싹 비우고 새로 그림

      // 좌표계 원점을 SVG 한가운데로 옮긴다 (d3-cloud 좌표가 중앙 기준이라)
      const root = svg
        .append('g')
        .attr('transform', `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

      // .data(words).enter().append(...) = d3 의 핵심 패턴:
      // "데이터 배열 개수만큼 요소를 만들어라", words 한 개당 <g> 하나가 생긴다.
      // 위치(이동/회전)는 이 바깥 <g> 가 담당한다.
      const wrap = root
        .selectAll('g.word')
        .data(words)
        .enter()
        .append('g')
        .attr('class', 'word')
        .attr(
          'transform',
          (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`,
        );

      // 둥실둥실 이팩트는 안쪽 <text> 가 담당
      const nodes = wrap
        .append('text')
        .attr('class', styles.floatWord)
        .style('font-size', (d: any) => `${d.size}px`)
        .style('font-family', 'sans-serif')
        .style('font-weight', 700)
        .style('fill', (d: any) => colorMap[d.text] ?? 'var(--text-muted)')
        .style('cursor', 'pointer')
        .style(
          '--float-delay',
          (_d: any, i: number) => FLOAT_PRESETS[i % FLOAT_PRESETS.length].delay,
        )
        .style(
          '--float-duration',
          (_d: any, i: number) => FLOAT_PRESETS[i % FLOAT_PRESETS.length].dur,
        )
        .style(
          '--float-rot',
          (_d: any, i: number) => FLOAT_PRESETS[i % FLOAT_PRESETS.length].rot,
        )
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em') // 글자를 세로 중앙에 맞추는 보정값
        .text((d: any) => d.text)
        // 클릭 시 부모가 준 콜백 호출 → HomePage 의 selectedKeyword 가 바뀌고 챗봇이 반응
        .on('click', (_event: unknown, d: any) => onKeywordClickRef.current?.(d.text))
        .on('mouseover', function (this: SVGTextElement) {
          d3.select(this).style('animation-play-state', 'paused').style('opacity', 0.6); // 올리면 멈춤
        })
        .on('mouseout', function (this: SVGTextElement) {
          d3.select(this).style('animation-play-state', 'running').style('opacity', 1); // 떼면 다시 재생
        });

      nodes.append('title').text((d: any) => `"${d.text}" 관련 질문 보기`); // 마우스 올릴 때 뜨는 툴팁
    }
  }, []); // [] = 마운트 시 1회만. 단어 데이터가 고정이라 다시 그릴 필요가 없다.

  return (
    <div className={styles.cloudWrapper}>
      <h2 className={styles.heading}>About Me</h2>
      <p className={styles.hint}>키워드를 누르면 챗봇에 관련 질문이 추천돼요.</p>
      {/* React 는 이 빈 svg 까지만 만든다. 안쪽 내용은 위 useEffect 의 d3 가 채운다. */}
      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className={styles.svg}
      />
    </div>
  );
}
