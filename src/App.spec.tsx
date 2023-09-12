import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('Showed the Hello World message', () => {
    render(<App />);

    screen.getByText(/Hello world!/i);
  });
});
