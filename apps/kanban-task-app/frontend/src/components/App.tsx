import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RootModal from '#Components/modal/RootModal';
import { useAppDispatchContext, useAppStateContext } from '#Context/AppContext';
import { useLoadingUpdate } from '#Context/LoadingContext';
import { useRootModalContext } from '#Context/RootModalContext';
import Home from '#Pages/Home';
import ApiService from '#Services/Services';

const INITIAL_ACTIVEBOARD = window.localStorage.getItem('active-board');

function App(): JSX.Element {
  const setLoadingUpdate = useLoadingUpdate();
  const rootModalDispatch = useRootModalContext();
  const appState = useAppStateContext();
  const appDispatch = useAppDispatchContext();
  // const [state, appDispatch] = useAppReducer({
  //   boards: [],
  //   localStoragePending: false,
  //   localStorageData: undefined,
  // });
  const [activeBoardId, setActiveBoardId] = useState<string>(INITIAL_ACTIVEBOARD || '');

  console.log('APP RENDER');

  // Commit tasks ordering to localStorage when tab/browser visibility changes and data is pending
  useEffect(() => {
    const saveTaskOrderToLocalStorage = () => {
      if (document.visibilityState === 'hidden' && appState.localStoragePending && appState.localStorageData) {
        window.localStorage.setItem('boards-taskOrder', appState.localStorageData);
        appDispatch({
          type: 'localStoragePending',
          localStorage: { localStoragePending: false },
        });
      }
    };
    document.addEventListener('visibilitychange', saveTaskOrderToLocalStorage);
    return () => document.removeEventListener('visibilitychange', saveTaskOrderToLocalStorage);
  }, [appDispatch, appState.localStorageData, appState.localStoragePending]);

  useEffect(() => {
    // Fetch data from backend
    (async function fetchData() {
      setLoadingUpdate(true);
      try {
        const responseData = await ApiService.getAllBoards();
        if (!responseData) throw new Error('Unable to get boards!');

        // Set API Data into local state
        return appDispatch({
          type: 'set-initial',
          payload: { data: responseData },
        });
      } catch (error) {
        console.error(error);
        return rootModalDispatch({
          type: 'open-modal',
          modalType: 'error',
          modalProps: { title: 'App' },
        });
      } finally {
        setLoadingUpdate(false);
      }
    })();
  }, [appDispatch, rootModalDispatch, setLoadingUpdate]);

  useEffect(() => {
    // Always set current active board to local storage
    window.localStorage.setItem('active-board', activeBoardId);
  }, [activeBoardId]);

  const boardsList = appState.boards?.map((board) => ({
    name: board.name,
    id: board._id,
  }));

  const activeBoard = appState.boards?.find((item) => item._id === activeBoardId);

  const data = { boardsList, activeBoard };

  return (
    // <AppDispatchContext.Provider value={appDispatch}>
    //   <AppStateContext.Provider value={appState as TAppStateContext}>
    <>
      <RootModal activeBoardId={activeBoardId} />
      <Routes>
        <Route
          path="/"
          element={<Home boardData={data} activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />}
        />
      </Routes>
    </>
    //   </AppStateContext.Provider>
    // </AppDispatchContext.Provider>
  );
}

export default App;
