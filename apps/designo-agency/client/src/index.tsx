import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '#Components/App';
import ScrollToTop from '#Hooks/ScrollToTop';

import '#Sass/global-imports.scss';

const container = document.querySelector('#root');
const root = createRoot(container!);
// Alternative method to avoid non-null assertion:
// const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
