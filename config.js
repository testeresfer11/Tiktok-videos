// Pexels API Configuration
module.exports = {
  pexels: {
    apiKey: process.env.PEXELS_API_KEY || 'pOaTEVcqlh4xF2tIqEyEOgRaB85CpeSo9WPR957UrfitM8Buz3K2nzAb',
    apiBaseUrl: 'https://api.pexels.com/videos',
    apiVersion: 'v1'
  },
  server: {
    port: process.env.PORT || 3003,
    nodeEnv: process.env.NODE_ENV || 'development'
  }
}; 