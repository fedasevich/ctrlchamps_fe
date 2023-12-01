import { getDetails } from 'use-places-autocomplete';
import { AutocompletedLocation } from '../types';
import { PLACES_DETAILS_FIELDS } from './constants';
import { AddressComponent } from './enums';

export const getPlaceIdDetails = async (placeId: string): Promise<AutocompletedLocation> => {
  try {
    const placeResult = await getDetails({
      placeId,
      fields: PLACES_DETAILS_FIELDS,
    });

    if (!placeResult) {
      throw new Error();
    }

    const addressInfo: AutocompletedLocation = {
      country: '',
      city: '',
      address: '',
      state: '',
      zipCode: '',
      utcOffset: 0,
    };

    if (typeof placeResult === 'string' || !placeResult.address_components) {
      throw new Error();
    }

    placeResult.address_components.forEach((component) => {
      switch (true) {
        case component.types.includes(AddressComponent.Country):
          addressInfo.country = component.long_name;
          break;
        case component.types.includes(AddressComponent.Locality):
          addressInfo.city = component.long_name;
          break;
        case component.types.includes(AddressComponent.Route) ||
          component.types.includes(AddressComponent.StreetNumber):
          addressInfo.address = component.long_name;
          break;
        case component.types.includes(AddressComponent.AdministrativeAreaLevel1):
          addressInfo.state = component.long_name;
          break;
        case component.types.includes(AddressComponent.PostalCode):
          addressInfo.zipCode = component.long_name;
          break;
        default:
          break;
      }
    });

    addressInfo.utcOffset = placeResult.utc_offset_minutes || 0;

    return addressInfo;
  } catch (error) {
    throw new Error(error);
  }
};
