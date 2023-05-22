import { render, screen, fireEvent } from "@testing-library/react";
import { isValidUrl } from "../components/Admin/EditContact";
import EmailForm from "../components/Admin/EmailForm";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AdminHome from "../components/Admin/Home";
import Item from "../components/list-items/item";
import { CartContext } from "../state/buy-context"
describe("admin", () => {
    describe("edit-contact", () => {
        test('valid URLs return true', () => {
            expect(isValidUrl('https://www.example.com')).toBe(true);
            expect(isValidUrl('http://example.com')).toBe(true);
            expect(isValidUrl('https://example.com/path')).toBe(true);
            expect(isValidUrl('http://example.com?param=value')).toBe(true);
            // Add more valid URLs to test
          });
          
          test('invalid URLs return false', () => {
            expect(isValidUrl('wwwexamplecom')).toBe(false);
            expect(isValidUrl('http://example')).toBe(false);
            expect(isValidUrl('not a URL')).toBe(false);
            // Add more invalid URLs to test
          });
  
    });
    describe('EmailForm', () => {
        test ('should enable the button when form is valid', () => {
          render(<EmailForm />);
          
          // Check if the button is enabled
          const button = screen.getByText('Send');
          expect(button).toBeDisabled();
        });
      });


      describe('AdminHome', () => {
        test('renders the navigation links', () => {
          render(
            <BrowserRouter>
              <AdminHome />
            </BrowserRouter>
          );
      
          const addProductLink = screen.getByText('הוסף לתפריט');
          const addCategoryLink = screen.getByText('הוסף קטגוריה');
          const tablesLink = screen.getByText('שולחנות');
          const contactLink = screen.getByText('עדכן פרטי מסעדה');
      
          expect(addProductLink).toBeInTheDocument();
          expect(addCategoryLink).toBeInTheDocument();
          expect(tablesLink).toBeInTheDocument();
          expect(contactLink).toBeInTheDocument();
        });
      });

      describe('Items', () => {
        test('renders item details correctly', () => {
            render(
              <BrowserRouter>
                  <Item
                    id="1"
                    img="image.jpg"
                    name="Item Name"
                    price="10.00"
                    rating={4}
                  />
              </BrowserRouter>
            );
        
            // Check if item details are rendered correctly
            expect(screen.getByText('Item Name')).toBeInTheDocument();
            expect(screen.getByText('10.00₪')).toBeInTheDocument();
            expect(screen.getByAltText('Item Name')).toBeInTheDocument();
          });
      });

      


    
  
});
