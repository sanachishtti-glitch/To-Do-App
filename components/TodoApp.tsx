"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes"; // Theme hooks import kiya
import { Sunset, Moon } from "lucide-react"; // Icons import kiye
import {
  Filter,
  Todo,
  generateId,
  getEmptyMessage,
  matchesFilter,
  normalizeTodos,
} from "@/lib/todos";

const STORAGE_KEY = "todos";

const FILTER_BTN_BASE =
  "px-2.5 py-1.5 rounded-md border text-sm cursor-pointer transition-colors";
const FILTER_BTN_ACTIVE = "text-indigo-400 border-indigo-500";
const FILTER_BTN_INACTIVE = "text-slate-400 border-transparent hover:text-slate-200";


// const TODO_ITEM_BASE =
//   "flex items-center gap-2.5 px-3.5 py-3 bg-gray-200 text-black dark:bg-black dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg animate-slide-in transition-all";

const TODO_ITEM_BASE =
  "flex items-center gap-2.5 px-3.5 py-3 border rounded-lg animate-slide-in transition-all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Done" },
];

function filterBtnClass(isActive: boolean) {
  return `${FILTER_BTN_BASE} ${isActive ? FILTER_BTN_ACTIVE : FILTER_BTN_INACTIVE}`;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  


  
  // theme switcher state aur hook
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const normalized = normalizeTodos(raw);
    setTodos(normalized);
    if (raw.some((item: unknown) => typeof item === "string" || (item as Todo)?.completed === undefined)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, hydrated]);

  const visibleTodos = todos.filter((todo) => matchesFilter(todo, filter));
  const activeCount = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  function addTodo(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) => [{ id: generateId(), text: trimmed, completed: false }, ...prev]);
    setInput("");
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  function commitEdit(id: string) {
    const trimmed = editText.trim();
    if (trimmed) {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
    }
    setEditingId(null);
    setEditText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  if (!hydrated) {
    return (
      <section className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl shadow-black/35">
        <p className="text-center text-slate-400 text-sm">Loading tasks…</p>
      </section>
    );
  }

  return (
   <section
  className={`border rounded-xl p-5 shadow-2xl transition-colors duration-250 ${
    theme === "dark"
      ? "bg-slate-900 border-slate-700 shadow-black/35"
      : "bg-gray-400 border-slate-200 shadow-black/5"
  }`}
>
    {/*  <section className="bg-blue-300 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-2xl shadow-black/5 dark:shadow-black/35 transition-colors duration-250"> */}
      
      {/* HEADER SECTION: Title aur Theme Switcher Icons */}
      {/* <div className="flex items-center justify-between mb-5"> */}

      <div className="flex items-center justify-between w-full mb-5">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">My Tasks</h1>
        <div className="flex gap-2 shrink-0">
          {/* Sunset Icon -> Enables Light Mode */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`p-2 rounded-lg cursor-pointer transition-all ${
              theme === "light" 
                ? "bg-amber-100 text-amber-600 border border-amber-300" 
                : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title="Switch to Light Mode"
          >
            <Sunset size={20} />
          </button>

          {/* Moon Icon -> Enables Dark Mode */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-lg cursor-pointer transition-all ${
              theme === "dark" 
                ? "bg-indigo-950/50 text-indigo-400 border border-indigo-500/30" 
                : "text-slate-500 dark:text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title="Switch to Dark Mode"
          >
            <Moon size={20} />
          </button>
        </div>
      </div>

      <form onSubmit={addTodo} className="flex gap-2 mb-4" autoComplete="off">
        {/* <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1  min-w-0 px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-base placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-1"
          placeholder="What do you need to do?"
          aria-label="New todo item"
          maxLength={200}
        /> */}

<input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className={`flex-1 min-w-0 px-3.5 py-2.5 border rounded-lg text-base placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-1 transition-colors ${
    theme === "dark"
      ? "bg-[#192337] text-white border-slate-700 placeholder:text-gray-400"
      : "bg-gray-300 text-black border-gray-300 placeholder:text-gray-100"
  }`}
  placeholder="Add a new task..."
  aria-label="New todo item"
  maxLength={200}
/>

        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-indigo-500 text-white text-[0.95rem] font-semibold cursor-pointer hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors"
        >
          Add
        </button>
      </form>

      <ul className="list-none m-0 p-0 flex flex-col gap-2" aria-live="polite">
        {visibleTodos.map((todo) => (
          // <li
          //   key={todo.id}
          //   className={`${TODO_ITEM_BASE}${todo.completed ? " opacity-65" : ""}`}
          // >
<li
  key={todo.id}
  className={`${TODO_ITEM_BASE} ${
    theme === "dark"
      ? "bg-[#192337] text-white border-slate-700"
      : "bg-gray-200 text-black border-gray-300"
  } ${todo.completed ? "opacity-65" : ""}`}
>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-[1.1rem] h-[1.1rem] shrink-0 accent-emerald-400 cursor-pointer"
              aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
            />

            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => commitEdit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitEdit(todo.id);
                  }
                  if (e.key === "Escape") cancelEdit();
                }}
                // className="flex-1 min-w-0 px-2 py-1 border border-indigo-500 rounded-md bg-slate-900 text-slate-200 text-inherit focus:outline-2 focus:outline-indigo-500 focus:outline-offset-1"
         className="flex-1 min-w-0 px-3.5 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg bg-white text-black dark:bg-black dark:text-white text-base placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-1"

                maxLength={200}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => startEdit(todo)}
                title="Double-click to edit"
                // className={
                //   todo.completed
                //     ? "flex-1 break-words text-left cursor-default line-through text-slate-400"
                //     : "flex-1 break-words text-left text-slate-200 cursor-default"
                // }

//                 className={
//   todo.completed
//     ? "flex-1 break-words text-left cursor-default line-through text-black-500 dark:text-black-400"
//     : "flex-1 break-words text-left cursor-default text-black dark:text-white "
// }

className={`flex-1 break-words text-left cursor-default ${
  todo.completed
    ? theme === "dark"
      ? "line-through text-white-200"
      : "line-through text-black-500"
    : theme === "dark"
    ? "text-white"
    : "text-black"
}`}
              >
                {todo.text}
              </span>
            )}

            <button
              type="button"
              onClick={() => removeTodo(todo.id)}
              // className="shrink-0 px-2.5 py-1.5 rounded-md bg-transparent text-red-400 text-sm font-semibold cursor-pointer hover:bg-red-400/15 hover:text-red-500 transition-colors"
className="shrink-0 px-2.5 py-1.5 rounded-md bg-transparent text-red-500 dark:text-red-400 text-sm font-semibold cursor-pointer hover:bg-red-400/15 hover:text-red-600 dark:hover:text-red-500 transition-colors"

              aria-label={`Delete "${todo.text}"`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visibleTodos.length === 0 && (
        <p className="m-0 p-4 text-center text-slate-400 text-sm border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          {getEmptyMessage(todos, filter)}
        </p>
      )}

      {todos.length > 0 && (
        <footer className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-400 max-[480px]:flex-col max-[480px]:text-center">
          <span>
            {activeCount} item{activeCount === 1 ? "" : "s"} left
          </span>

          <div
            className="flex gap-1 max-[480px]:order-first"
            role="tablist"
            aria-label="Filter todos"
          >

            
            {FILTERS.map(({ value, label }) => {
              const isActive = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  // className={filterBtnClass(isActive)}
className={`px-2.5 py-1.5 rounded-md border text-sm cursor-pointer transition-colors ${
  theme === "dark"
    ? isActive
      ? " text-[blue] border-[blue]"
      : "text-slate-400 border-transparent hover:text-blue-400"
    : isActive
    ? " text-blue-600 border-blue-600"
    : "text-black border-transparent hover:text-blue-600"
}`}


                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {hasCompleted && (
            <button
              type="button"
              onClick={clearCompleted}
              // className="px-2.5 py-1.5 rounded-md bg-transparent text-slate-400 text-sm cursor-pointer hover:text-[#962735] transition-colors 
  
// className={`px-2.5 py-1.5 rounded-md bg-transparent text-red-400 text-sm cursor-pointer hover:text-[black] transition-colors
//   theme === "dark"
//     ? "bg-red-900/30 text-red-400 hover:bg-red-800/50"
//     : "bg-red-100 text-red-700 hover:bg-red-200"
// }`}


className={`px-2.5 py-1.5 rounded-md text-sm cursor-pointer transition-all ${
  theme === "dark"
    ? " text-red-400 hover:bg-red-400 hover:text-white"
    : " text-red-700 hover:bg-red-200 hover:text-red-900"
}`}


           >
              Clear done
            </button>
          )}
        </footer>
      )}
    </section>
  );
}







