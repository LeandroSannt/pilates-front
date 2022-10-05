import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import App from './app/App';
import { AuthProvider } from './app/shared/context/AuthProvider';
import { turnOnMirageJs } from './config/mirageJs';
import { queryClient } from './config/query-Client';
import './index.css';

import.meta.env.VITE_MOCK_ON === 'true' && turnOnMirageJs();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
