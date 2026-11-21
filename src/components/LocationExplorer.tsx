import React, { useMemo, useRef, useState } from 'react';
import { ExternalLink, MapPin, Search, Upload, Camera, Navigation, LoaderCircle } from 'lucide-react';
import * as exifr from 'exifr';

interface LocationExplorerProps {
  location: string;
  experienceTitle: string;
}

const KNOWN_LOCATIONS = [
  { name: 'Mangalagiri Sacred Hill & Handloom', city: 'Mangalagiri, Guntur District', lat: 16.4342, lng: 80.5685 },
  { name: 'Culinary Andhra', city: 'Amaravati, Andhra Pradesh', lat: 16.541, lng: 80.515 },
  { name: 'RK Beach Cultural Walk', city: 'Visakhapatnam, Andhra Pradesh', lat: 17.7123, lng: 83.3185 },
  { name: 'Tirupati City', city: 'Tirupati, Andhra Pradesh', lat: 13.6288, lng: 79.4192 },
  { name: 'Kondapalli Fort', city: 'Kondapalli, Andhra Pradesh', lat: 16.617, lng: 80.52 },
  { name: 'Lakshmi Narasimha Temple', city: 'Simhachalam, Visakhapatnam', lat: 17.776, lng: 83.226 },
  { name: 'Krishna River / Yaan', city: 'Amaravati, Andhra Pradesh', lat: 16.574, lng: 80.357 },
  { name: 'Amaravati Buddhist Stupa', city: 'Amaravati, Andhra Pradesh', lat: 16.5738, lng: 80.3581 },
];

function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const earthRadius = 6371;
  const toRad = (value: number) => value * Math.PI / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export const LocationExplorer: React.FC<LocationExplorerProps> = ({ location, experienceTitle }) => {
  const [query, setQuery] = useState(location);
  const [view, setView] = useState<'map' | 'street'>('map');
  const [isDetecting, setIsDetecting] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [locationResult, setLocationResult] = useState('');
  const [detectedCoordinates, setDetectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const mapUrl = useMemo(() => {
    const encoded = encodeURIComponent(query);
    if (view === 'street') {
      const known = KNOWN_LOCATIONS.find((item) => `${item.city} ${item.name}`.toLowerCase().includes(query.toLowerCase()));
      if (known) return `https://www.google.com/maps?output=svembed&cbll=${known.lat},${known.lng}&cbp=12,0,0,0,0`;
    }
    return `https://www.google.com/maps?q=${encoded}&z=15&output=embed`;
  }, [query, view]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  const detectLocation = async (file: File) => {
    setIsDetecting(true);
    setLocationResult('Reading photo location details...');
    setDetectedCoordinates(null);
    setUploadedPreview(URL.createObjectURL(file));

    try {
      const gps = await exifr.gps(file);
      if (gps?.latitude && gps?.longitude) {
        const lat = Number(gps.latitude);
        const lng = Number(gps.longitude);
        setDetectedCoordinates({ lat, lng });

        const nearest = [...KNOWN_LOCATIONS].sort((a, b) =>
          distanceKm(lat, lng, a.lat, a.lng) - distanceKm(lat, lng, b.lat, b.lng)
        )[0];
        const distance = distanceKm(lat, lng, nearest.lat, nearest.lng);

        setLocationResult(
          distance < 100
            ? `Photo GPS matches ${nearest.name}, ${nearest.city} (about ${distance.toFixed(1)} km away).`
            : `Photo GPS is at ${lat.toFixed(5)}, ${lng.toFixed(5)}. The nearest Jignasa location is ${nearest.name}, ${nearest.city}.`
        );
        setQuery(`${lat},${lng}`);
        return;
      }

      setLocationResult(
        'No GPS location is stored in this photo. Search the live map by a landmark or upload a photo with location metadata enabled.'
      );
    } catch {
      setLocationResult('This photo does not contain readable location metadata. Upload the original photo for the best result.');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <section className="space-y-5 rounded-2xl border border-[#E9D4B2] bg-white p-5 shadow-cultural sm:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A52B23]">Explore the location</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#211915]">Live map & photo location</h2>
        </div>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start rounded-full border border-[#D9C7B0] bg-[#FFF8EA] px-4 py-2 text-xs font-bold text-[#A52B23] hover:border-[#A52B23]">
          Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#966000]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && setQuery(event.currentTarget.value)}
                aria-label="Search location on Google Maps"
                className="h-11 w-full rounded-xl border border-[#D9C7B0] bg-[#FFFDF8] pl-10 pr-3 text-sm outline-none focus:border-[#A52B23]"
              />
            </label>
            <button type="button" onClick={() => setQuery(location)} className="h-11 rounded-xl border border-[#D9C7B0] px-4 text-xs font-bold text-[#66574A] hover:border-[#A52B23]">
              Reset
            </button>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setView('map')} className={`rounded-full px-4 py-2 text-xs font-bold ${view === 'map' ? 'bg-[#A52B23] text-white' : 'border border-[#D9C7B0] text-[#66574A]'}`}>Map</button>
            <button type="button" onClick={() => setView('street')} className={`rounded-full px-4 py-2 text-xs font-bold ${view === 'street' ? 'bg-[#A52B23] text-white' : 'border border-[#D9C7B0] text-[#66574A]'}`}>Street Live View</button>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#D9C7B0] bg-[#F8ECD5]">
            <iframe
              title={`${experienceTitle} Google Maps view`}
              src={mapUrl}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="rounded-xl border border-[#E9D4B2] bg-[#FFF8EA] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Camera className="h-4 w-4 text-[#A52B23]" />
            <h3 className="font-serif text-lg font-bold">Find location from photo</h3>
          </div>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic" className="hidden" onChange={(event) => event.target.files?.[0] && detectLocation(event.target.files[0])} />
          <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CDBD9F] bg-white px-4 py-7 text-center text-sm font-semibold text-[#66574A] hover:border-[#A52B23]">
            {uploadedPreview ? <img src={uploadedPreview} alt="Uploaded location preview" className="mb-3 max-h-36 w-full rounded-lg object-cover" /> : <Upload className="mb-3 h-7 w-7 text-[#A52B23]" />}
            <span>{uploadedPreview ? 'Choose another photo' : 'Upload a photo'}</span>
          </button>

          {isDetecting && <div className="mt-3 flex items-center gap-2 text-xs text-[#66574A]"><LoaderCircle className="h-4 w-4 animate-spin" />Detecting location...</div>}
          {locationResult && (
            <div className="mt-3 rounded-xl border border-[#D9C7B0] bg-white p-3 text-xs leading-relaxed text-[#524033]">
              <div className="mb-1 flex items-center gap-1.5 font-bold text-[#A52B23]"><Navigation className="h-3.5 w-3.5" />Location result</div>
              {locationResult}
            </div>
          )}

          {detectedCoordinates && (
            <button type="button" onClick={() => setQuery(`${detectedCoordinates.lat},${detectedCoordinates.lng}`)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#211915] px-3 py-3 text-xs font-bold text-white">
              <MapPin className="h-3.5 w-3.5 text-[#F0B323]" /> Show photo on map
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
