import { showKomboConnect } from '@kombo-api/connect'
import urls from './urls'

async function getKomboConnectLink(integration_tool) {
  const response = await fetch(urls.integrations.init(integration_tool))
  const data = await response.json()
  return data.link
}

async function activateKomboIntegration(token) {
  await fetch(urls.integrations.activate, {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
}

export async function connectHris(integration_tool) {
  const link = await getKomboConnectLink(integration_tool)

  const activationToken = await showKomboConnect(link)

  await activateKomboIntegration(activationToken)
}
