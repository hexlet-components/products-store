// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// MantineProvider на монтировании читает системную тему через matchMedia, а
// jsdom этот метод не реализует: без заглушки любой тест с рендером падает
// «window.matchMedia is not a function», и выглядит это как поломка компонента.
// Проверка на window обязательна: тесты сервера идут в окружении node, и этот
// же файл выполняется и для них.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
