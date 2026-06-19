
import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "To-Do App",
  description: "Stay on top of your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

<body className="min-h-screen bg-[white] dark:bg-[#192337] transition-colors duration-300">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}





