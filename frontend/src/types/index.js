// Type definitions for reference (not used in JS)
// These are kept for documentation purposes

export const User = {
  _id: 'string',
  name: 'string',
  email: 'string',
  role: 'admin | officer | official | citizen',
  createdAt: 'string',
}

export const WaterBody = {
  _id: 'string',
  name: 'string',
  location: {
    type: 'Point',
    coordinates: '[number, number]',
  },
  district: 'string',
  area: 'number',
  category: 'lake | pond | wetland | reservoir | river',
  status: 'healthy | moderate | critical',
  healthScore: 'number',
  createdAt: 'string',
  updatedAt: 'string',
}

export const Survey = {
  _id: 'string',
  waterBodyId: 'string',
  officerId: 'string',
  officerName: 'string',
  waterLevel: 'string',
  waterQuality: 'string',
  pollutionObserved: 'boolean',
  encroachmentObserved: 'boolean',
  remarks: 'string',
  images: 'string[]',
  createdAt: 'string',
}

export const WaterQualityRecord = {
  _id: 'string',
  waterBodyId: 'string',
  do: 'number',
  ph: 'number',
  bod: 'number',
  nitrate: 'number',
  fecalColiform: 'number',
  totalColiform: 'number',
  temperature: 'number',
  date: 'string',
}

export const Alert = {
  _id: 'string',
  waterBodyId: 'string',
  waterBodyName: 'string',
  type: 'pollution | low_oxygen | contamination | encroachment',
  severity: 'low | medium | high | critical',
  message: 'string',
  timestamp: 'string',
  resolved: 'boolean',
}

export const CitizenReport = {
  _id: 'string',
  waterBodyId: 'string',
  reporterName: 'string',
  reporterEmail: 'string',
  reporterPhone: 'string',
  issueType: 'string',
  description: 'string',
  images: 'string[]',
  location: {
    type: 'Point',
    coordinates: '[number, number]',
  },
  status: 'pending | verified | rejected',
  createdAt: 'string',
}

export const DashboardStats = {
  totalWaterBodies: 'number',
  healthyWaterBodies: 'number',
  moderateWaterBodies: 'number',
  criticalWaterBodies: 'number',
  activeAlerts: 'number',
  surveysCompleted: 'number',
  citizenReports: 'number',
}
