const axios = require('axios');
const config = require('../config');

class PexelsService {
  constructor() {
    this.apiKey = config.pexels.apiKey;
    this.baseURL = config.pexels.apiBaseUrl;
  }

  // Get authorization headers
  getAuthHeaders() {
    return {
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  // Search videos by query
  async searchVideos(query, perPage = 15, page = 1) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        headers: this.getAuthHeaders(),
        params: {
          query: query,
          per_page: perPage,
          page: page
        }
      });

      // Extract only the last (highest quality) video file link
      const videosWithLinks = response.data.videos.map(video => video.video_files[video.video_files.length - 1].link);

      return {
        success: true,
        data: {
          page: response.data.page,
          per_page: response.data.per_page,
          total_results: response.data.total_results,
          videos: videosWithLinks
        },
        message: `Videos found for query: ${query}`
      };
    } catch (error) {
      throw new Error(`Failed to search videos: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get popular videos
  async getPopularVideos(perPage = 15, page = 1) {
    try {
      const response = await axios.get(`${this.baseURL}/popular`, {
        headers: this.getAuthHeaders(),
        params: {
          per_page: perPage,
          page: page
        }
      });

      // Extract only the last (highest quality) video file link
      const videosWithLinks = response.data.videos.map(video => ({
        id: video.id,
        video_links: [video.video_files[video.video_files.length - 1].link]
      }));

      return {
        success: true,
        data: {
          page: response.data.page,
          per_page: response.data.per_page,
          total_results: response.data.total_results,
          videos: videosWithLinks
        },
        message: 'Popular videos retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get popular videos: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get video by ID
  async getVideoById(videoId) {
    try {
      const response = await axios.get(`${this.baseURL}/${videoId}`, {
        headers: this.getAuthHeaders()
      });

      return {
        success: true,
        data: response.data,
        message: 'Video details retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get video details: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get curated videos
  async getCuratedVideos(perPage = 15, page = 1) {
    try {
      const response = await axios.get(`${this.baseURL}/curated`, {
        headers: this.getAuthHeaders(),
        params: {
          per_page: perPage,
          page: page
        }
      });

      // Extract only the last (highest quality) video file link
      const videosWithLinks = response.data.videos.map(video => ({
        id: video.id,
        video_links: [video.video_files[video.video_files.length - 1].link]
      }));

      return {
        success: true,
        data: {
          page: response.data.page,
          per_page: response.data.per_page,
          total_results: response.data.total_results,
          videos: videosWithLinks
        },
        message: 'Curated videos retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get curated videos: ${error.response?.data?.error || error.message}`);
    }
  }

  // Search videos by category
  async searchVideosByCategory(category, perPage = 15, page = 1) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        headers: this.getAuthHeaders(),
        params: {
          query: category,
          per_page: perPage,
          page: page
        }
      });

      // Extract only the last (highest quality) video file link
      const videosWithLinks = response.data.videos.map(video => ({
        id: video.id,
        video_links: [video.video_files[video.video_files.length - 1].link]
      }));

      return {
        success: true,
        data: {
          page: response.data.page,
          per_page: response.data.per_page,
          total_results: response.data.total_results,
          videos: videosWithLinks
        },
        message: `Videos found for category: ${category}`
      };
    } catch (error) {
      throw new Error(`Failed to search videos by category: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get trending videos (using popular as proxy)
  async getTrendingVideos(perPage = 15, page = 1) {
    try {
      const response = await axios.get(`${this.baseURL}/popular`, {
        headers: this.getAuthHeaders(),
        params: {
          per_page: perPage,
          page: page
        }
      });

      // Extract only the last (highest quality) video file link
      const videosWithLinks = response.data.videos.map(video => video.video_files[video.video_files.length - 1].link);

      return {
        success: true,
        data: {
          page: response.data.page,
          per_page: response.data.per_page,
          total_results: response.data.total_results,
          videos: videosWithLinks
        },
        message: 'Trending videos retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get trending videos: ${error.response?.data?.error || error.message}`);
    }
  }

  // Search videos with filters
  async searchVideosWithFilters(query, filters = {}) {
    try {
      const params = {
        query: query,
        ...filters
      };

      const response = await axios.get(`${this.baseURL}/search`, {
        headers: this.getAuthHeaders(),
        params: params
      });

      // Extract only the last (highest quality) video file link
      const videosWithLinks = response.data.videos.map(video => video.video_files[video.video_files.length - 1].link);

      return {
        success: true,
        data: {
          page: response.data.page,
          per_page: response.data.per_page,
          total_results: response.data.total_results,
          videos: videosWithLinks
        },
        message: `Videos found for query: ${query} with filters`
      };
    } catch (error) {
      throw new Error(`Failed to search videos with filters: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get video statistics
  async getVideoStats(videoId) {
    try {
      const videoDetails = await this.getVideoById(videoId);
      
      if (!videoDetails.success) {
        throw new Error('Failed to get video details');
      }

      const video = videoDetails.data;
      
      // Calculate video statistics
      const stats = {
        video: video,
        statistics: {
          duration: video.duration,
          width: video.width,
          height: video.height,
          fileSize: video.file_size,
          quality: video.quality,
          fps: video.fps,
          user: video.user,
          url: video.url,
          image: video.image,
          video_files: video.video_files,
          video_pictures: video.video_pictures
        },
        timestamp: new Date().toISOString()
      };

      return {
        success: true,
        data: stats,
        message: 'Video statistics retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get video statistics: ${error.message}`);
    }
  }

  // Get Pexels API status
  async getApiStatus() {
    try {
      const response = await axios.get(`${this.baseURL}/popular`, {
        headers: this.getAuthHeaders(),
        params: {
          per_page: 1
        }
      });

      return {
        success: true,
        data: {
          status: 'active',
          total_results: response.data.total_results,
          api_version: config.pexels.apiVersion
        },
        message: 'Pexels API is working correctly',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Pexels API is not available: ${error.response?.data?.error || error.message}`);
    }
  }
}

module.exports = new PexelsService(); 