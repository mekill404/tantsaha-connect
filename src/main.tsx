import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import '@fortawesome/fontawesome-free/css/all.min.css';

registerSW({ 
  immediate: true,
  onRegistered() {
    console.log('Service Worker enregistré !');
  },
  onRegisterError(error: any) {
    console.error('Erreur SW:', error);
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);