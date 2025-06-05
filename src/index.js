// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App';
import './styles/global.css';
import './styles/animations.css';

// Inisialisasi Google Analytics
ReactGA.initialize('G-XXXXXXXXXX'); // Ganti dengan Tracking ID Anda
ReactGA.send('pageview');

// Inisialisasi Hotjar (opsional, hapus jika tidak digunakan)
const HOTJAR_ID = 'YOUR_HOTJAR_ID'; // Ganti dengan ID Hotjar Anda
if (HOTJAR_ID !== 'YOUR_HOTJAR_ID') {
  (function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);