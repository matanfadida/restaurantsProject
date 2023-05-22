import { render, fireEvent, screen } from '@testing-library/react';
import ButtonGroup from '../components/UI/ButtonGroup';

const mockButtons = [
  { id: 1, name: 'Button 1', onClick: jest.fn() },
  { id: 2, name: 'Button 2', onClick: jest.fn() },
  { id: 3, name: 'Button 3', onClick: jest.fn() },
];

describe('ButtonGroup', () => {
  beforeEach(() => {
    render(<ButtonGroup buttons={mockButtons} focus={1} />);
  });

  test('renders all buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(mockButtons.length);
  });

  test('sets the initial focus button', () => {
    const focusedButton = screen.getByRole('button', { name: /Button 1/i });
    expect(focusedButton).toHaveClass('clicked');
  });

  test('changes focus and triggers onClick when a button is clicked', () => {
    const buttonToClick = screen.getByRole('button', { name: /Button 2/i });
    fireEvent.click(buttonToClick);
    expect(buttonToClick).toHaveClass('clicked');
    expect(mockButtons[1].onClick).toHaveBeenCalled();
  });

  test('updates focus and triggers onClick for another button', () => {
    const initialButton = screen.getByRole('button', { name: /Button 1/i });
    const newButton = screen.getByRole('button', { name: /Button 3/i });

    fireEvent.click(newButton);

    expect(initialButton).not.toHaveClass('clicked');
    expect(newButton).toHaveClass('clicked');
    expect(mockButtons[2].onClick).toHaveBeenCalled();
  });
});
