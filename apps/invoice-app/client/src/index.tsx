// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import QueryClientProvider from '#Lib/ReactQuery';

import App from './components/App';

import './assets/sass/global-imports.scss';

const container = document.querySelector('#root');
const root = createRoot(container!);
// Alternative method to avoid non-null assertion:
// const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <QueryClientProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
