# Location-Based Mental Health Services API

This implementation provides a comprehensive location-based API system for finding emergency helplines and mental health professionals near a user's location.

## Features

- **Geocoding API**: Convert location names to coordinates using OpenStreetMap Nominatim
- **Helplines Database**: Comprehensive database of emergency helplines by country and city
- **Therapists Search**: Find nearby mental health professionals using Google Places API
- **Distance Calculation**: Sort results by proximity to user location
- **Fallback Support**: Mock data when external APIs are unavailable

## API Endpoints

### 1. Geocoding API
**Endpoint**: `GET /api/location/geocode`

**Parameters**:
- `q` (required): Location query string (city, country, address)

**Example**:
```bash
curl "http://localhost:3000/api/location/geocode?q=New%20York"
```

**Response**:
```json
{
  "results": [
    {
      "place_id": "12345",
      "display_name": "New York, New York, USA",
      "lat": 40.7128,
      "lon": -74.0060,
      "type": "city",
      "importance": 0.9,
      "address": {
        "city": "New York",
        "state": "New York",
        "country": "United States",
        "country_code": "us"
      }
    }
  ]
}
```

### 2. Helplines API
**Endpoint**: `GET /api/location/helplines`

**Parameters**:
- `lat` (optional): Latitude for distance sorting
- `lon` (optional): Longitude for distance sorting
- `country` (optional): Filter by country
- `city` (optional): Filter by city
- `type` (optional): Filter by type (crisis, general, suicide_prevention, youth, women, information, directory)
- `limit` (optional): Maximum number of results (default: 10)

**Example**:
```bash
curl "http://localhost:3000/api/location/helplines?lat=40.7128&lon=-74.0060&limit=5"
```

**Response**:
```json
{
  "helplines": [
    {
      "id": "usa-988",
      "name": "988 Suicide & Crisis Lifeline",
      "number": "988",
      "country": "United States",
      "city": "National",
      "state": "National",
      "description": "24/7, free and confidential support.",
      "languages": ["English", "Spanish"],
      "availability": "24/7",
      "type": "crisis",
      "coordinates": { "lat": 39.8283, "lon": -98.5795 },
      "distance": 245.3
    }
  ],
  "total": 1,
  "filters": {
    "coordinates": { "lat": 40.7128, "lon": -74.0060 }
  }
}
```

### 3. Therapists API
**Endpoint**: `GET /api/location/therapists`

**Parameters**:
- `lat` (required): Latitude
- `lon` (required): Longitude
- `radius` (optional): Search radius in meters (default: 5000)
- `type` (optional): Type of professional (therapist, psychologist, counselor, psychiatrist)
- `limit` (optional): Maximum number of results (default: 10)

**Example**:
```bash
curl "http://localhost:3000/api/location/therapists?lat=40.7128&lon=-74.0060&radius=10000&limit=6"
```

**Response**:
```json
{
  "therapists": [
    {
      "id": "ChIJ1234567890",
      "name": "Dr. Sarah Johnson",
      "specialization": "Anxiety & Depression",
      "rating": 4.8,
      "reviewCount": 127,
      "address": "123 Main St, Downtown",
      "phone": "+1-555-0123",
      "distance": 0.8,
      "coordinates": { "lat": 40.7128, "lon": -74.0060 },
      "isOnline": true,
      "languages": ["English", "Spanish"],
      "sessionTypes": ["In-person", "Video", "Phone"],
      "isOpen": true,
      "website": "https://example.com"
    }
  ],
  "source": "google_places",
  "total": 1
}
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Google Places API Key (for finding therapists)
# Get your API key from: https://console.cloud.google.com/apis/credentials
# Enable Places API and Maps JavaScript API
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

## Supported Countries

The helplines database includes comprehensive coverage for:

- **India**: Mumbai, Delhi, Chennai, Bangalore
- **United States**: National, New York, Los Angeles
- **United Kingdom**: National
- **Australia**: National
- **Canada**: National
- **Global**: International resources

## Features

### Distance Calculation
- Uses Haversine formula for accurate distance calculations
- Results are sorted by proximity to user location
- Distances displayed in kilometers

### Error Handling
- Graceful fallback to mock data when APIs are unavailable
- Comprehensive error messages for debugging
- Rate limiting and timeout handling

### Privacy & Security
- No user location data is stored permanently
- All API calls are made server-side
- OpenStreetMap used for free geocoding (no API key required)

## Usage in Frontend

The `/find-help` page demonstrates full integration:

1. **Location Input**: Users can type location or use geolocation
2. **Geocoding**: Converts location names to coordinates
3. **Parallel Search**: Simultaneously searches helplines and therapists
4. **Results Display**: Shows sorted results with distance indicators
5. **Loading States**: Provides feedback during API calls
6. **Error Handling**: Shows helpful error messages

## Future Enhancements

- Add more countries and cities to helplines database
- Implement caching for frequently requested locations
- Add filtering by specialization, insurance, etc.
- Integrate with additional therapist directories
- Add appointment booking functionality
- Implement user favorites and reviews