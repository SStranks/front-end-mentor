import React, { useContext } from 'react';
import { PropsWithChildren, useState } from 'react';

type TLoadingContext = boolean;
type TLoadingUpdateContext = React.Dispatch<React.SetStateAction<boolean>>;

const LoadingContext = React.createContext<TLoadingContext | undefined>(undefined);
const LoadingUpdateContext = React.createContext<TLoadingUpdateContext | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) throw new Error('LoadingContext outside of scope');
  return context;
}

export function useLoadingUpdate() {
  const context = useContext(LoadingUpdateContext);
  if (context === undefined) throw new Error('LoadingUpdateContext outside of scope');
  return context;
}

export function LoadingProvider({ children }: PropsWithChildren) {
  const [isLoadingApiData, setIsLoadingApiData] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={isLoadingApiData}>
      <LoadingUpdateContext.Provider value={setIsLoadingApiData}>{children}</LoadingUpdateContext.Provider>
    </LoadingContext.Provider>
  );
}
