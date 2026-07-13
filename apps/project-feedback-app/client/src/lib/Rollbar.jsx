import { ErrorBoundary, Provider } from '@rollbar/react';

import { ENV } from '@Config/env';

const rollbarConfig = {
  enabled: ENV.rollbarEnabled,
  endpoint: `${ENV.apiHost}/rollbar`,
  environment: ENV.mode,
};

console.log('test');

function RollbarProvider({ children }) {
  return <Provider config={rollbarConfig}>{children}</Provider>;
}

function RollbarErrorBoundary({ children, fallbackUI }) {
  return <ErrorBoundary fallbackUI={fallbackUI}>{children}</ErrorBoundary>;
}

export { RollbarErrorBoundary, RollbarProvider };
