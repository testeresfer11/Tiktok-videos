const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

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
    message: 'Welcome to Links API',
    endpoints: {
      getAllLinks: 'GET /api/links',
      getLinkById: 'GET /api/links/:id'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/links`);
});
