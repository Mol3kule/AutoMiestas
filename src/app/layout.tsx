import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from './components/navigation/NavBar';
import { PageWrapper } from './components/wrappers/page-wrapper';

import { Toaster } from 'react-hot-toast';
import { ReactQueryProviderWrapper } from './components/wrappers/query-provider-wrapper';
import { FooterBar } from './components/footer/footer-bar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ReactQueryProviderWrapper>
        <html>
          <body className={`${inter.className} flex flex-col min-h-[100dvh]`}>
            <Toaster position='top-center' />
            <NavBar />
            <PageWrapper>
              {children}
            </PageWrapper>
            <FooterBar />
          </body>
        </html>
      </ReactQueryProviderWrapper>
    </ClerkProvider>
  );
}

export const metadata: Metadata = {
  title: 'Automiestas.lt',
  description: 'Įvairaus transporto skelbimų portalas',
}