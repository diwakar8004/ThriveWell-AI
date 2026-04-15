"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import HelplineCard from "@/components/HelplineCard";
import CounselorCard from "@/components/counselors/CounselorCard";
import { MapPin, Search, Navigation, Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface Helpline {
  id: string;
  name: string;
  number: string;
  country: string;
  city: string;
  state: string;
  description: string;
  languages: string[];
  availability: string;
  type: string;
  coordinates: { lat: number; lon: number };
  distance?: number;
  isGlobal?: boolean;
}

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  rating?: number;
  reviewCount?: number;
  address: string;
  phone?: string;
  distance: number;
  coordinates: { lat: number; lon: number };
  isOnline: boolean;
  languages: string[];
  sessionTypes: string[];
  isOpen?: boolean;
  website?: string;
}

export default function FindHelpPage() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [helplines, setHelplines] = useState<Helpline[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [isLoadingHelplines, setIsLoadingHelplines] = useState(false);
  const [isLoadingTherapists, setIsLoadingTherapists] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Search for location using geocoding API
  const searchLocation = async (query: string) => {
    if (!query.trim()) return;

    try {
      setIsLoadingGeo(true);
      setLocationError(null);

      const response = await fetch(`/api/location/geocode?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to geocode location');
      }

      if (data.results && data.results.length > 0) {
        const bestResult = data.results[0];
        setCoordinates({ lat: bestResult.lat, lon: bestResult.lon });
        setLocation(bestResult.display_name);

        // Now search for helplines and therapists
        await Promise.all([
          searchHelplines(bestResult.lat, bestResult.lon, bestResult.address.country, bestResult.address.city),
          searchTherapists(bestResult.lat, bestResult.lon)
        ]);

        setSearchPerformed(true);
      } else {
        setLocationError('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Location search error:', error);
      setLocationError('Failed to search location. Please try again.');
    } finally {
      setIsLoadingGeo(false);
    }
  };

  // Search for helplines
  const searchHelplines = async (lat: number, lon: number, country?: string, city?: string) => {
    try {
      setIsLoadingHelplines(true);

      const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        limit: '10'
      });

      if (country) params.append('country', country);
      if (city) params.append('city', city);

      const response = await fetch(`/api/location/helplines?${params}`);
      const data = await response.json();

      if (response.ok) {
        setHelplines(data.helplines || []);
      } else {
        console.error('Helplines API error:', data.error);
        setHelplines([]);
      }
    } catch (error) {
      console.error('Helplines search error:', error);
      setHelplines([]);
    } finally {
      setIsLoadingHelplines(false);
    }
  };

  // Search for therapists
  const searchTherapists = async (lat: number, lon: number) => {
    try {
      setIsLoadingTherapists(true);

      const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        radius: '10000', // 10km radius
        limit: '6'
      });

      const response = await fetch(`/api/location/therapists?${params}`);
      const data = await response.json();

      if (response.ok) {
        setTherapists(data.therapists || []);
      } else {
        console.error('Therapists API error:', data.error);
        setTherapists([]);
      }
    } catch (error) {
      console.error('Therapists search error:', error);
      setTherapists([]);
    } finally {
      setIsLoadingTherapists(false);
    }
  };

  // Handle geolocation
  const handleGeolocation = () => {
    setIsLoadingGeo(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLoadingGeo(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });

          // Reverse geocode to get location name
          const reverseGeocodeResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'ThriveWell-AI/1.0'
              }
            }
          );

          if (reverseGeocodeResponse.ok) {
            const locationData = await reverseGeocodeResponse.json();
            setLocation(locationData.display_name || `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          } else {
            setLocation(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }

          // Search for helplines and therapists
          await Promise.all([
            searchHelplines(latitude, longitude),
            searchTherapists(latitude, longitude)
          ]);

          setSearchPerformed(true);
        } catch (error) {
          console.error("Geolocation processing error:", error);
          setLocationError("Failed to process your location. Please try entering it manually.");
        } finally {
          setIsLoadingGeo(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Location access denied. Please enter your location manually.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please allow location access or enter your location manually.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please enter your location manually.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again or enter your location manually.";
            break;
        }

        setLocationError(errorMessage);
        setIsLoadingGeo(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Handle search input
  const handleSearch = () => {
    searchLocation(location);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        {/* Location Prompt */}
        <section className="bg-primary-lavender text-white rounded-[3rem] p-10 md:p-16 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Help is one call away</h1>
                    <p className="text-white/80 text-lg leading-relaxed">
                        Where are you located? We'll find emergency helplines and mental health professionals near you.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                        <div className="relative flex-1 min-w-0">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-lavender pointer-events-none" size={20} />
                            <input
                                type="text"
                                placeholder="Enter your city or country..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-white text-foreground rounded-2xl pl-12 pr-4 py-4 focus:outline-none shadow-sm"
                                disabled={isLoadingGeo}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={isLoadingGeo || !location.trim()}
                            className="bg-primary-teal text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoadingGeo ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Search size={18} />
                            )}
                            {isLoadingGeo ? "Searching..." : "Search"}
                        </button>
                        <button
                            onClick={handleGeolocation}
                            disabled={isLoadingGeo}
                            className="bg-white/20 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-30 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoadingGeo ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Navigation size={18} />
                            )}
                            {isLoadingGeo ? "Getting Location..." : "Use My Location"}
                        </button>
                    </div>

                    {locationError && (
                        <div className="flex items-center gap-2 text-yellow-200 bg-yellow-200/20 px-4 py-3 rounded-xl">
                            <AlertCircle size={18} />
                            <span className="text-sm">{locationError}</span>
                        </div>
                    )}

                    {coordinates && searchPerformed && (
                        <div className="flex items-center gap-2 text-green-200 bg-green-200/20 px-4 py-3 rounded-xl">
                            <CheckCircle size={18} />
                            <span className="text-sm">Location found! Searching for nearby services...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Background pattern */}
            <div className="absolute right-[-5%] top-[-10%] w-[40%] h-[120%] bg-white/10 skew-x-12 blur-3xl pointer-events-none"></div>
        </section>

        {/* Emergency Helplines */}
        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold">Emergency Helplines</h2>
                    <p className="text-gray-500">
                      {coordinates ? `Helplines near ${location}` : "Enter your location to find nearby emergency helplines"}
                    </p>
                </div>
            </div>

            {isLoadingHelplines ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-primary-lavender" />
                <span className="ml-3 text-gray-600">Finding helplines...</span>
              </div>
            ) : helplines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {helplines.map((helpline) => (
                  <div key={helpline.id} className="relative">
                    <HelplineCard
                      name={helpline.name}
                      number={helpline.number}
                      country={helpline.country}
                      description={`${helpline.description} (${helpline.availability})`}
                      isGlobal={helpline.isGlobal}
                    />
                    {helpline.distance !== undefined && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                        {helpline.distance < 1 ? '< 1 km' : `${helpline.distance.toFixed(1)} km`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : searchPerformed ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No helplines found</h3>
                <p className="text-gray-500">Try searching for a different location or check our global resources.</p>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <MapPin size={48} className="mx-auto" />
                </div>
                <h3 className="font-bold text-xl mb-2">Find Local Helplines</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Search for your location above to find emergency helplines and crisis support services near you.
                </p>
              </div>
            )}
        </section>

        {/* Nearby Therapists */}
        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold">Mental Health Professionals</h2>
                    <p className="text-gray-500">
                      {coordinates ? `Therapists near ${location}` : "Enter your location to find nearby mental health professionals"}
                    </p>
                </div>
            </div>

            {isLoadingTherapists ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-primary-lavender" />
                <span className="ml-3 text-gray-600">Finding therapists...</span>
              </div>
            ) : therapists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map((therapist) => (
                  <div key={therapist.id} className="relative">
                    <CounselorCard
                      id={therapist.id}
                      name={therapist.name}
                      specialization={therapist.specialization}
                      isOnline={therapist.isOnline}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                      {therapist.distance < 1 ? '< 1 km' : `${therapist.distance.toFixed(1)} km`}
                    </div>
                    {therapist.rating && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                        ⭐ {therapist.rating}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : searchPerformed ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No therapists found</h3>
                <p className="text-gray-500">Try expanding your search area or check online therapy options.</p>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="font-bold text-xl mb-2">Find Local Support</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Search for your location above to find mental health professionals and therapists near you.
                </p>
              </div>
            )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
