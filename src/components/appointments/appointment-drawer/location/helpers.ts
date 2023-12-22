import { LatLng } from 'use-places-autocomplete';

export const getMapRedirectUrl = ({ lat, lng }: LatLng): string =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
