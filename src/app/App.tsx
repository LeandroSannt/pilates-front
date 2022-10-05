import { ToastContainer } from 'react-toastify';

import { AppRoutes } from './routes';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
