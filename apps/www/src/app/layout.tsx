'use client';

import React from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { GA } from '@/components/analytics/ga';
import { Providers } from '@/components/context/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/sonner';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

// 由于使用了 'use client'，需要移除 metadata 导出
// 可以使用 next/head 在客户端设置 metadata
// export const metadata: Metadata = { ... }

// export const viewport: Viewport = {
//   themeColor: META_THEME_COLORS.light,
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // 客户端设置 metadata
  React.useEffect(() => {
    document.title = siteConfig.name;
    
    // 设置 meta 标签
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.append(meta);
      }
      meta.content = content;
    };

    setMetaTag('description', siteConfig.description);
    setMetaTag('theme-color', META_THEME_COLORS.light);
    setMetaTag('viewport', 'width=device-width, initial-scale=1');
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased',
          '[--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]',
          fontSans.variable,
          fontMono.variable
        )}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <Providers>
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-svh flex-col bg-background">
                {children}
              </div>
            </div>
          </Providers>
        </NuqsAdapter>

        <TailwindIndicator />

        <GA />
        <Toaster />
      </body>
    </html>
  );
}
