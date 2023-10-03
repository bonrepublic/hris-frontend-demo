import React from 'react';
import { showKomboConnect } from '@kombo-api/connect'
import { useAuth } from 'react-oidc-context';
import urls from './urls';

import './App.css';

function App() {
  const auth = useAuth();
  console.log(auth.user?.id_token)

  async function getKomboConnectLink(integration_tool) {
    const authToken = auth.user?.id_token;
    const response = await fetch(
      urls.integrations.init(integration_tool),
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const data = await response.json();
    return data.link
  }

  async function activateKomboIntegration(activationToken) {
    const authToken = auth.user?.id_token;
    await fetch(urls.integrations.activate, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ activationToken }),
    })
  }

  async function connectHris(integration_tool) {
    const link = await getKomboConnectLink(integration_tool)
    const activationToken = await showKomboConnect(link)
    await activateKomboIntegration(activationToken)
  }

  return (
    <div className="App">
      {
        auth.isAuthenticated ? (
          <>
            <button onClick={() => connectHris('personio')}>
              add Personio
            </button>
            <br />
            <button onClick={() => connectHris('googleworkspace')}>
              add Google Workspace
            </button>
          </>
        ) : (
          <button onClick={() => void auth.signinRedirect()}>Log in</button>
        )
      }
    </div>
  )
}

export default App;
