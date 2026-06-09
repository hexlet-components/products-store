import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './locales/index';
import appStore from './store';

const products = [
  {
    id: 1,
    title: 'Test product',
    description: 'Test description',
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 5,
    brand: 'Test brand',
    category: 'test-category',
    thumbnail: 'https://example.com/thumbnail.jpg',
  },
  {
    id: 2,
    title: 'Another product',
    description: 'Another description',
    price: 50,
    discountPercentage: 5,
    rating: 4.0,
    stock: 3,
    brand: 'Test brand',
    category: 'test-category',
    thumbnail: 'https://example.com/thumbnail2.jpg',
  },
];

beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(
      JSON.stringify({
        products,
        total: products.length,
        skip: 0,
        limit: 30,
      }),
    ),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders the app with fetched products', async () => {
  render(
    <MemoryRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </MemoryRouter>,
  );

  expect(screen.getByText('Hexlet Store')).toBeInTheDocument();
  expect(await screen.findByText('Test product')).toBeInTheDocument();
});
