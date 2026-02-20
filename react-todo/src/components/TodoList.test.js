import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders Todo List heading", () => {
    render(<TodoList />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test("adds a new todo item", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/enter a task/i);
    const button = screen.getByText(/add/i);

    fireEvent.change(input, {
      target: { value: "Learn React" },
    });

    fireEvent.click(button);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });
});
