# Links API

A Node.js Express.js API with CORS enabled that returns an array of links.

## Features

- Express.js server with CORS enabled
- RESTful API endpoints
- JSON response format
- Error handling
- Sample data included

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### Get All Links
- **URL**: `GET /api/links`
- **Description**: Returns all available links
- **Response**: JSON array of links with metadata

### Get Link by ID
- **URL**: `GET /api/links/:id`
- **Description**: Returns a specific link by its ID
- **Response**: JSON object with the requested link

### Root Endpoint
- **URL**: `GET /`
- **Description**: Returns API information and available endpoints

## Example Usage

### Get all links:
```bash
curl http://localhost:3000/api/links
```

### Get a specific link:
```bash
curl http://localhost:3000/api/links/1
```

## Response Format

### Success Response (Get All Links):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Google",
      "url": "https://www.google.com",
      "description": "Search engine"
    }
  ],
  "count": 5
}
```

### Success Response (Get Link by ID):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Google",
    "url": "https://www.google.com",
    "description": "Search engine"
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Link not found"
}
```

## CORS

CORS is enabled for all routes, allowing cross-origin requests from any domain.

## Technologies Used

- Node.js
- Express.js
- CORS middleware 