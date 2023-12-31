import { showKomboConnect } from '@kombo-api/connect'
import urls from './urls'

async function getKomboConnectLink(integration_tool) {
  const response = await fetch(urls.integrations.init(integration_tool))
  const data = await response.json()
  return data.link
}

async function activateKomboIntegration(activationToken) {
  await fetch(urls.integrations.activate, {
    method: 'POST',
    body: JSON.stringify({ activationToken }),
  })
}

export async function connectHris(integration_tool) {
  const link = await getKomboConnectLink(integration_tool)
  let activationToken = null;
  try {
    activationToken = await showKomboConnect(link)
  } catch (e) { return }
  await activateKomboIntegration(activationToken)
}