// "use client";

// import { FormEvent, useEffect, useState } from "react";
// import {
//   Filter,
//   Todo,
//   generateId,
//   getEmptyMessage,
//   matchesFilter,
//   normalizeTodos,
// } from "@/lib/todos";



// const STORAGE_KEY = "todos";

// const FILTER_BTN_BASE =
//   "px-2.5 py-1.5 rounded-md border text-sm cursor-pointer transition-colors";
// const FILTER_BTN_ACTIVE = "text-indigo-400 border-indigo-500";
// const FILTER_BTN_INACTIVE = "text-slate-400 border-transparent hover:text-slate-200";

// const TODO_ITEM_BASE =
//   "flex items-center gap-2.5 px-3.5 py-3 bg-slate-800 border border-slate-700 rounded-lg animate-slide-in transition-opacity";

// const FILTERS: { value: Filter; label: string }[] = [
//   { value: "all", label: "All" },
//   { value: "active", label: "Active" },
//   { value: "completed", label: "Done" },
// ];

// function filterBtnClass(isActive: boolean) {
//   return `${FILTER_BTN_BASE} ${isActive ? FILTER_BTN_ACTIVE : FILTER_BTN_INACTIVE}`;
// }

// export default function TodoApp() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [input, setInput] = useState("");
//   const [filter, setFilter] = useState<Filter>("all");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editText, setEditText] = useState("");
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//     const normalized = normalizeTodos(raw);
//     setTodos(normalized);
//     if (raw.some((item: unknown) => typeof item === "string" || (item as Todo)?.completed === undefined)) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
//     }
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (!hydrated) return;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//   }, [todos, hydrated]);

