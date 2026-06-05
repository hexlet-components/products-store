import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './locales/index';
import { createStore } from './store';

beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(
      JSON.stringify({
        products: [],
        total: 0,
        skip: 0,
        limit: 30,
      }),
    ),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders the app', () => {
  render(
    <MemoryRouter>
      <Provider store={createStore()}>
        <App />
      </Provider>
    </MemoryRouter>,
  );

  const brandElement = screen.getByText('Hexlet Store');
  expect(brandElement).toBeInTheDocument();
});
