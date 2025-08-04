const express = require('express');
const router = express.Router();
const pexelsService = require('../services/pexelsService');

// Get video performance analytics
router.get('/video/:videoId/analytics', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const videoDetails = await pexelsService.getVideoById(videoId);
    
    // Calculate video metrics
    const video = videoDetails.data;
    const durationInMinutes = video.duration / 60;
    const fileSizeInMB = video.file_size / (1024 * 1024);
    
    // Calculate performance score (0-100) based on quality and duration
    const performanceScore = Math.min(100, Math.round(
      (video.width * video.height / 1000000) * 0.4 + 
      (durationInMinutes * 10) * 0.3 + 
      (video.fps / 60 * 100) * 0.3
    ));
    
    const analytics = {
      video: video,
      metrics: {
        performanceScore,
        durationInMinutes: durationInMinutes.toFixed(2),
        fileSizeInMB: fileSizeInMB.toFixed(2),
        aspectRatio: (video.width / video.height).toFixed(2),
        quality: video.quality,
        fps: video.fps,
        resolution: `${video.width}x${video.height}`,
        timestamp: new Date().toISOString()
      }
    };
    
    res.json({
      success: true,
      data: analytics,
      message: 'Video analytics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get video analytics',
      error: error.message
    });
  }
});

// Get video collection analytics
router.get('/collection/analytics', async (req, res) => {
  try {
    const { per_page = 50 } = req.query;
    
    const [apiStatus, popularVideos, curatedVideos] = await Promise.all([
      pexelsService.getApiStatus(),
      pexelsService.getPopularVideos(per_page, 1),
      pexelsService.getCuratedVideos(per_page, 1)
    ]);
    
    // Calculate total metrics across all videos
    const allVideos = [
      ...(popularVideos.data?.videos || []),
      ...(curatedVideos.data?.videos || [])
    ];
    
    const totalDuration = allVideos.reduce((sum, video) => sum + (video.duration || 0), 0);
    const totalFileSize = allVideos.reduce((sum, video) => sum + (video.file_size || 0), 0);
    const avgDuration = allVideos.length > 0 ? (totalDuration / allVideos.length / 60).toFixed(2) : 0;
    const avgFileSize = allVideos.length > 0 ? (totalFileSize / allVideos.length / (1024 * 1024)).toFixed(2) : 0;
    
    const analytics = {
      apiStatus: apiStatus.data,
      videoStats: {
        totalVideos: allVideos.length,
        totalDuration: (totalDuration / 60).toFixed(2),
        totalFileSize: (totalFileSize / (1024 * 1024)).toFixed(2),
        avgDuration: parseFloat(avgDuration),
        avgFileSize: parseFloat(avgFileSize),
        popularVideos: popularVideos.data?.videos?.length || 0,
        curatedVideos: curatedVideos.data?.videos?.length || 0
      },
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: analytics,
      message: 'Video collection analytics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get video collection analytics',
      error: error.message
    });
  }
});

// Get trending videos analysis
router.get('/trending/analysis', async (req, res) => {
  try {
    const { max_count = 20 } = req.query;
    
    const trendingVideos = await pexelsService.getTrendingVideos(
      parseInt(max_count),
      1
    );
    
    if (!trendingVideos.data?.videos) {
      return res.json({
        success: true,
        data: { videos: [], analysis: {} },
        message: 'No trending videos found'
      });
    }
    
    const videos = trendingVideos.data.videos;
    
    // Calculate trending metrics
    const totalDuration = videos.reduce((sum, video) => sum + (video.duration || 0), 0);
    const totalFileSize = videos.reduce((sum, video) => sum + (video.file_size || 0), 0);
    
    // Find top performing videos (by quality and duration)
    const topVideos = videos
      .sort((a, b) => {
        const scoreA = (a.width * a.height * a.duration) / 1000000;
        const scoreB = (b.width * b.height * b.duration) / 1000000;
        return scoreB - scoreA;
      })
      .slice(0, 5);
    
    const analysis = {
      totalVideos: videos.length,
      totalDuration: (totalDuration / 60).toFixed(2),
      totalFileSize: (totalFileSize / (1024 * 1024)).toFixed(2),
      avgDuration: (totalDuration / videos.length / 60).toFixed(2),
      avgFileSize: (totalFileSize / videos.length / (1024 * 1024)).toFixed(2),
      topPerformingVideos: topVideos,
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        videos,
        analysis
      },
      message: 'Trending videos analysis completed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get trending videos analysis',
      error: error.message
    });
  }
});

// Get content recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { content_type = 'videos', max_count = 10 } = req.query;
    
    // Get popular videos to understand content preferences
    const popularVideos = await pexelsService.getPopularVideos(10, 1);
    
    // Analyze popular content to generate recommendations
    const recommendations = {
      contentType: content_type,
      recommendations: [
        {
          type: 'popular_categories',
          suggestions: ['nature', 'business', 'people', 'animals', 'travel'],
          reason: 'Based on popular video categories'
        },
        {
          type: 'content_ideas',
          suggestions: [
            'Nature and landscapes',
            'Business and technology',
            'People and lifestyle',
            'Animals and wildlife',
            'Travel and adventure'
          ],
          reason: 'Popular content formats with high quality'
        },
        {
          type: 'video_qualities',
          suggestions: [
            '4K Ultra HD',
            '1080p Full HD',
            '720p HD',
            'High frame rate (60fps)',
            'Wide aspect ratio'
          ],
          reason: 'Optimal video qualities for different use cases'
        }
      ],
      videoStats: {
        totalVideos: popularVideos.data?.videos?.length || 0,
        avgDuration: popularVideos.data?.videos?.length > 0 
          ? (popularVideos.data.videos.reduce((sum, v) => sum + (v.duration || 0), 0) / popularVideos.data.videos.length / 60).toFixed(2)
          : 0
      },
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: recommendations,
      message: 'Content recommendations generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: error.message
    });
  }
});

module.exports = router; 