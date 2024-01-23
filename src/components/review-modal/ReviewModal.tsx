import { SyntheticEvent, useState } from 'react';
import { FilledInput, FormControl, Stack, TextField } from '@mui/material';

import Modal from 'src/components/reusable/modal/Modal';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import {
  CaregiverInfo,
  CaregiverName,
  ErrorMessage,
  RatingWrapper,
  StyledFormControl,
  StyledRating,
  StyledSubmitButton,
  SubTitle,
  UserRole,
} from 'src/components/review-modal/styles';
import { SMALL_AVATAR_SIZE } from 'src/constants';
import { useLocales } from 'src/locales';
import { SECONDARY } from 'src/theme/colors';

type Props = {
  isReviewCaregiverModalActive: boolean;
  handleReviewCaregiverModal: () => void;
  caregiverId: string;
  caregiverName: string;
};

export default function ReviewModal({
  isReviewCaregiverModalActive,
  handleReviewCaregiverModal,
  caregiverId,
  caregiverName,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (
    event: SyntheticEvent<Element, Event>,
    newRating: number | null
  ): void => setRating(newRating);

  return (
    <Modal
      title={translate('caregiverReview.title')}
      isActive={isReviewCaregiverModalActive}
      onClose={handleReviewCaregiverModal}
      backgroundColor={SECONDARY.drawer_background}
    >
      <>
        <CaregiverInfo>
          <UserRole>Caregiver</UserRole>
          <Stack direction="row" alignItems="center">
            <UserAvatar userId={caregiverId} size={SMALL_AVATAR_SIZE} />
            <CaregiverName>{caregiverName}</CaregiverName>
          </Stack>
        </CaregiverInfo>

        <SubTitle>{translate('caregiverReview.rate')}</SubTitle>
        <RatingWrapper>
          <StyledRating name="rating" size="large" value={rating} onChange={handleRatingChange} />
        </RatingWrapper>

        <SubTitle>{translate('caregiverReview.shareExperience')}</SubTitle>
        <StyledFormControl variant="filled">
          <TextField
            // {...register('review')}
            label={translate('caregiverReview.reviewPlaceholder')}
            // error={!!errors.firstName}
            variant="standard"
            autoComplete="off"
            fullWidth
            size="small"
            type="text"
          />
        </StyledFormControl>
        {/* {errors?.firstName && (
          <ErrorMessage variant="caption">{errors.firstName?.message}</ErrorMessage>
        )} */}
<CaregiverInfo>

        <StyledSubmitButton variant='contained' type='submit'>fff</StyledSubmitButton>
</CaregiverInfo>
      </>
    </Modal>
  );
}
