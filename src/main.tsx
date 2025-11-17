import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { defaultQueryClient } from './core/network/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={defaultQueryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
