import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import  {store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <CssBaseline />
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
      </PersistGate >
    </Provider>
  );
}

export default App;