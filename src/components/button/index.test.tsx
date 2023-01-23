import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './index';

test('renders learn react link', () => {
  render(<Button>click me</Button>);
  const linkElement = screen.getByText(/click me/i);
  expect(linkElement).toBeInTheDocument();
});
