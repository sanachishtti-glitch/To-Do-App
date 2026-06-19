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

