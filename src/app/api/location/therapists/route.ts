import { NextRequest, NextResponse } from 'next/server';

// Free therapists database - no API keys required
const THERAPISTS_DATABASE = [
  // New York City therapists
  {
    id: 'nyc-therapist-1',
    name: 'Dr. Sarah Johnson',
    title: 'Licensed Clinical Psychologist',
    location: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    phone: '(212) 555-0123',
    email: 'sarah.johnson@therapy.nyc',
    website: 'https://sarahjohnsontherapy.com',
    insurance: ['Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare'],
    languages: ['English'],
    availability: 'Mon-Fri 9AM-6PM',
    rating: 4.8,
    reviews: 127
  },
  {
    id: 'nyc-therapist-2',
    name: 'Michael Chen, LCSW',
    title: 'Licensed Clinical Social Worker',
    location: 'Brooklyn, NY',
    coordinates: { lat: 40.6782, lng: -73.9442 },
    specialties: ['Relationship Issues', 'Stress Management', 'Life Transitions'],
    phone: '(718) 555-0456',
    email: 'mchen@brooklyntherapy.org',
    website: 'https://brooklyntherapy.org',
    insurance: ['Cigna', 'Oxford', 'Medicare'],
    languages: ['English', 'Mandarin'],
    availability: 'Tue-Sat 10AM-7PM',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'nyc-therapist-3',
    name: 'Dr. Emily Rodriguez',
    title: 'Clinical Psychologist',
    location: 'Manhattan, NY',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    specialties: ['PTSD', 'Anxiety Disorders', 'EMDR Therapy'],
    phone: '(646) 555-0789',
    email: 'emily.rodriguez@midtowntherapy.com',
    website: 'https://midtowntherapy.com',
    insurance: ['Aetna', 'Blue Cross Blue Shield', 'Empire Blue Cross'],
    languages: ['English', 'Spanish'],
    availability: 'Mon-Thu 8AM-5PM',
    rating: 4.7,
    reviews: 156
  },

  // Los Angeles therapists
  {
    id: 'la-therapist-1',
    name: 'Dr. David Kim',
    title: 'Licensed Marriage and Family Therapist',
    location: 'Los Angeles, CA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    specialties: ['Couples Therapy', 'Family Counseling', 'Depression'],
    phone: '(323) 555-0321',
    email: 'dkim@lakatherapycenter.com',
    website: 'https://lakatherapycenter.com',
    insurance: ['Anthem', 'Blue Shield', 'UnitedHealthcare'],
    languages: ['English', 'Korean'],
    availability: 'Mon-Fri 9AM-6PM, Sat 10AM-2PM',
    rating: 4.8,
    reviews: 203
  },
  {
    id: 'la-therapist-2',
    name: 'Lisa Thompson, LMFT',
    title: 'Licensed Marriage and Family Therapist',
    location: 'Santa Monica, CA',
    coordinates: { lat: 34.0194, lng: -118.4912 },
    specialties: ['Anxiety', 'Self-Esteem', 'Career Counseling'],
    phone: '(310) 555-0654',
    email: 'lisa@thompsontherapy.com',
    website: 'https://thompsontherapy.com',
    insurance: ['Cigna', 'Aetna', 'Blue Cross'],
    languages: ['English'],
    availability: 'Tue-Sun 11AM-8PM',
    rating: 4.9,
    reviews: 178
  },

  // Chicago therapists
  {
    id: 'chi-therapist-1',
    name: 'Dr. Robert Williams',
    title: 'Clinical Psychologist',
    location: 'Chicago, IL',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    specialties: ['Depression', 'Bipolar Disorder', 'Cognitive Behavioral Therapy'],
    phone: '(312) 555-0987',
    email: 'rwilliams@chicagomindcare.com',
    website: 'https://chicagomindcare.com',
    insurance: ['Blue Cross Blue Shield', 'UnitedHealthcare', 'Humana'],
    languages: ['English'],
    availability: 'Mon-Fri 8AM-5PM',
    rating: 4.6,
    reviews: 142
  },

  // Houston therapists
  {
    id: 'hou-therapist-1',
    name: 'Dr. Maria Garcia',
    title: 'Licensed Professional Counselor',
    location: 'Houston, TX',
    coordinates: { lat: 29.7604, lng: -95.3698 },
    specialties: ['Trauma', 'PTSD', 'Grief Counseling'],
    phone: '(713) 555-0432',
    email: 'mgarcia@houstonhealing.com',
    website: 'https://houstonhealing.com',
    insurance: ['Blue Cross Blue Shield', 'Cigna', 'Aetna'],
    languages: ['English', 'Spanish'],
    availability: 'Mon-Sat 9AM-6PM',
    rating: 4.8,
    reviews: 167
  },

  // Phoenix therapists
  {
    id: 'phx-therapist-1',
    name: 'James Wilson, LCSW',
    title: 'Licensed Clinical Social Worker',
    location: 'Phoenix, AZ',
    coordinates: { lat: 33.4484, lng: -112.0740 },
    specialties: ['Addiction', 'Substance Abuse', 'Relapse Prevention'],
    phone: '(602) 555-0765',
    email: 'jwilson@phoenixrecovery.com',
    website: 'https://phoenixrecovery.com',
    insurance: ['AHCCCS', 'Blue Cross Blue Shield', 'UnitedHealthcare'],
    languages: ['English'],
    availability: 'Mon-Fri 8AM-6PM, Sat 9AM-1PM',
    rating: 4.7,
    reviews: 134
  },

  // Philadelphia therapists
  {
    id: 'phi-therapist-1',
    name: 'Dr. Jennifer Brown',
    title: 'Clinical Psychologist',
    location: 'Philadelphia, PA',
    coordinates: { lat: 39.9526, lng: -75.1652 },
    specialties: ['Eating Disorders', 'Body Image', 'Self-Harm'],
    phone: '(215) 555-0213',
    email: 'jbrown@philadelphiatherapy.org',
    website: 'https://philadelphiatherapy.org',
    insurance: ['Aetna', 'Blue Cross Blue Shield', 'Cigna'],
    languages: ['English'],
    availability: 'Tue-Fri 10AM-7PM, Sat 9AM-3PM',
    rating: 4.9,
    reviews: 198
  },

  // San Antonio therapists
  {
    id: 'sat-therapist-1',
    name: 'Dr. Carlos Martinez',
    title: 'Licensed Clinical Psychologist',
    location: 'San Antonio, TX',
    coordinates: { lat: 29.4241, lng: -98.4936 },
    specialties: ['Anxiety', 'Depression', 'Panic Attacks'],
    phone: '(210) 555-0589',
    email: 'cmartinez@sanantoniomind.com',
    website: 'https://sanantoniomind.com',
    insurance: ['Blue Cross Blue Shield', 'UnitedHealthcare', 'Humana'],
    languages: ['English', 'Spanish'],
    availability: 'Mon-Thu 9AM-6PM, Fri 9AM-4PM',
    rating: 4.6,
    reviews: 123
  },

  // San Diego therapists
  {
    id: 'sd-therapist-1',
    name: 'Dr. Amanda Lee',
    title: 'Licensed Marriage and Family Therapist',
    location: 'San Diego, CA',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    specialties: ['Couples Therapy', 'Communication Issues', 'Infidelity'],
    phone: '(619) 555-0345',
    email: 'alee@sandiegorelationships.com',
    website: 'https://sandiegorelationships.com',
    insurance: ['Anthem', 'Blue Shield', 'Cigna'],
    languages: ['English'],
    availability: 'Mon-Sat 10AM-7PM',
    rating: 4.8,
    reviews: 176
  },

  // Dallas therapists
  {
    id: 'dal-therapist-1',
    name: 'Dr. Thomas Anderson',
    title: 'Clinical Psychologist',
    location: 'Dallas, TX',
    coordinates: { lat: 32.7767, lng: -96.7970 },
    specialties: ['ADHD', 'Executive Functioning', 'Academic Performance'],
    phone: '(214) 555-0678',
    email: 'tanderson@dallasfocus.com',
    website: 'https://dallasfocus.com',
    insurance: ['Blue Cross Blue Shield', 'Aetna', 'Cigna'],
    languages: ['English'],
    availability: 'Mon-Fri 8AM-5PM',
    rating: 4.7,
    reviews: 145
  },

  // Online/Global therapists (prioritized when no local matches)
  {
    id: 'online-therapist-1',
    name: 'Dr. Rachel Green',
    title: 'Telehealth Clinical Psychologist',
    location: 'Online - Available Nationwide',
    coordinates: { lat: 39.8283, lng: -98.5795 }, // Geographic center of US
    specialties: ['Anxiety', 'Depression', 'Online Therapy'],
    phone: '(888) 555-0199',
    email: 'rgreen@teletherapy.com',
    website: 'https://teletherapy.com',
    insurance: ['Aetna', 'Cigna', 'UnitedHealthcare'],
    languages: ['English'],
    availability: 'Mon-Sun 6AM-10PM EST',
    rating: 4.9,
    reviews: 312,
    onlineOnly: true
  },
  {
    id: 'online-therapist-2',
    name: 'Dr. Kevin Park',
    title: 'Virtual Mental Health Specialist',
    location: 'Online - International',
    coordinates: { lat: 39.8283, lng: -98.5795 },
    specialties: ['Cross-cultural Issues', 'Immigrant Mental Health', 'Anxiety'],
    phone: '(888) 555-0246',
    email: 'kpark@globalmindcare.com',
    website: 'https://globalmindcare.com',
    insurance: ['Most Major Insurances'],
    languages: ['English', 'Korean', 'Spanish'],
    availability: '24/7 Online Scheduling',
    rating: 4.8,
    reviews: 267,
    onlineOnly: true
  },
  {
    id: 'online-therapist-3',
    name: 'Sarah Mitchell, LCSW',
    title: 'Online Clinical Social Worker',
    location: 'Virtual Practice - All Time Zones',
    coordinates: { lat: 39.8283, lng: -98.5795 },
    specialties: ['Depression', 'Life Transitions', 'Stress Management'],
    phone: '(888) 555-0312',
    email: 'smitchell@virtualtherapy.net',
    website: 'https://virtualtherapy.net',
    insurance: ['Aetna', 'Blue Cross Blue Shield', 'Cigna'],
    languages: ['English'],
    availability: 'Flexible - Evenings & Weekends',
    rating: 4.7,
    reviews: 198,
    onlineOnly: true
  }
];

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!lat || !lng) {
      return NextResponse.json({
        error: 'Missing coordinates. Please provide lat and lng parameters.'
      }, { status: 400 });
    }

    // Calculate distances and sort therapists by proximity
    const therapistsWithDistance = THERAPISTS_DATABASE.map(therapist => ({
      ...therapist,
      distance: calculateDistance(lat, lng, therapist.coordinates.lat, therapist.coordinates.lng)
    }));

    // Sort by distance (closest first), then by online availability
    therapistsWithDistance.sort((a, b) => {
      // Prioritize local therapists over online ones
      if (a.onlineOnly && !b.onlineOnly) return 1;
      if (!a.onlineOnly && b.onlineOnly) return -1;

      // Then sort by distance
      return a.distance - b.distance;
    });

    // Return limited results
    const results = therapistsWithDistance.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        total: THERAPISTS_DATABASE.length,
        returned: results.length,
        location: { lat, lng }
      }
    });

  } catch (error) {
    console.error('Therapists API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
