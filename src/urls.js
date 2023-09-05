const urls = {
    integrations: {
        init: integrationTool => `/api/integrations/init?integration_tool=${integrationTool}`,
        activate: '/api/integrations/activate',
        list: '/api/integrations_preview/',
        removeIntegration: integrationId => `/api/integrations/${integrationId}`,
        getEmployeeData: (integrationId, onlyLatest) => `/api/employees/${integrationId}/${onlyLatest ? '?only_latest=true' : ''}`,
    }
}

export default urls
