// App.test.tsx
import { render } from '@testing-library/react';
import App from '../App';
window.HTMLElement.prototype.scrollIntoView = jest.fn();

test('renders App without crashing', () => {
  render(<App />);
});