"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import TodoApp from "@/components/TodoApp";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (

      //  <main className="min-h-screen bg-pink-200 dark:bg-[#192337] transition-colors duration-300">
    <main 
     className={`min-h-screen transition-colors duration-300 ${ 
        theme === "dark"
           ? "bg-[#192337]"
           : "bg-gray-100"
       }`}
     >
      <TodoApp />
    </main>
  );
}











// "use client";

// import TodoApp from "@/components/TodoApp";
// import { useTheme } from "next-themes";

// export default function Home() {
//   const { theme } = useTheme();
// console.log("Theme:", theme);
//   return (
//     <main
//       className={`min-h-screen transition-colors duration-300 ${
//         theme === "dark"
//           ? "bg-[#192337]"
//           : "bg-white-700"
//       }`}
//     >
//       <header className="text-center mb-7">
//         <h1 className="text-3xl sm:text-4xl font-bold mb-1">To-Do App</h1>
//         <p className="text-slate-400 text-[0.95rem]">
//           Stay on top of your tasks
//         </p>
//       </header>

//       <TodoApp />
//     </main>
//   );
// }