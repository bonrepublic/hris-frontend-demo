const urls = {
  integrations: {
    init: integrationTool => `/api/integrations/init?integration_tool=${integrationTool}`,
    activate: '/api/integrations/activate',
  }
}

export default urls
