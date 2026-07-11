import type { PropsWithChildren } from 'react';
import type Rollbar from 'rollbar';

import type { IErrorFallbackProps } from '#Components/ui/RollbarErrorFallback';

import { ErrorBoundary, Provider } from '@rollbar/react';

import { ENV } from '@Config/env';

interface IErrorBoundary {
  fallbackUI: React.ComponentType<IErrorFallbackProps> | undefined;
}

const rollbarConfig: Rollbar.Configuration = {
  accessToken: ENV.rollbarPostClientItem,
  enabled: ENV.rollbarEnabled,
  environment: ENV.mode,
  // endpoint: `${process.env.API_HOST}/rollbar`,
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
