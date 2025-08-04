# Pexels Video API Integration

A comprehensive Node.js Express.js API for Pexels video search, analytics, and content discovery. This API provides seamless access to Pexels' vast collection of high-quality stock videos with advanced search capabilities and analytics.

## Features

### 🎬 Pexels Video API Integration
- **Video Search**: Search for videos by query, category, or filters
- **Popular Videos**: Get trending and popular videos
- **Curated Videos**: Access hand-picked video collections
- **Video Details**: Get detailed information about specific videos
- **Video Statistics**: Comprehensive video metadata and analytics
- **API Status Monitoring**: Check Pexels API connectivity

### 📊 Analytics & Insights
- **Video Performance Analytics**: Quality scores, duration analysis, and technical metrics
- **Collection Analytics**: Comprehensive video collection statistics
- **Trending Analysis**: Analyze trending videos and content performance
- **Content Recommendations**: AI-powered content suggestions and optimization tips

### 🔧 Technical Features
- **RESTful API Design**: Clean, consistent API endpoints
- **Advanced Search Filters**: Query, orientation, size, and locale filtering
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure credential management
- **Modular Architecture**: Organized service and route structure
- **Web Interface**: Interactive HTML interface for testing and video discovery

## Quick Start

### Prerequisites
- Node.js (>= 14.0.0)
- Pexels API Key (included in config.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pexels-video-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Pexels API**
   
   The API key is already configured in `config.js`:
   ```javascript
   module.exports = {
     pexels: {
       apiKey: 'pOaTEVcqlh4xF2tIqEyEOgRaB85CpeSo9WPR957UrfitM8Buz3K2nzAb',
       apiBaseUrl: 'https://api.pexels.com/videos',
       apiVersion: 'v1'
     }
   };
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Access the API**
   - Web Interface: `http://localhost:3003/` (Interactive video search and analytics)
   - API Documentation: `http://localhost:3003/` (JSON format)
   - Pexels Video API Base: `http://localhost:3003/api/pexels`
   - Analytics API Base: `http://localhost:3003/api/analytics`

## API Endpoints

### Pexels Video API Endpoints

#### Video Search
- `GET /api/pexels/search?query=nature&per_page=15&page=1` - Search videos by query
- `GET /api/pexels/popular?per_page=15&page=1` - Get popular videos
- `GET /api/pexels/curated?per_page=15&page=1` - Get curated videos
- `GET /api/pexels/trending?per_page=15&page=1` - Get trending videos
- `GET /api/pexels/category/:category?per_page=15&page=1` - Search videos by category

#### Video Details & Statistics
- `GET /api/pexels/video/:videoId` - Get video details by ID
- `GET /api/pexels/video/:videoId/stats` - Get video statistics
- `GET /api/pexels/search/filters?query=nature&orientation=landscape&size=large` - Search with filters
- `GET /api/pexels/status` - Check Pexels API status

### Analytics API Endpoints

#### Video Analytics
- `GET /api/analytics/video/:videoId/analytics` - Get video performance analytics
- `GET /api/analytics/collection/analytics?per_page=50` - Get collection analytics
- `GET /api/analytics/trending/analysis?max_count=20` - Get trending analysis
- `GET /api/analytics/recommendations?content_type=videos&max_count=10` - Get content recommendations

## Usage Examples

### Search for Nature Videos
```bash
curl "http://localhost:3003/api/pexels/search?query=nature&per_page=5"
```

### Get Popular Videos
```bash
curl "http://localhost:3003/api/pexels/popular?per_page=10"
```

### Get Video Details
```bash
curl "http://localhost:3003/api/pexels/video/12345"
```

### Get Video Analytics
```bash
curl "http://localhost:3003/api/analytics/video/12345/analytics"
```

### Search with Filters
```bash
curl "http://localhost:3003/api/pexels/search/filters?query=business&orientation=landscape&size=large"
```

## Environment Variables

Create a `.env` file (optional, API key is already configured):

```env
PEXELS_API_KEY=pOaTEVcqlh4xF2tIqEyEOgRaB85CpeSo9WPR957UrfitM8Buz3K2nzAb
PORT=3003
NODE_ENV=development
```

## API Setup

### Pexels API
1. Visit [Pexels API Documentation](https://www.pexels.com/api/documentation/)
2. The API key is already included in the configuration
3. No additional setup required

## Project Structure

```
├── app.js                 # Main application file
├── config.js              # Configuration (Pexels API credentials)
├── package.json           # Dependencies and scripts
├── README.md             # This file
├── routes/
│   ├── pexelsRoutes.js   # Pexels video API routes
│   └── analyticsRoutes.js # Analytics routes
├── services/
│   └── pexelsService.js  # Pexels API service
└── public/
    └── index.html        # Web interface for testing
```

## Rate Limiting

- Pexels API has rate limits based on your plan
- The API includes proper error handling for rate limit responses
- Consider implementing caching for frequently requested data

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

Common HTTP status codes:
- **200 OK**: Request successful
- **400 Bad Request**: Invalid parameters
- **404 Not Found**: Requested resource not found
- **500 Internal Server Error**: Server-side errors
- **503 Service Unavailable**: Pexels API unavailable

## Rate Limiting

- Pexels API has rate limits based on your plan
- The API includes proper error handling for rate limit responses
- Consider implementing caching for frequently requested data

## Support

- **Pexels API Documentation**: https://www.pexels.com/api/documentation/
- **Pexels API Status**: https://status.pexels.com/
- **Issues**: Create an issue in the repository

## License

MIT License - see LICENSE file for details. 