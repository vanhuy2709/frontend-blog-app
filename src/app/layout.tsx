import * as React from 'react';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import AppHeader from '@/components/header/app.header';
import AppFooter from '@/components/footer/app.footer';
import { dmSans } from '@/lib/font';


export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ThemeRegistry>
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html>
  );
}
