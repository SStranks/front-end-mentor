import { useCallback, useRef } from 'react';

function useComponentIdGenerator(): () => number {
  const ref = useRef(-1);

  return useCallback(() => {
    ref.current += 1;
    return ref.current;
  }, []);
}

export default useComponentIdGenerator;
