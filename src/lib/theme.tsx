import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme-context';

// 첫 렌더에서 어떤 테마로 시작할지 결정
// 우선순위 1~4
//  1) <html data-theme="..."> 가 이미 지정돼 있으면 그 값
//  2) 지난 방문에서 저장해둔 localStorage 값
//  3) 브라우저/OS 설정(prefers-color-scheme)
//  4) 아무것도 없으면 다크
function getInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.dataset.theme;
    if (attr === 'light' || attr === 'dark') return attr;
  }
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // 시크릿 모드 등에서 localStorage 접근이 막히면 그냥 넘어간다
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light';
  }
  return 'dark';
}

// 이 컴포넌트로 감싼 하위 트리 전체가 useTheme() 로 테마 값을 꺼내 쓸 수 있다.
// children = 여는 태그와 닫는 태그 사이에 들어온 JSX (앱 전체).
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // 테마가 바뀔 때마다 실행(실제 화면 색을 바꾸는 건 CSS)
  // <html> 의 data-theme 속성만 갈아끼우면 styles/index.css 의 색 변수들이 따라 바뀐다.
  // 동시에 localStorage 에 저장해 다음 방문 때 기억한다.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage 접근 불가 시 저장만 생략
    }
  }, [theme]);

  // useCallback: 렌더마다 함수를 새로 만들지 않고 같은 함수를 재사용한다.
  // prev => ... 형태로 이전 상태를 받아 뒤집는다.
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
