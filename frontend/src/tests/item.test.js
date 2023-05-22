import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Item from "../components/list-items/item";


describe("Item component", () => {
  test("renders item with correct details", () => {
    const item = {
      id: "1",
      name: "Product 1",
      price: 10,
      img: "product1.jpg",
      rating: 4,
    };

    render(
      <BrowserRouter>
        <Item {...item} />
      </BrowserRouter>
    );

    const nameElement = screen.getByText("Product 1");
    const priceElement = screen.getByText("10₪");

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test("does not render delete button if not logged in", () => {
    const item = {
      id: "1",
      name: "Product 1",
      price: 10,
      img: "product1.jpg",
      rating: 4,
    };

    render(
      <BrowserRouter>
        <Item {...item} />
      </BrowserRouter>
    );

    const deleteButton = screen.queryByText("מחיקה");
    expect(deleteButton).toBeNull();
  });


});
