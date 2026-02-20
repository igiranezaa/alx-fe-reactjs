import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  test("renders Todo List heading", () => {
    render(<TodoList />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test("renders input and add button", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/enter a task/i);
    const button = screen.getByText(/add/i);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
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

  test("deletes a todo item", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/enter a task/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, {
      target: { value: "Delete Me" },
    });

    fireEvent.click(addButton);

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });
});
