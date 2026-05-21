export type Region = 'puebla' | 'cdmx';

export type Distributor = {
  name: string;
  address: string;
  city: string;
  state: string;
  region: Region;
  lat: number;
  lng: number;
  type: 'supermarket' | 'organic' | 'specialty' | 'restaurant';
  instagram: string;
  mapUrl: string;
};

export const getDistributorId = (dist: Distributor) =>
  `${dist.name}-${dist.lat}-${dist.lng}`;

export const REGIONS: { id: Region; label: string; emoji: string }[] = [
  { id: 'puebla', label: 'Puebla', emoji: '🌋' },
  { id: 'cdmx', label: 'CDMX', emoji: '🏙️' },
];