//   const visibleTodos = todos.filter((todo) => matchesFilter(todo, filter));
//   const activeCount = todos.filter((t) => !t.completed).length;
//   const hasCompleted = todos.some((t) => t.completed);

//   function addTodo(e: FormEvent) {
//     e.preventDefault();
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     setTodos((prev) => [{ id: generateId(), text: trimmed, completed: false }, ...prev]);
//     setInput("");
//   }

//   function toggleTodo(id: string) {
//     setTodos((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
//     );
//   }

//   function removeTodo(id: string) {
//     setTodos((prev) => prev.filter((t) => t.id !== id));
//   }

//   function clearCompleted() {
//     setTodos((prev) => prev.filter((t) => !t.completed));
//   }

//   function startEdit(todo: Todo) {
//     setEditingId(todo.id);
//     setEditText(todo.text);
//   }

//   function commitEdit(id: string) {
//     const trimmed = editText.trim();
//     if (trimmed) {
//       setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
//     }
//     setEditingId(null);
//     setEditText("");
//   }

//   function cancelEdit() {
//     setEditingId(null);
//     setEditText("");
//   }

//   if (!hydrated) {
//     return (
//       <section className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl shadow-black/35">
//         <p className="text-center text-slate-400 text-sm">Loading tasks…</p>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl shadow-black/35">
//       <form onSubmit={addTodo} className="flex gap-2 mb-4" autoComplete="off">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 min-w-0 px-3.5 py-2.5 border border-slate-700 rounded-lg bg-slate-800 text-slate-200 text-base placeholder:text-slate-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-1"
//           placeholder="What do you need to do?"
//           aria-label="New todo item"
//           maxLength={200}
//         />
//         <button
//           type="submit"
//           className="px-4 py-2.5 rounded-lg bg-indigo-500 text-white text-[0.95rem] font-semibold cursor-pointer hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors"
//         >
//           Add
//         </button>
//       </form>

