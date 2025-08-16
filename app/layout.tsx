import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from 'sonner'
import AuthGuard from "@/components/auth/authguard"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Suitable",
  description: "An authentic muslim dating app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="h-full min-w-screen min-h-screen transition-colors duration-200">
        <ThemeProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
