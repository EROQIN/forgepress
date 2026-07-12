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
    background: "#080a0a",
    surface: "rgba(17, 20, 20, 0.82)",
    surfaceStrong: "#171a19",
    foreground: "#f0efe9",
    muted: "#9ea39f",
    primary: "#d8b45f",
    accent: "#d8b45f",
    cyan: "#d8b45f",
    border: "rgba(240, 239, 233, 0.14)"
  },
  typography: {
    sans: 'var(--font-sans), "Noto Sans SC", system-ui, sans-serif',
    mono: 'var(--font-mono), "SFMono-Regular", monospace',
    article: 'var(--font-serif), "Noto Serif SC", serif'
  },
  radius: {
    small: "8px",
    medium: "12px",
    card: "16px",
    pill: "999px"
  },
  layout: {
    contentWidth: "1240px",
    articleWidth: "70ch"
  }
};

export const siteConfig = {
  title: "ForgePress",
  tagline: "在代码与系统之间，写下值得反复阅读的技术故事。",
  description: "An editorial, Cloudflare-native technical publishing platform.",
  navigation: [
    { href: "/", label: "文章" },
    { href: "/archive", label: "归档" },
    { href: "/topics", label: "专题" },
    { href: "/about", label: "关于" }
  ]
} as const;
