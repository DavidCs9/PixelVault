import { render, screen, fireEvent } from "@testing-library/react";
import ThemeProvider from "../../providers/ThemeProvider";
import ThemeToggleButton from "../ThemeToggleButton";

describe("ThemeToggleButton", () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it("renders with light theme by default", () => {
    renderWithTheme(<ThemeToggleButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    // Check if Sun icon is rendered (light theme)
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("toggles theme when clicked", () => {
    renderWithTheme(<ThemeToggleButton />);
    const button = screen.getByRole("button");

    // Initial state (light theme)
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();

    // Click to toggle to dark theme
    fireEvent.click(button);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    // Click again to toggle back to light theme
    fireEvent.click(button);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("persists theme preference in localStorage", () => {
    renderWithTheme(<ThemeToggleButton />);
    const button = screen.getByRole("button");

    // Toggle to dark theme
    fireEvent.click(button);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Toggle back to light theme
    fireEvent.click(button);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
