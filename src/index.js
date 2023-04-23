import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.min.css'
import './assets/css/slicknav.min.css'
import './assets/css/style.css'
import App from './App';
import { HelmetProvider } from 'react-helmet-async'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </div>
);

