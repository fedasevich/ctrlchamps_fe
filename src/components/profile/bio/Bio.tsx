import { ChangeEvent, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller, ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FilledInput, InputLabel, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

import { useUploadFileMutation, useUpdateProfileMutation } from 'src/redux/api/profileCompleteApi';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useLocales } from 'src/locales';
import { ROUTES } from 'src/routes';
import { useBioFormSchema } from 'src/components/profile/bio/validation';
import {
  ErrorMessage,
  MediaWrapper,
  StyledSubmitButton,
  StyledForm,
  StyledIconButton,
  StyledVideo,
  VideocamIcon,
  StyledFormControl,
  NotAllowIcon,
} from 'src/components/profile/bio/styles';
import { BioFormValues } from 'src/components/profile/bio/types';
import {
  AVI_FORMAT,
  DEFAULT_BIO_VALUES,
  MOV_FORMAT,
  MP4_FORMAT,
} from 'src/components/profile/bio/constants';

export function Bio(): JSX.Element {
  const [videoPreviewURL, setVideoPreviewURL] = useState<string>('');
  const [uploadVideoMutation] = useUploadFileMutation();
  const [updateDescription] = useUpdateProfileMutation();
  const token = useSelector((state: RootState) => state.token.token);

  const { translate } = useLocales();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<BioFormValues> = async (data) => {
    try {
      if (data.video) {
        await uploadVideoMutation({
          file: data.video,
        });
      }
      await updateDescription({
        updateProfileDto: { description: data.description },
      })
        .unwrap()
        .then(() => router.push(ROUTES.schedule));
    } catch (error) {
      throw new Error(error);
    }
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
  };

  const renderVideoPreview = (videoFormat?: string): JSX.Element => {
    switch (videoFormat) {
      case AVI_FORMAT:
        return <VideocamIcon />;
      case MP4_FORMAT:
      case MOV_FORMAT:
        return <StyledVideo src={videoPreviewURL} />;
      default:
        return <NotAllowIcon color="error" />;
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
            <FilledInput {...field} multiline maxRows={4} error={!!errors.description} />
          )}
        />
        {errors?.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
      </FormControl>

      {videoPreviewURL && (
        <MediaWrapper>
          {renderVideoPreview(video?.type)}
          <StyledIconButton onClick={onDeleteVideo} size="small" edge="start" color="inherit">
            <Close />
          </StyledIconButton>
        </MediaWrapper>
      )}

      {errors?.video && <ErrorMessage>{errors.video?.message}</ErrorMessage>}

      <StyledFormControl fullWidth variant="filled">
        {!video && (
          <Controller
            name="video"
            control={control}
            render={({ field }): ReactElement => (
              <Button
                component="label"
                variant="outlined"
                startIcon={<VideocamOutlinedIcon fontSize="large" />}
              >
                {translate('profileBio.addVideo')}
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e): void => onFileChange(e, field)}
                  hidden
                />
              </Button>
            )}
          />
        )}
      </StyledFormControl>

      <StyledSubmitButton type="submit" disabled={!isValid} variant="contained" color="primary">
        {translate('profileBio.submit')}
      </StyledSubmitButton>
    </StyledForm>
  );
}
