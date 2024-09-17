import type { Metadata } from "next";
import { Raleway } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "DocNext",
  description: "A simple and effective documentation template!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raleway.className} text-foreground bg-background dark:bg-zinc-950 antialiased w-full h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}