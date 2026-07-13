import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import RootModal from '@Components/modal/RootModal';
import { useAppDispatchContext, useAppStateContext } from '@Context/AppContext';
// import { useLoadingUpdate } from '@Context/LoadingContext';
// import { useRootModalContext } from '@Context/RootModalContext';
import Home from '@Pages/Home';
// import ApiService from '@Services/Services';

const INITIAL_ACTIVEBOARD = globalThis.localStorage.getItem('active-board');

function App(): JSX.Element {
  // const setLoadingUpdate = useLoadingUpdate();
  // const rootModalDispatch = useRootModalContext();
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
        globalThis.localStorage.setItem('boards-taskOrder', appState.localStorageData);
        appDispatch({
          localStorage: { localStoragePending: false },
          type: 'localStoragePending',
        });
      }
    };
    document.addEventListener('visibilitychange', saveTaskOrderToLocalStorage);
    return () => document.removeEventListener('visibilitychange', saveTaskOrderToLocalStorage);
  }, [appDispatch, appState.localStorageData, appState.localStoragePending]);

  // useEffect(() => {
  //   // Fetch data from backend
  //   void (async function fetchData() {
  //     setLoadingUpdate(true);
  //     try {
  //       const responseData = await ApiService.getAllBoards();
  //       if (!responseData) throw new Error('Unable to get boards!');

  //       // Set API Data into local state
  //       return appDispatch({
  //         payload: { data: responseData },
  //         type: 'set-initial',
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       return rootModalDispatch({
  //         modalProps: { title: 'App' },
  //         modalType: 'error',
  //         type: 'open-modal',
  //       });
  //     } finally {
  //       setLoadingUpdate(false);
  //     }
  //   })();
  // }, [appDispatch, rootModalDispatch, setLoadingUpdate]);

  useEffect(() => {
    // Always set current active board to local storage
    globalThis.localStorage.setItem('active-board', activeBoardId);
  }, [activeBoardId]);

  const boardsList = appState.boards.map((board) => ({
    id: board._id,
    name: board.name,
  }));

  const activeBoard = appState.boards.find((item) => item._id === activeBoardId);

  const data = { activeBoard, boardsList };

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
