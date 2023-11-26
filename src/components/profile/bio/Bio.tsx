import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useForm, Controller, ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FilledInput, InputLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

import { useBioFormSchema } from 'src/components/profile/bio/validation';
import {
  ErrorMessage,
  MediaWrapper,
  StyledSubmitButton,
  StyledForm,
  StyledIconButton,
  StyledVideo,
  VideocamIcon,
  StyledButton,
} from 'src/components/profile/bio/styles';
import { BioFormValues } from 'src/components/profile/bio/types';
import { AVI_FORMAT, DEFAULT_BIO_VALUES } from 'src/components/profile/bio/constants';
import { useLocales } from 'src/locales';

export function Bio(): JSX.Element {
  const [videoPreviewURL, setVideoPreviewURL] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { translate } = useLocales();

  const bioFormSchema = useBioFormSchema();

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm<BioFormValues>({
    resolver: yupResolver(bioFormSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_BIO_VALUES,
  });

  const video = watch('video');

  const onSubmit: SubmitHandler<BioFormValues> = (data) => {
    // TODO: connect to redux (B&F task)
  };

  const onFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<BioFormValues, 'video'>
  ): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      field.onChange(file);
      setVideoPreviewURL(URL.createObjectURL(file));
    }
  };

  const onDeleteVideo = (): void => {
    resetField('video');
    URL.revokeObjectURL(videoPreviewURL);
    setVideoPreviewURL('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificationName">
          {translate('profileBio.fewFactsAboutYou')}
        </InputLabel>
        <Controller
          name="description"
          control={control}
          render={({ field }): ReactElement => (
            <FilledInput {...field} error={!!errors.description} />
          )}
        />
        {errors?.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        {videoPreviewURL && (
          <MediaWrapper>
            {video?.type === AVI_FORMAT ? (
              <VideocamIcon />
            ) : (
              <StyledVideo src={videoPreviewURL}>
                <track kind="captions" />
              </StyledVideo>
            )}
            <StyledIconButton onClick={onDeleteVideo} size="small" edge="start" color="inherit">
              <Close />
            </StyledIconButton>
          </MediaWrapper>
        )}
        {!video && (
          <Controller
            name="video"
            control={control}
            render={({ field }): ReactElement => (
              <StyledButton
                component="label"
                variant="outlined"
                startIcon={<VideocamOutlinedIcon fontSize="large" />}
              >
                {translate('profileBio.addVideo')}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e): void => onFileChange(e, field)}
                  hidden
                />
              </StyledButton>
            )}
          />
        )}
        {errors?.video && <ErrorMessage>{errors.video?.message}</ErrorMessage>}
      </FormControl>

      <StyledSubmitButton type="submit" disabled={!isValid} variant="contained" color="primary">
        {translate('profileBio.submit')}
      </StyledSubmitButton>
    </StyledForm>
  );
}
