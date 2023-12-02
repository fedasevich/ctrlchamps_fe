import { Autocomplete, AutocompleteRenderInputParams, Grid, TextField } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';
import { HTMLAttributes, SyntheticEvent, useState } from 'react';
import Location from 'src/assets/icons/Location';
import {
  PLACES_API_KEY,
  PLACES_COUNTRY_RESTRICTIONS,
  PLACES_DEBOUNCE_DELAY,
  PLACES_SCRIPT_LIBRARIES,
} from 'src/components/create-appointment-fourth/places-autocomplete/constants';
import { getPlaceIdDetails } from 'src/components/create-appointment-fourth/places-autocomplete/helpers';
import {
  ErrorMessage,
  StyledGrid,
} from 'src/components/create-appointment-fourth/places-autocomplete/styles';
import { AutocompletedLocation } from 'src/components/create-appointment-fourth/types';
import { useLocales } from 'src/locales';
import usePlacesAutocomplete from 'use-places-autocomplete';

interface CreateAppointmentFourthAutocompleteProps {
  onLocationChange: (newLocation: AutocompletedLocation) => void;
}

export default function CreateAppointmentFourthAutocomplete({
  onLocationChange,
}: CreateAppointmentFourthAutocompleteProps): JSX.Element | null {
  const {
    currentLang: { value: placesAutocompleteLanguage },
  } = useLocales();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: PLACES_API_KEY,
    libraries: PLACES_SCRIPT_LIBRARIES,
    language: placesAutocompleteLanguage,
  });

  if (!isLoaded) return null;

  return <PlacesAutocomplete onLocationChange={onLocationChange} />;
}

function PlacesAutocomplete({
  onLocationChange,
}: CreateAppointmentFourthAutocompleteProps): JSX.Element {
  const { translate } = useLocales();
  const {
    value: location,
    setValue: setLocation,
    suggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: PLACES_COUNTRY_RESTRICTIONS } },
    debounce: PLACES_DEBOUNCE_DELAY,
  });

  const [autocompleteValue, setAutocompleteValue] =
    useState<google.maps.places.AutocompletePrediction | null>(null);
  const [autocompleteError, setAutocompleteError] = useState<string | null>(null);

  const handleAutocompleteChange = async (
    _event: SyntheticEvent<Element, Event>,
    newValue: google.maps.places.AutocompletePrediction | null
  ): Promise<void> => {
    setAutocompleteValue(newValue);

    if (!newValue) {
      return;
    }

    const { place_id: placeId, description } = newValue;

    try {
      await getPlaceIdDetails(placeId)
        .then((data) => {
          if (!Object.values(data).every((value) => Boolean(value))) {
            setAutocompleteError(translate('createAppointmentFourth.notPreciseLocation'));
            return;
          }

          setLocation(description, false);
          onLocationChange(data);
          setAutocompleteError(null);
        })
        .catch(() => {
          setAutocompleteError(translate('createAppointmentFourth.addressDetailsFailed'));
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleInputChange = (
    _event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ): void => {
    setLocation(newInputValue);
  };

  return (
    <>
      <Autocomplete
        id="google-map-places"
        getOptionLabel={(option): string =>
          typeof option === 'string' ? option : option.description
        }
        options={suggestions.data}
        autoComplete
        includeInputInList
        popupIcon={<Location />}
        filterSelectedOptions
        isOptionEqualToValue={(option, value): boolean => option.description === value.description}
        value={autocompleteValue}
        inputValue={location}
        noOptionsText={translate('createAppointmentFourth.noLocations')}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        renderInput={(params): React.ReactNode => (
          <AutocompleteInput error={!!autocompleteError} params={params} />
        )}
        renderOption={AutocompleteOption}
      />
      {!!autocompleteError && (
        <ErrorMessage data-testid="country-error">{autocompleteError}</ErrorMessage>
      )}
    </>
  );
}

function AutocompleteInput({
  error,
  params,
}: {
  error: boolean;
  params: AutocompleteRenderInputParams;
}): React.ReactNode {
  const { translate } = useLocales();
  return (
    <TextField
      name="test"
      error={error}
      variant="filled"
      {...params}
      label={translate('createAppointmentFourth.area')}
      fullWidth
    />
  );
}

function AutocompleteOption(
  props: HTMLAttributes<HTMLLIElement>,
  option: google.maps.places.AutocompletePrediction
): React.ReactNode {
  const { description } = option;
  return (
    <li {...props}>
      <Grid container alignItems="center">
        <StyledGrid item>{description}</StyledGrid>
      </Grid>
    </li>
  );
}
