import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ShowItem from "../components/list-items/show-item";
import fetchMock from "jest-fetch-mock";

describe("ShowItem Component", () => {
  test("renders loading message when loading", () => {
    render(
      <BrowserRouter>
        <ShowItem />
      </BrowserRouter>
    );

    // Check if loading message is rendered
    expect(screen.getByText("loading..")).toBeInTheDocument();
  });
  test("renders items if request succeeds", async () => {
    // Mock the fetch request
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [
        // Simulate fetched items from the database
        {
          _id: "1",
          name: "Item 1",
          detail: "Item 1 detail",
          price: 10,
          image: "item1.jpg",
          rating: 4,
          amount: 1,
        },
        {
          _id: "2",
          name: "Item 2",
          detail: "Item 2 detail",
          price: 20,
          image: "item2.jpg",
          rating: 3,
          amount: 1,
        },
      ],
    });

    render(
      <BrowserRouter>
        <ShowItem />
      </BrowserRouter>
    );

    // Wait for the items to be rendered
    const listItemElements = await screen.findAllByRole("listitem");

    // Assertions
    expect(listItemElements).toHaveLength(2); // Check if two items are rendered
    expect(screen.getByText("Item 1")).toBeInTheDocument(); // Check if the text 'Item 1' is present
    expect(screen.getByText("Item 2")).toBeInTheDocument(); // Check if the text 'Item 2' is present
  });

  test('renders "no items found" message when search yields no results', async () => {
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(
      <BrowserRouter>
        <ShowItem />
      </BrowserRouter>
    );

    const noItemsElement = await screen.findByText(
      "לא נמצאו פריטים התואמים את החיפוש"
    );
    expect(noItemsElement).toBeInTheDocument();
  });

  
});
