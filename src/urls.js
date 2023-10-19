const urls = {
  integrations: {
    init: integrationTool => integrationTool ? `/api/integrations/init?integration_tool=${integrationTool}` : '/api/integrations/init',
    activate: '/api/integrations/activate',
  }
}

export default urls
