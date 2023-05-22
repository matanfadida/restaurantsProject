import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chef from "../components/cuisine/chef";

describe("Chef component", () => {
  test("renders maker", () => {
    render(<Chef />);

    const helloWorldElement = screen.getByText("cuisine", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders maker bar if button pressed", () => {
    render(<Chef />);

    const buttonElement = screen.getByText('בר');
    userEvent.click(buttonElement)

    const helloWorldElement = screen.getByText("bar", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders maker chef if  button pressed", () => {
    render(<Chef />);

    const buttonElement1 = screen.getByText('בר');
    userEvent.click(buttonElement1)

    const buttonElement = screen.getByText('מטבח');
    userEvent.click(buttonElement)

    const helloWorldElement = screen.getByText("cuisine", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('chefList is loaded', () => {
    // Render the Chef component
    render(<Chef />);
    
    // Find the element that contains the chefList
    const chefListElement = screen.getByRole('list');
    
    // Assert that the chefList is present in the DOM
    expect(chefListElement).toBeInTheDocument();
  });
});
