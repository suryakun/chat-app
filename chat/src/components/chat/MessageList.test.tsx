import { describe, expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';
import MessageList from '@/components/chat/MessageList';

describe('MessageList', () => {
  test('renders MessageList component', () => {
    render(<MessageList />);
    expect(screen.getByText(/Loading.../i)).toBeDefined();
  });
});
