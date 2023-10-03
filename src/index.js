import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';

import App from './App';

import './index.css';

const oidcConfig = {
  client_id: 'myclient',
  client_secret: 'nij6CNWMcutMK0DkTyxW5orTOFQfCBha',
  authority: `${window.location.origin}/auth/realms/myrealm`,
  redirect_uri: window.location.origin,
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);
