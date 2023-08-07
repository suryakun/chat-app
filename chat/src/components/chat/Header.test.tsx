import { describe, expect, test }  from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders Header component', () => {
    render(<Header title='testing' />);
    expect(screen.getByText(/testing/i)).toBeDefined();
  });
});