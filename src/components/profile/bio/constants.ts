import { BioFormValues } from 'src/components/profile/bio/types';

export const MAX_FILE_SIZE_BYTES = 50000000;
export const MAX_DESCRIPTION_LENGTH = 100;

export const ALLOWED_VIDEO_FORMATS = ['video/mp4', 'video/quicktime', 'video/avi'];
export const AVI_FORMAT = 'video/avi';

export const DEFAULT_BIO_VALUES: BioFormValues = { description: '' };
