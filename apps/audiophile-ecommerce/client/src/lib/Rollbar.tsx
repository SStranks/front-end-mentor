import type { PropsWithChildren } from 'react';
import type Rollbar from 'rollbar';

import type { IErrorFallbackProps } from '#Components/ui/RollbarErrorFallback';

import { ErrorBoundary, Provider } from '@rollbar/react';

interface IErrorBoundary {
  fallbackUI: React.ComponentType<IErrorFallbackProps> | undefined;
}

const rollbarConfig: Rollbar.Configuration = {
  accessToken: process.env['ROLLBAR_POST_CLIENT_ITEM'],
  enabled: !!process.env['ROLLBAR_ENABLED'],
  environment: process.env['NODE_ENV'],
};

function RollbarProvider(props: PropsWithChildren): JSX.Element {
  const { children } = props;
  return <Provider config={rollbarConfig}>{children}</Provider>;
}

function RollbarErrorBoundary(props: PropsWithChildren<IErrorBoundary>) {
  const { children, fallbackUI } = props;
  return <ErrorBoundary fallbackUI={fallbackUI}>{children}</ErrorBoundary>;
}

export { RollbarErrorBoundary, RollbarProvider };
