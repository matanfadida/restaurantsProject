import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Rate from '../components/Rating/rate';

describe('Rate', () => {
  const mockProduct = {
    id: 1,
    name: 'Product A',
  };

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url.endsWith('/api/get-product')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProduct),
        });
      }
      if (url.endsWith('/api/update-rating/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve('ok'),
        });
      }
      return Promise.resolve({
        ok: false,
      });
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('displays product name and rating stars', () => {
    render(
      <MemoryRouter initialEntries={['/rate/1']}>
        <Routes>
          <Route path="/rate/:productId" element={<Rate />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Mock the product data
    const mockProduct = {
      id: 1,
      name: 'Product A',
    };
  
    // Use waitFor to wait for the product data to be fetched and displayed
    waitFor(() => {
      // Check if the product name is displayed
      const productName = screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'h2' && content.includes(mockProduct.name);
      });
      expect(productName).toBeInTheDocument();
  
      // Check if the rating stars are displayed
      const starRating = screen.getAllByRole('img', { name: /star/i });
      expect(starRating.length).toBe(5);
    });
  });



  
});
