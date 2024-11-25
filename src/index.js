import React from 'react';
import ReactDOM from 'react-dom/client'; // Impor dari 'react-dom/client' untuk createRoot
import App from './App';

// Gunakan createRoot untuk merender aplikasi Anda
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
