import { NextRequest, NextResponse } from 'next/server';

// Comprehensive database of emergency helplines
const HELPLINES_DATABASE = [
  // India
  {
    id: 'india-icall',
    name: 'iCall',
    number: '9152987821',
    country: 'India',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: 'Professional psychosocial helpline by TISS.',
    languages: ['English', 'Hindi'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: 19.0760, lon: 72.8777 }
  },
  {
    id: 'india-vandrevala',
    name: 'Vandrevala Foundation',
    number: '1860-2662-345',
    country: 'India',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: '24/7 mental health support.',
    languages: ['English', 'Hindi'],
    availability: '24/7',
    type: 'general',
    coordinates: { lat: 19.0760, lon: 72.8777 }
  },
  {
    id: 'india-aasra',
    name: 'AASRA',
    number: '9820466627',
    country: 'India',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: '24/7 suicide prevention helpline.',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: '24/7',
    type: 'suicide_prevention',
    coordinates: { lat: 19.0760, lon: 72.8777 }
  },
  {
    id: 'india-connecting-ncr',
    name: 'Connecting NGO',
    number: '1800-843-5200',
    country: 'India',
    city: 'Delhi',
    state: 'Delhi',
    description: 'Mental health helpline for youth.',
    languages: ['English', 'Hindi'],
    availability: '24/7',
    type: 'youth',
    coordinates: { lat: 28.7041, lon: 77.1025 }
  },
  {
    id: 'india-roshni',
    name: 'Roshni',
    number: '1800-121-4567',
    country: 'India',
    city: 'Delhi',
    state: 'Delhi',
    description: 'Mental health helpline for women.',
    languages: ['English', 'Hindi'],
    availability: '24/7',
    type: 'women',
    coordinates: { lat: 28.7041, lon: 77.1025 }
  },
  {
    id: 'india-sneha',
    name: 'Sneha Foundation',
    number: '044-24640050',
    country: 'India',
    city: 'Chennai',
    state: 'Tamil Nadu',
    description: 'Suicide prevention and bereavement support.',
    languages: ['English', 'Tamil'],
    availability: '24/7',
    type: 'suicide_prevention',
    coordinates: { lat: 13.0827, lon: 80.2707 }
  },
  {
    id: 'india-sumaitri',
    name: 'Sumaitri',
    number: '080-25497777',
    country: 'India',
    city: 'Bangalore',
    state: 'Karnataka',
    description: 'Mental health helpline.',
    languages: ['English', 'Kannada'],
    availability: '24/7',
    type: 'general',
    coordinates: { lat: 12.9716, lon: 77.5946 }
  },

  // USA
  {
    id: 'usa-988',
    name: '988 Suicide & Crisis Lifeline',
    number: '988',
    country: 'United States',
    city: 'National',
    state: 'National',
    description: '24/7, free and confidential support.',
    languages: ['English', 'Spanish'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: 39.8283, lon: -98.5795 } // Geographic center of US
  },
  {
    id: 'usa-crisis-text',
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    country: 'United States',
    city: 'National',
    state: 'National',
    description: 'Text support for any crisis.',
    languages: ['English'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: 39.8283, lon: -98.5795 }
  },
  {
    id: 'usa-nami',
    name: 'National Alliance on Mental Illness',
    number: '1-800-950-6264',
    country: 'United States',
    city: 'National',
    state: 'National',
    description: 'Mental health information and referral.',
    languages: ['English', 'Spanish'],
    availability: 'Mon-Fri 10AM-6PM ET',
    type: 'information',
    coordinates: { lat: 39.8283, lon: -98.5795 }
  },
  {
    id: 'usa-nyc-well',
    name: 'NYC Well',
    number: '1-888-692-9355',
    country: 'United States',
    city: 'New York',
    state: 'New York',
    description: 'Mental health support for New Yorkers.',
    languages: ['English', 'Spanish', 'Chinese', 'Russian'],
    availability: '24/7',
    type: 'general',
    coordinates: { lat: 40.7128, lon: -74.0060 }
  },
  {
    id: 'usa-la-dmh',
    name: 'LA County DMH',
    number: '800-854-7771',
    country: 'United States',
    city: 'Los Angeles',
    state: 'California',
    description: 'Mental health services in Los Angeles County.',
    languages: ['English', 'Spanish'],
    availability: '24/7',
    type: 'general',
    coordinates: { lat: 34.0522, lon: -118.2437 }
  },

  // UK
  {
    id: 'uk-samaritans',
    name: 'Samaritans',
    number: '116 123',
    country: 'United Kingdom',
    city: 'National',
    state: 'National',
    description: 'Talk to us any time you like.',
    languages: ['English', 'Welsh'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: 51.5074, lon: -0.1278 } // London coordinates
  },
  {
    id: 'uk-mind',
    name: 'Mind Infoline',
    number: '0300 123 3393',
    country: 'United Kingdom',
    city: 'National',
    state: 'National',
    description: 'Information and support on mental health.',
    languages: ['English'],
    availability: 'Mon-Fri 9AM-6PM',
    type: 'information',
    coordinates: { lat: 51.5074, lon: -0.1278 }
  },
  {
    id: 'uk-calm',
    name: 'CALM',
    number: '0800 58 58 58',
    country: 'United Kingdom',
    city: 'National',
    state: 'National',
    description: 'Campaign Against Living Miserably - male suicide prevention.',
    languages: ['English'],
    availability: '24/7',
    type: 'suicide_prevention',
    coordinates: { lat: 51.5074, lon: -0.1278 }
  },

  // Australia
  {
    id: 'au-lifeline',
    name: 'Lifeline',
    number: '13 11 14',
    country: 'Australia',
    city: 'National',
    state: 'National',
    description: '24/7 crisis support and suicide prevention.',
    languages: ['English'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: -25.2744, lon: 133.7751 } // Geographic center of Australia
  },
  {
    id: 'au-beyond-blue',
    name: 'Beyond Blue',
    number: '1300 22 4636',
    country: 'Australia',
    city: 'National',
    state: 'National',
    description: 'Mental health support service.',
    languages: ['English'],
    availability: '24/7',
    type: 'general',
    coordinates: { lat: -25.2744, lon: 133.7751 }
  },

  // Canada
  {
    id: 'ca-crisis',
    name: 'Canada Suicide Prevention Service',
    number: '988',
    country: 'Canada',
    city: 'National',
    state: 'National',
    description: '24/7 suicide prevention and support.',
    languages: ['English', 'French'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: 56.1304, lon: -106.3468 } // Geographic center of Canada
  },

  // Global
  {
    id: 'global-befrienders',
    name: 'Befrienders Worldwide',
    number: 'https://www.befrienders.org/',
    country: 'Global',
    city: 'Global',
    state: 'Global',
    description: 'International suicide prevention network.',
    languages: ['Multiple'],
    availability: '24/7',
    type: 'crisis',
    coordinates: { lat: 0, lon: 0 },
    isGlobal: true
  },
  {
    id: 'global-iasp',
    name: 'Crisis Centres (IASP)',
    number: 'https://www.iasp.info/resources/Crisis_Centres/',
    country: 'Global',
    city: 'Global',
    state: 'Global',
    description: 'International directory of crisis centres.',
    languages: ['Multiple'],
    availability: 'Varies',
    type: 'directory',
    coordinates: { lat: 0, lon: 0 },
    isGlobal: true
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const country = searchParams.get('country');
  const city = searchParams.get('city');
  const type = searchParams.get('type'); // crisis, general, suicide_prevention, etc.
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    let filteredHelplines = HELPLINES_DATABASE;

    // Filter by type if specified
    if (type) {
      filteredHelplines = filteredHelplines.filter(h => h.type === type);
    }

    // Filter by country if specified
    if (country) {
      filteredHelplines = filteredHelplines.filter(h =>
        h.country.toLowerCase().includes(country.toLowerCase()) ||
        h.isGlobal
      );
    }

    // Filter by city if specified
    if (city) {
      filteredHelplines = filteredHelplines.filter(h =>
        h.city.toLowerCase().includes(city.toLowerCase()) ||
        h.city === 'National' ||
        h.isGlobal
      );
    }

    // If coordinates provided, sort by distance
    if (lat && lon) {
      const userLat = parseFloat(lat);
      const userLon = parseFloat(lon);

      filteredHelplines = filteredHelplines.map(helpline => ({
        ...helpline,
        distance: calculateDistance(userLat, userLon, helpline.coordinates.lat, helpline.coordinates.lon)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    // Limit results
    const results = filteredHelplines.slice(0, limit);

    return NextResponse.json({
      helplines: results,
      total: results.length,
      filters: { country, city, type, coordinates: lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null }
    });
  } catch (error) {
    console.error('Helplines API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch helplines' },
      { status: 500 }
    );
  }
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}