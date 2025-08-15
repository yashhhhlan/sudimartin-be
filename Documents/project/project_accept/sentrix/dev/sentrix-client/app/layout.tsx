import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Cookie, Nunito } from 'next/font/google';
import QueryProvider from '@/providers/query-provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Sentrix',
    default: 'Sentrix',
  },
};
const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const cookie = Cookie({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--cnvs-secondary-font',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${cookie.variable}`}>
        <QueryProvider>
          <ProviderComponent>{children}</ProviderComponent>
        </QueryProvider>
      </body>
    </html>
  );
}
