import { clinicConfig } from '../configs/clinic.config.js'
import { homeServicesConfig } from '../configs/homeServices.config.js'
import { realEstateConfig } from '../configs/realEstate.config.js'

const routeConfigMap = {
  '/clinic': clinicConfig,
  '/real-estate': realEstateConfig,
  '/home-services': homeServicesConfig,
}

export function getIndustryConfig(routePath) {
  const normalizedPath = routePath?.startsWith('/') ? routePath : `/${routePath || ''}`
  const routeKey = `/${normalizedPath.split('/').filter(Boolean)[0] || ''}`

  return routeConfigMap[routeKey] || null
}

export const industryRoutes = Object.keys(routeConfigMap)
