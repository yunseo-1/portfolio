// npm install d3-cloud d3          # 런타임 라이브러리
// npm install --save-dev @types/d3  # d3 타입 (d3-cloud는 타입 없음, 우리가 만든 .d.ts로 대체)

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import styles from './WordCloud.module.css';

interface WordItem {
  text: string;
  value: number;
  color: string;
}

const wordData: WordItem[] = [
  { text: '개발', value: 90, color: '#FFFFFF' },
  { text: '프론트엔드', value: 75, color: '#FF3EA5' },
  { text: 'React', value: 55, color: '#FF3EA5' },
  { text: '성장', value: 48, color: '#FF3EA5' },
  { text: '실행력', value: 46, color: '#FF3EA5' },
  { text: 'TypeScript', value: 38, color: '#A1A1AA' },
  { text: '데브옵스', value: 32, color: '#71717A' },
  { text: '협업', value: 24, color: '#71717A' },
  { text: '꾸준함', value: 20, color: '#52525B' },
  { text: '문제해결', value: 18, color: '#3F3F46' },
  { text: 'JavaScript', value: 30, color: '#A1A1AA' },
  { text: '커뮤니케이션', value: 22, color: '#71717A' },
  { text: '백엔드', value: 65, color: '#A1A1AA' },
  { text: '도전', value: 34, color: '#FF3EA5' },
  { text: '성실함', value: 16, color: '#3F3F46' },
  { text: '팀워크', value: 28, color: '#71717A' },
  { text: '몰입', value: 21, color: '#52525B' },
];

const WIDTH = 700;
const HEIGHT = 340;

export default function WordCloud() {
  const svgRef = useRef<SVGSVGElement>(null);

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

      svg
        .append('g')
        .attr('transform', `translate(${WIDTH / 2}, ${HEIGHT / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d: any) => `${d.size}px`)
        .style('font-family', 'sans-serif')
        .style('font-weight', 700)
        .style('fill', (d: any) => colorMap[d.text] ?? '#A1A1AA')
        .attr('text-anchor', 'middle')
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text((d: any) => d.text);
    }
  }, []);

  return (
    <div className={styles.cloudWrapper}>
      <h2 className={styles.heading}>WordCloud</h2>
      <svg ref={svgRef} width={WIDTH} height={HEIGHT} />
    </div>
  );
}