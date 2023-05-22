import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import SearchBox from "../components/UI/SearchBox";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe("SearchBox component", () => {
  test("navigates with correct filter value on input change", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText("חפש כאן");
    fireEvent.change(inputElement, { target: { value: "example" } });

    expect(mockNavigate).toHaveBeenCalledWith("/?filter=example");
  });
  test("renders the search box with the correct placeholder text", () => {
    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText("חפש כאן");
    expect(inputElement).toBeInTheDocument();
  });

  test('navigates to home page with empty filter value on input clear', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText('חפש כאן');
    fireEvent.change(inputElement, { target: { value: 'example' } });
    fireEvent.change(inputElement, { target: { value: '' } });

    expect(mockNavigate).toHaveBeenCalledWith("/?filter=");
  });


});
