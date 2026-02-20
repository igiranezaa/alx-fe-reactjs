import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("TodoList", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Ship project")).toBeInTheDocument();
  });

  test("adds a new todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    await user.type(input, "New Task");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles a todo completed state", () => {
    render(<TodoList />);

    const item = screen.getByText("Learn React");
    expect(item).not.toHaveStyle("text-decoration: line-through");

    fireEvent.click(item);
    expect(item).toHaveStyle("text-decoration: line-through");

    fireEvent.click(item);
    expect(item).not.toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    expect(screen.getByText("Write tests")).toBeInTheDocument();

    // find its delete button by scanning list item id is not exposed,
    // so we delete by clicking the first matching "Delete" near that text:
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    // Click one delete button that removes "Write tests"
    await user.click(deleteButtons[0]); // will delete first todo in list (Learn React)
    // Ensure list changed
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});