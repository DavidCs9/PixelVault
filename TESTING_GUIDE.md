# 🧪 Quick Guide: Writing Tests with Jest & React Testing Library

## 1. Where to Put Tests

- Place your test files next to the component or in a `__tests__` folder.
- Use the `.test.tsx` or `.spec.tsx` extension for React component tests.
  - Example: `src/components/__tests__/ThemeToggleButton.test.tsx`

---

## 2. Basic Test Structure

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders the component", () => {
    render(<MyComponent />);
    expect(screen.getByText("Some text")).toBeInTheDocument();
  });

  it("responds to user actions", () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Clicked!")).toBeInTheDocument();
  });
});
```

---

## 3. Testing Components with Context/Providers

If your component needs a provider (like ThemeProvider):

```tsx
import { render } from "@testing-library/react";
import ThemeProvider from "../../providers/ThemeProvider";
import ThemeToggleButton from "../ThemeToggleButton";

const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

it("toggles theme", () => {
  renderWithTheme(<ThemeToggleButton />);
  // ...test logic
});
```

---

## 4. Useful Queries

- `screen.getByText("text")` – find by visible text
- `screen.getByRole("button")` – find by role
- `screen.getByTestId("test-id")` – find by test id (add `data-testid` to your component)
- `screen.queryByText("text")` – like getByText, but returns null if not found

---

## 5. Simulating User Events

- `fireEvent.click(element)` – simulate a click
- `fireEvent.change(input, { target: { value: "new value" } })` – simulate typing

Or use `userEvent` for more realistic interactions:

```tsx
import userEvent from "@testing-library/user-event";
userEvent.click(button);
userEvent.type(input, "hello");
```

---

## 6. Running Tests

- Run all tests:
  ```bash
  pnpm test
  ```
- Watch mode (reruns on file changes):
  ```bash
  pnpm test:watch
  ```
- Coverage report:
  ```bash
  pnpm test:coverage
  ```

---

## 7. Best Practices

- Test user-visible behavior, not implementation details.
- Use `describe` to group related tests.
- Use `beforeEach`/`afterEach` for setup/cleanup if needed.
- Prefer queries like `getByRole` and `getByText` over `getByTestId` when possible.

---

## 8. Example: Testing a Button

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MyButton from "../MyButton";

it("calls onClick when clicked", () => {
  const handleClick = jest.fn();
  render(<MyButton onClick={handleClick}>Click me</MyButton>);
  fireEvent.click(screen.getByText("Click me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

**You're all set!**  
Write your tests in the `src/components/__tests__/` folder or next to your components, and use the above patterns to ensure your app works as expected.

If you want more advanced examples (mocking APIs, testing async, etc.), just ask!
