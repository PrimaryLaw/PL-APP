import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrimaryLaw.ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      elements: {
        footer: "hidden",
      },
    }}>
      <Providers>
        <Head>
          {/* Existing metadata and other head elements */}
          {/* Google Tag Manager */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-0LN5S5YRCG"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-0LN5S5YRCG');
              `,
            }}
          />
        </Head>
        <html lang="en">
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
