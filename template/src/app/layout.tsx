import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
        className={`${poppins.className} antialiased text-foreground bg-background dark:bg-zinc-950 w-full min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Navbar />
          <main className=" flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}