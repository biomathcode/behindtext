import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './instrument'; // Import Sentry configuration first
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);