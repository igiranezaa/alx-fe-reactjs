import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Ship project")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a todo");
    fireEvent.change(input, { target: { value: "New Todo Item" } });

    const addButton = screen.getByText("Add Todo");
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });

  test("toggles a todo completion", () => {
    render(<TodoList />);

    const todoItem = screen.getByText("Learn React");
    expect(todoItem).toHaveStyle("text-decoration: none");

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo item", () => {
    render(<TodoList />);

    expect(screen.getByText("Write tests")).toBeInTheDocument();

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    // After deleting first item, it should not exist
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});