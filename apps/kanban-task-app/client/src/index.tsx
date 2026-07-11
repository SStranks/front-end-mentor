import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '#Components/App';
import { AppProvider } from '#Context/AppContext';
import { LoadingProvider } from '#Context/LoadingContext';
import { RootModalProvider } from '#Context/RootModalContext';

// import { ErrorFallback } from '#Components/ui/RollbarErrorFallback';
// import { RollbarErrorBoundary, RollbarProvider } from '#Lib/Rollbar';
import '@Sass/global-imports.scss';

const container = document.querySelector('#root');
const root = createRoot(container as Element);

root.render(
  // <RollbarProvider>
  //   <RollbarErrorBoundary fallbackUI={ErrorFallback}>
  <React.StrictMode>
    <BrowserRouter>
      <RootModalProvider>
        <LoadingProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </LoadingProvider>
      </RootModalProvider>
    </BrowserRouter>
  </React.StrictMode>
  //   </RollbarErrorBoundary>
  // </RollbarProvider>
);
