import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'sonner';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Toaster richColors position="top-right" />
          <App />
        </ClerkProvider>
      </Provider>
    </StrictMode>,
  </BrowserRouter>
)
