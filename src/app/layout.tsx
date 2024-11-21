import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProviderBands from "@/providers/bands.provider";

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
  title: "Encontre sua banda",
  description: "Gig is a simple CRUD app to manage bands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black/80`}
      >
        <ProviderBands>
          {children}
        </ProviderBands>
      </body>
    </html>
  );
}
