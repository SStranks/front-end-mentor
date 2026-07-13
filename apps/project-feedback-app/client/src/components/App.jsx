import { Route, Routes } from 'react-router-dom';

import { UserProvider } from '@Context/UserContext';
import useRequests from '@Hooks/useGetAllRequests';
import Toaster from '@Lib/ReactHotToast';
import { Feedback, Home, Roadmap } from '@Pages/';

function App() {
  const [requests, isLoading] = useRequests();

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home requests={requests} isLoading={isLoading} />} />
        <Route path="/feedback" element={<Feedback requests={requests} />} />
        <Route path="/roadmap" element={<Roadmap requests={requests} />} />
      </Routes>
      <Toaster />
    </UserProvider>
  );
}

export default App;
