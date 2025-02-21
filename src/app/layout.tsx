import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Thai } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-inter",
})

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-ibm-plex-sans-thai",
  weight: "400"
})

export const metadata: Metadata = {
  title: "a Board - Where your creativity takes shape",
  description: "Where your creativity takes shape",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-black.svg" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexSansThai.variable} serif`}
      >
        <ThemeRegistry>
          <StoreProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </StoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
