import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import  {store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
      </PersistGate >
    </Provider>
  );
}

export default App;