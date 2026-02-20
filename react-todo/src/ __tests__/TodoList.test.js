import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList", () => {
  test("renders Todo List title", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  test("adds a new todo item", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a todo");
    fireEvent.change(input, { target: { value: "Test Todo" } });

    const button = screen.getByText("Add Todo");
    fireEvent.click(button);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });
});