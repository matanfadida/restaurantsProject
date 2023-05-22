import Contact from "../pages/contact";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Contact component", () => {
  test('renders "contact" as a text', () => {
    render(<Contact />);

    const helloWorldElement = screen.getByText("צרו איתנו קשר");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "tell us" as a text', () => {
    render(<Contact />);

    const helloWorldElement = screen.getByText("ספרו לנו", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
