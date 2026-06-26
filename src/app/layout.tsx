import type { Metadata } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers/providers";
import { Toaster } from "@/shared/ui/sonner";
import "./globals.css";

const fontSans = Vazirmatn({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Support OTP",
    template: "%s | Support OTP",
  },
  description: "منصة المساعد الذكي لخدمة الشركات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <Providers>
          {children}
          <Toaster richColors position="top-center" dir="rtl" />
        </Providers>
      </body>
    </html>
  );
}
