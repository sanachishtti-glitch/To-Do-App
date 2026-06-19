
import "./globals.css";
// import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

// app/layout.tsx


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
      {/* <body className="min-h-screen transition-colors duration-300"> */}

<body className="min-h-screen bg-[white] dark:bg-[#192337] transition-colors duration-300">
{/* <body className="min-h-screen bg-pink-200 dark:bg-[#192337] transition-colors duration-300"> */}
      {/* <body className="min-h-screen bg-[red] dark:bg-[#0f172a] transition-colors duration-300"> */}
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






// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "next-themes";

// export const metadata: Metadata = {
//   title: "To-Do App",
//   description: "Stay on top of your tasks",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       {/* <body className="min-h-screen bg-slate-950 text-slate-200 font-sans leading-normal antialiased"> */}


//       {/* <body className="min-h-screen bg-[var(--bg)]text-[var(--text)] font-sans leading-normal antialiased transition-colors duration-300">
//       //       </body>
//         {children}
//       </body> */}
//              <body>
//                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//                  {children}
//                </ThemeProvider>
//                </body>
//     </html>
//   );
// }



// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//     </html>
//   );
// }