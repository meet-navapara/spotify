import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import  {store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00C853', 
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
  },
});
function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppRoutes />
        <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
      </PersistGate >
    </Provider>
  );
}

export default App;