import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Context = prop 으로 일일이 내려주지 않고, 트리 어디서든 꺼내 쓰는 전역 값 통로.
// 처음엔 값이 없으니 null 로 시작하고, 실제 값은 <ThemeProvider> 가 채운다.
export const ThemeContext = createContext<ThemeContextValue | null>(null);

// 컴포넌트에서 테마를 쓸 때 호출하는 훅.
// ThemeProvider 바깥에서 부르면 값이 null 이라 실수를 바로 알 수 있게 에러를 던진다.
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
