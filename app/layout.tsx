import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "শক্তি | নারীর স্বাস্থ্য, নারীর ভাষায়",
  description:
    "বাংলায় তৈরি নারীর স্বাস্থ্য প্ল্যাটফর্ম: পিরিয়ড ট্র্যাকার, গর্ভাবস্থা সহায়তা, স্বাস্থ্যগাইড, AI পরামর্শ, অ্যাপয়েন্টমেন্ট ও জরুরি সেবা।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
