import { useMemo, useState } from "react";
import AddTodoForm from "./AddTodoForm";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write tests", completed: false },
  { id: 3, text: "Ship project", completed: true },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const nextId = useMemo(() => {
    return () => Math.max(0, ...todos.map((t) => t.id)) + 1;
  }, [todos]);

  function addTodo(text) {
    setTodos((prev) => [...prev, { id: nextId(), text, completed: false }]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 24 }}>
      <h2>Todo List</h2>

      <AddTodoForm onAdd={addTodo} />

      <ul style={{ marginTop: 16, display: "grid", gap: 10, paddingLeft: 18 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              role="button"
              tabIndex={0}
              onClick={() => toggleTodo(todo.id)}
              onKeyDown={(e) => e.key === "Enter" && toggleTodo(todo.id)}
              style={{
                flex: 1,
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              {todo.text}
            </span>

            <button aria-label={`delete-${todo.id}`} onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}