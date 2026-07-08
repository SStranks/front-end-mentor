import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

const config = {
  // queryCache: {},
  // mutationCache: {},
  // logger: {},
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

const queryClient = new QueryClient(config);

function QueryClientProvider({ children }: PropsWithChildren) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}

export default QueryClientProvider;
