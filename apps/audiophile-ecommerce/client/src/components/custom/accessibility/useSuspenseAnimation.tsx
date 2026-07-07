import type { ComponentType } from 'react';

import { lazy, useCallback, useState } from 'react';

// https://stackoverflow.com/a/61598220/20274651
/*
Possible State transitions: LAZY -> IMPORT_FINISHED -> ENABLED
- LAZY: React suspense hasn't been triggered yet.
- IMPORT_FINISHED: dynamic import has completed, now we can trigger animations.
- ENABLED: Deferred component will now be displayed
*/

type LazyModule = {
  default: ComponentType;
};

function deferPromise() {
  let resolve: unknown;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });
  return { promise, resolve } as {
    promise: Promise<unknown>;
    resolve: () => void;
  };
}

function useSuspenseAnimation(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [state, setState] = useState(init);

  console.log(path);

  const enableComponent = useCallback(() => {
    if (state.status === 'IMPORT_FINISHED') {
      setState((prev) => ({ ...prev, status: 'ENABLED' }));
      state.deferred.resolve();
    }
  }, [state]);

  return {
    DeferredComponent: state.DeferredComponent,
    enableComponent,
    hasImportFinished: state.status === 'IMPORT_FINISHED',
  };

  function init() {
    const deferred = deferPromise();
    // component object reference  is kept stable, since it's stored in state.
    // TODO:  Need to get dynamic import path into import();
    const DeferredComponent = lazy(() =>
      Promise.all([
        (import(`#Pages/${path}`) as Promise<LazyModule>).then((imp) => {
          // triggers re-render, so containing component can react
          setState((prev) => ({ ...prev, status: 'IMPORT_FINISHED' }));
          return imp;
        }),
        deferred.promise,
      ]).then(([imp]) => imp)
    );

    return {
      deferred,
      DeferredComponent,
      status: 'LAZY',
    };
  }
}

export default useSuspenseAnimation;
