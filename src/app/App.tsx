import { ToastContainer } from 'react-toastify';

import { AppRoutes } from './routes';

import 'react-toastify/dist/ReactToastify.min.css';
import 'moment/locale/pt-br'
import moment from 'moment'


function App() {
moment.locale('pt-br')

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
