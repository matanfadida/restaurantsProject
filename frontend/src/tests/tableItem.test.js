import TableItem from "../components/Table/TableItem";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('TableItem', () => {
  test('renders table details correctly', () => {
    const table = 1;
    const totalPrice = 100;
    const paid = 50;

    render(
      <BrowserRouter>
        <TableItem table={table} totalPrice={totalPrice} paid={paid} />
      </BrowserRouter>
    );

    const tableTitle = screen.getByRole('heading', { name: /שולחן 1/i });
    const orderDetailLink = screen.getByRole('link', { name: /פירוט הזמנה/i });
    const totalPriceText = screen.getByText(/סה"כ מחיר הזמנה : 100₪/i);
    const paidText = screen.getByText(/שולם: 50₪/i);
    const remainingText = screen.getByText(/נותר לשלם: 50₪/i);

    expect(tableTitle).toBeInTheDocument();
    expect(orderDetailLink).toHaveAttribute('href', '/1');
    expect(totalPriceText).toBeInTheDocument();
    expect(paidText).toBeInTheDocument();
    expect(remainingText).toBeInTheDocument();
  });
  test('renders order detail link correctly', () => {
    const table = 5;
    const totalPrice = 200;
    const paid = 100;

    render(
      <BrowserRouter>
        <TableItem table={table} totalPrice={totalPrice} paid={paid} />
      </BrowserRouter>
    );

    const orderDetailLink = screen.getByRole('link', { name: /פירוט הזמנה/i });

    expect(orderDetailLink).toHaveAttribute('href', '/5');
  });
  test('renders total price correctly', () => {
    const table = 7;
    const totalPrice = 300;
    const paid = 200;

    render(
      <BrowserRouter>
        <TableItem table={table} totalPrice={totalPrice} paid={paid} />
      </BrowserRouter>
    );

    const totalPriceText = screen.getByText(/סה"כ מחיר הזמנה : 300₪/i);

    expect(totalPriceText).toBeInTheDocument();
  });
  test('renders paid amount correctly', () => {
    const table = 9;
    const totalPrice = 400;
    const paid = 250;

    render(
      <BrowserRouter>
        <TableItem table={table} totalPrice={totalPrice} paid={paid} />
      </BrowserRouter>
    );

    const paidText = screen.getByText(/שולם: 250₪/i);

    expect(paidText).toBeInTheDocument();
  });
  test('renders remaining amount correctly', () => {
    const table = 11;
    const totalPrice = 500;
    const paid = 300;

    render(
      <BrowserRouter>
        <TableItem table={table} totalPrice={totalPrice} paid={paid} />
      </BrowserRouter>
    );

    const remainingText = screen.getByText(/נותר לשלם: 200₪/i);

    expect(remainingText).toBeInTheDocument();
  });
});
