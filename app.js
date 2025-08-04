const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Import routes
const pexelsRoutes = require('./routes/pexelsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Use routes
app.use('/api/pexels', pexelsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Sample array of links
const links = [
  {
    id: 1,
    title: 'Google',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Search engine'
  },
  {
    id: 2,
    title: 'GitHub',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Code hosting platform'
  },
  {
    id: 3,
    title: 'Stack Overflow',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Developer community'
  }
];

// API endpoint to get all links
app.get('/api/links', (req, res) => {
  try {
    res.json({
      success: true,
      data: links,
      count: links.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// API endpoint to get a specific link by ID
app.get('/api/links/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const link = links.find(link => link.id === id);
    
    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }
    
    res.json({
      success: true,
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Pexels Video API Integration',
    version: '1.0.0',
    endpoints: {
      // Original Links API
      getAllLinks: 'GET /api/links',
      getLinkById: 'GET /api/links/:id',
      
      // Pexels Video API Endpoints
      pexels: {
        searchVideos: 'GET /api/pexels/search?query=nature&per_page=15&page=1',
        popularVideos: 'GET /api/pexels/popular?per_page=15&page=1',
        videoDetails: 'GET /api/pexels/video/:videoId',
        curatedVideos: 'GET /api/pexels/curated?per_page=15&page=1',
        categorySearch: 'GET /api/pexels/category/:category?per_page=15&page=1',
        trendingVideos: 'GET /api/pexels/trending?per_page=15&page=1',
        searchWithFilters: 'GET /api/pexels/search/filters?query=nature&orientation=landscape&size=large',
        videoStats: 'GET /api/pexels/video/:videoId/stats',
        apiStatus: 'GET /api/pexels/status'
      },
      
      // Analytics API Endpoints
      analytics: {
        videoAnalytics: 'GET /api/analytics/video/:videoId/analytics',
        collectionAnalytics: 'GET /api/analytics/collection/analytics?per_page=50',
        trendingAnalysis: 'GET /api/analytics/trending/analysis?max_count=20',
        recommendations: 'GET /api/analytics/recommendations?content_type=videos&max_count=10'
      }
    },
    documentation: {
      pexelsApi: 'https://www.pexels.com/api/documentation/',
      setup: 'API key is already configured in config.js'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Pexels Video API Server is running on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/`);
  console.log(`🎬 Pexels Video API Base: http://localhost:${PORT}/api/pexels`);
  console.log(`📈 Analytics API Base: http://localhost:${PORT}/api/analytics`);
  console.log(`🚀 Start with: GET http://localhost:${PORT}/api/pexels/search?query=nature to search videos!`);
});
