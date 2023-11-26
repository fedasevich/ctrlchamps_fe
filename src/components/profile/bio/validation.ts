import { ObjectSchema, mixed, string, object } from 'yup';

import { useLocales } from 'src/locales';
import {
  ALLOWED_VIDEO_FORMATS,
  MAX_DESCRIPTION_LENGTH,
  MAX_FILE_SIZE_BYTES,
} from 'src/components/profile/bio/constants';
import { BioFormValues } from 'src/components/profile/bio/types';

export const useBioFormSchema = (): ObjectSchema<BioFormValues> => {
  const { translate } = useLocales();

  return object({
    video: mixed<File>()
      .test(
        'fileFormat',
        translate('profileBio.fileFormatError'),
        (value) => !value || (value instanceof File && ALLOWED_VIDEO_FORMATS.includes(value.type))
      )
      .test(
        'fileSize',
        translate('profileBio.fileSizeError'),
        (value) => !value || (value instanceof File && value.size <= MAX_FILE_SIZE_BYTES)
      ),
    description: string()
      .required(translate('profileBio.descriptionRequired'))
      .max(MAX_DESCRIPTION_LENGTH, translate('profileBio.descriptionMaxLength')),
  });
};
