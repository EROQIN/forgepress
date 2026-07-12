export interface ThemeTokens {
  colors: {
    background: string;
    surface: string;
    surfaceStrong: string;
    foreground: string;
    muted: string;
    primary: string;
    accent: string;
    cyan: string;
    border: string;
  };
  typography: {
    sans: string;
    mono: string;
    article: string;
  };
  radius: {
    small: string;
    medium: string;
    card: string;
    pill: string;
  };
  layout: {
    contentWidth: string;
    articleWidth: string;
  };
}

export const sakuraNebulaTheme: ThemeTokens = {
  colors: {
    background: "#0e1024",
    surface: "rgba(26, 29, 62, 0.72)",
    surfaceStrong: "#171a38",
    foreground: "#f7f5ff",
    muted: "#b9b5d1",
    primary: "#9b7bff",
    accent: "#ff7ab6",
    cyan: "#5ee7f7",
    border: "rgba(255, 255, 255, 0.12)"
  },
  typography: {
    sans: '"Inter", "Noto Sans SC", system-ui, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", monospace',
    article: '"Noto Serif SC", "Source Han Serif SC", serif'
  },
  radius: {
    small: "10px",
    medium: "16px",
    card: "24px",
    pill: "999px"
  },
  layout: {
    contentWidth: "1120px",
    articleWidth: "760px"
  }
};

export const siteConfig = {
  title: "ForgePress",
  tagline: "在星海边缘，记录代码、灵感与构建过程。",
  description: "A customizable anime-inspired full-stack technical blog.",
  navigation: [
    { href: "/", label: "首页" },
    { href: "/posts/edge-native-blog", label: "文章" },
    { href: "/admin", label: "控制台" }
  ]
} as const;
