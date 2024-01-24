import React, { PropsWithChildren, useContext, useState } from 'react';

export type TRootModalContextAction = {
  type: string;
  modalType?: string;
  modalProps?: { [key: string]: unknown };
};

export type TRootModalDispatchContext = React.Dispatch<TRootModalContextAction>;
export type TRootModalDispatchUpdateContext = React.Dispatch<React.SetStateAction<TRootModalDispatchContext>>;

const RootModalDispatchContext = React.createContext<TRootModalDispatchContext | undefined>(
  {} as TRootModalDispatchContext
);

const RootModalDispatchUpdateContext = React.createContext<TRootModalDispatchUpdateContext | undefined>(undefined);

export function useRootModalContext() {
  const context = useContext(RootModalDispatchContext);
  if (context === undefined) throw new Error('RootModalDispatchContext outside of scope');
  return context;
}

export function useRootModalUpdateContext() {
  const context = useContext(RootModalDispatchUpdateContext);
  if (context === undefined) throw new Error('RootModalDispatchUpdateContext outside of scope');
  return context;
}

export function RootModalProvider({ children }: PropsWithChildren) {
  const [rootModalDispatch, setRootModalDispatch] = useState<TRootModalDispatchContext>(
    {} as TRootModalDispatchContext
  );

  return (
    <RootModalDispatchContext.Provider value={rootModalDispatch}>
      <RootModalDispatchUpdateContext.Provider value={setRootModalDispatch}>
        {children}
      </RootModalDispatchUpdateContext.Provider>
    </RootModalDispatchContext.Provider>
  );
}
