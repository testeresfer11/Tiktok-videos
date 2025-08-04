const express = require('express');
const router = express.Router();
const pexelsService = require('../services/pexelsService');

// Search videos by query
router.get('/search', async (req, res) => {
  try {
    const {per_page, page } = req.query;
    
    const query = "Single Continuous Shot";
    
    const perPage = per_page ? parseInt(per_page) : 15;
    const pageNum = page ? parseInt(page) : 1;
    
    const videos = await pexelsService.searchVideos(query, perPage, pageNum);
    res.json({
      success: true,
      ...videos.data,
      message: `Videos found for query: ${query}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search videos',
      error: error.message
    });
  }
});

// Get popular videos
router.get('/popular', async (req, res) => {
  try {
    const { per_page, page } = req.query;
    const perPage = per_page ? parseInt(per_page) : 15;
    const pageNum = page ? parseInt(page) : 1;
    
    const videos = await pexelsService.getPopularVideos(perPage, pageNum);
    res.json({
      success: true,
      data: videos.data,
      message: 'Popular videos retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get popular videos',
      error: error.message
    });
  }
});

// Get video by ID
router.get('/video/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const video = await pexelsService.getVideoById(videoId);
    res.json({
      success: true,
      data: video.data,
      message: 'Video details retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get video details',
      error: error.message
    });
  }
});

// Get curated videos
router.get('/curated', async (req, res) => {
  try {
    const { per_page, page } = req.query;
    const perPage = per_page ? parseInt(per_page) : 15;
    const pageNum = page ? parseInt(page) : 1;
    
    const videos = await pexelsService.getCuratedVideos(perPage, pageNum);
    res.json({
      success: true,
      data: videos.data,
      message: 'Curated videos retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get curated videos',
      error: error.message
    });
  }
});

// Search videos by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { per_page, page } = req.query;
    const perPage = per_page ? parseInt(per_page) : 15;
    const pageNum = page ? parseInt(page) : 1;
    
    const videos = await pexelsService.searchVideosByCategory(category, perPage, pageNum);
    res.json({
      success: true,
      data: videos.data,
      message: `Videos found for category: ${category}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search videos by category',
      error: error.message
    });
  }
});

// Get trending videos
router.get('/trending', async (req, res) => {
  try {
    const { per_page, page } = req.query;
    const perPage = per_page ? parseInt(per_page) : 15;
    const pageNum = page ? parseInt(page) : 1;
    
    const videos = await pexelsService.getTrendingVideos(perPage, pageNum);
    res.json({
      success: true,
      data: videos.data,
      message: 'Trending videos retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get trending videos',
      error: error.message
    });
  }
});

// Search videos with filters
router.get('/search/filters', async (req, res) => {
  try {
    const { query, per_page, page, orientation, size, locale } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter is required'
      });
    }
    
    const filters = {};
    if (per_page) filters.per_page = parseInt(per_page);
    if (page) filters.page = parseInt(page);
    if (orientation) filters.orientation = orientation;
    if (size) filters.size = size;
    if (locale) filters.locale = locale;
    
    const videos = await pexelsService.searchVideosWithFilters(query, filters);
    res.json({
      success: true,
      data: videos.data,
      message: `Videos found for query: ${query} with filters`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search videos with filters',
      error: error.message
    });
  }
});

// Get video statistics
router.get('/video/:videoId/stats', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const stats = await pexelsService.getVideoStats(videoId);
    res.json({
      success: true,
      data: stats.data,
      message: 'Video statistics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get video statistics',
      error: error.message
    });
  }
});

// Get Pexels API status
router.get('/status', async (req, res) => {
  try {
    const status = await pexelsService.getApiStatus();
    res.json({
      success: true,
      data: status.data,
      message: 'Pexels API is working correctly',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Pexels API is not available',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router; 