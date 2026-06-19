export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "completed";

export function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function normalizeTodos(stored: unknown): Todo[] {
  if (!Array.isArray(stored)) return [];

  return stored.map((item) => {
    if (typeof item === "string") {
      return { id: generateId(), text: item, completed: false };
    }
    if (item && typeof item === "object") {
      const record = item as Partial<Todo>;
      return {
        id: record.id ?? generateId(),
        text: record.text ?? "",
        completed: Boolean(record.completed),
      };
    }
    return { id: generateId(), text: "", completed: false };
  });
}

export function getEmptyMessage(todos: Todo[], filter: Filter): string {
  if (todos.length === 0) return "No tasks yet — add one above.";
  if (filter === "active") return "No active tasks — you're all caught up!";
  if (filter === "completed") return "No completed tasks yet.";
  return "No tasks yet — add one above.";
}

export function matchesFilter(todo: Todo, filter: Filter): boolean {
  if (filter === "active") return !todo.completed;
  if (filter === "completed") return todo.completed;
  return true;
}
