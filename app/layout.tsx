import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jobs Navigator | Connecting Skilled Talent With Leading Australian Employers',
  description: 'Australia’s premier talent matching and verified recruitment platform. Discover high-paying FIFO mining, healthcare, engineering, IT, and skilled trades roles across all 8 States and Territories with compulsory right-to-work screening.',
  metadataBase: new URL('https://jobsnavigator.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jobs Navigator | Connecting Skilled Talent With Leading Australian Employers',
    description: 'Australia’s premier talent matching and verified recruitment platform. Discover high-paying FIFO mining, healthcare, engineering, and trades roles.',
    url: 'https://jobsnavigator.com.au',
    siteName: 'Jobs Navigator',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs Navigator | Connecting Skilled Talent With Leading Australian Employers',
    description: 'Australia’s premier talent matching and verified recruitment platform.',
  },
  keywords: [
    'jobs in Australia',
    'Australian job opportunities',
    'apply for jobs online Australia',
    'FIFO jobs Western Australia',
    'healthcare and nursing jobs Australia',
    'trades and construction jobs Sydney',
    'IT jobs Melbourne',
    'warehouse and logistics jobs Brisbane',
    'recruitment agency Australia',
    'full time and casual jobs Australia',
    'skilled jobs Australia',
    'submit CV Australia'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-teal-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
