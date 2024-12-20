import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MainHeader from "@/components/main-header";
import '@coinbase/onchainkit/styles.css';
import { Providers } from "@/components/providers";
import { Toaster } from 'react-hot-toast';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FarmBase",
  description: "Your Trusted Farming Partner",
  metadataBase: new URL("https://thefarmbase.vercel.app"),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'FarmBase',
    description: 'Your Trusted Farming Partner',
    url: "https://thefarmbase.vercel.app",
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;  
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Providers>
        <MainHeader/>
          <section className="min-h-screen bg-gray-100">
            {children}
        </section>
          <footer className="bg-[#2d2d2d] text-[#e5e5e5] py-3">
            <div className="container mx-auto px-6 text-center text-[#4caf50] hover:text-[#b2ff59]">
              <p>&copy; {new Date().getFullYear()} FarmBase Market. All rights reserved.</p>
            </div>
          </footer>
      </Providers>
        <Toaster/>
      </body>
    </html>
  );
}
