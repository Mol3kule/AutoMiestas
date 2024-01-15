import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from './components/navigation/NavBar';
import { PageWrapper } from './components/hooks/page.hook';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html>
        <body className={`${inter.className} flex flex-col min-h-[100vh]`}>
          <NavBar />
          <PageWrapper>
            {children}
          </PageWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}

export const metadata: Metadata = {
  title: 'Automiestas.lt',
  description: 'Įvairaus transporto skelbimų portalas',
}