// npm install d3-cloud d3          # 런타임 라이브러리
// npm install --save-dev @types/d3  # d3 타입 (d3-cloud는 타입이 없고 .d.ts로 대체)

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import styles from './WordCloud.module.css';

interface WordItem {
  text: string;
  value: number;
  color: string;
}

interface WordCloudProps {
 
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

export default function WordCloud({ onKeywordClick }: WordCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const onKeywordClickRef = useRef(onKeywordClick);
  useEffect(() => {
    onKeywordClickRef.current = onKeywordClick;
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const colorMap = Object.fromEntries(wordData.map(w => [w.text, w.color]));

    const layout = cloud()
      .size([WIDTH, HEIGHT])
      .words(wordData.map(d => ({ text: d.text, size: Math.max(14, d.value * 0.6) })))
      .padding(4)
      .rotate(() => (Math.random() > 0.8 ? 90 : 0))
      .font('sans-serif')
      .fontSize((d: any) => d.size)
      .on('end', draw);

    layout.start();

    function draw(words: any[]) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const nodes = svg
        .append('g')
        .attr('transform', `translate(${WIDTH / 2}, ${HEIGHT / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d: any) => `${d.size}px`)
        .style('font-family', 'sans-serif')
        .style('font-weight', 700)
        .style('fill', (d: any) => colorMap[d.text] ?? 'var(--text-muted)')
        .style('cursor', 'pointer')
        .attr('text-anchor', 'middle')
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text((d: any) => d.text)
        .on('click', (_event: unknown, d: any) => onKeywordClickRef.current?.(d.text))
        .on('mouseover', function (this: SVGTextElement) {
          d3.select(this).transition().duration(120).style('opacity', 0.6);
        })
        .on('mouseout', function (this: SVGTextElement) {
          d3.select(this).transition().duration(120).style('opacity', 1);
        });

      nodes.append('title').text((d: any) => `"${d.text}" 관련 질문 보기`);
    }
  }, []);

  return (
    <div className={styles.cloudWrapper}>
      <h2 className={styles.heading}>About Me</h2>
      <p className={styles.hint}>키워드를 누르면 챗봇에 관련 질문이 추천돼요.</p>
      <svg ref={svgRef} width={WIDTH} height={HEIGHT} className={styles.svg} />
    </div>
  );
}
