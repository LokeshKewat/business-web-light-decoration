import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Add type declaration
declare global {
  interface Window {
    ROUTER_WARNINGS: boolean;
  }
}

// Silence React Router deprecation warnings
window.ROUTER_WARNINGS = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
