import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Din räntekostnad', () => {
  render(<App />);
  const linkElement = screen.getByText(/din räntekostnad/i);
  expect(linkElement).toBeInTheDocument();
});