//       <ul className="list-none m-0 p-0 flex flex-col gap-2" aria-live="polite">
//         {visibleTodos.map((todo) => (
//           <li
//             key={todo.id}
//             className={`${TODO_ITEM_BASE}${todo.completed ? " opacity-65" : ""}`}
//           >
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id)}
//               className="w-[1.1rem] h-[1.1rem] shrink-0 accent-emerald-400 cursor-pointer"
//               aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
//             />

//             {editingId === todo.id ? (
//               <input
//                 type="text"
//                 value={editText}
//                 onChange={(e) => setEditText(e.target.value)}
//                 onBlur={() => commitEdit(todo.id)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     commitEdit(todo.id);
//                   }
//                   if (e.key === "Escape") cancelEdit();
//                 }}
//                 className="flex-1 min-w-0 px-2 py-1 border border-indigo-500 rounded-md bg-slate-900 text-slate-200 text-inherit focus:outline-2 focus:outline-indigo-500 focus:outline-offset-1"
//                 maxLength={200}
//                 autoFocus
//               />
//             ) : (
//               <span
//                 onDoubleClick={() => startEdit(todo)}
//                 title="Double-click to edit"
//                 className={
//                   todo.completed
//                     ? "flex-1 break-words text-left cursor-default line-through text-slate-400"
//                     : "flex-1 break-words text-left cursor-default"
//                 }
//               >
//                 {todo.text}
//               </span>
//             )}

//             <button
//               type="button"
//               onClick={() => removeTodo(todo.id)}
//               className="shrink-0 px-2.5 py-1.5 rounded-md bg-transparent text-red-400 text-sm font-semibold cursor-pointer hover:bg-red-400/15 hover:text-red-500 transition-colors"
//               aria-label={`Delete "${todo.text}"`}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       {visibleTodos.length === 0 && (
//         <p className="m-0 p-4 text-center text-slate-400 text-sm border border-dashed border-slate-700 rounded-lg">
//           {getEmptyMessage(todos, filter)}
//         </p>
//       )}

//       {todos.length > 0 && (
//         <footer className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-700 text-sm text-slate-400 max-[480px]:flex-col max-[480px]:text-center">
//           <span>
//             {activeCount} item{activeCount === 1 ? "" : "s"} left
//           </span>

//           <div
//             className="flex gap-1 max-[480px]:order-first"
//             role="tablist"
//             aria-label="Filter todos"
//           >
//             {FILTERS.map(({ value, label }) => {
//               const isActive = filter === value;
//               return (
//                 <button
//                   key={value}
//                   type="button"
//                   role="tab"
//                   aria-selected={isActive}
//                   className={filterBtnClass(isActive)}
//                   onClick={() => setFilter(value)}
//                 >
//                   {label}
//                 </button>
//               );
//             })}
//           </div>

//           {hasCompleted && (
//             <button
//               type="button"
//               onClick={clearCompleted}
//               className="px-2.5 py-1.5 rounded-md bg-transparent text-slate-400 text-sm cursor-pointer hover:text-red-400 transition-colors"
//             >
//               Clear done
//             </button>
//           )}
//         </footer>
//       )}
//     </section>
//   );
// }
