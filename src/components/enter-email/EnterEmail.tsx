import { Container, TextField, Typography } from '@mui/material';
import { FilledButton } from 'src/components/reusable/FilledButton';
import { SECONDARY } from 'src/theme/colors';
import { ErrorText } from '../reusable/ErrorText';
import { useEnterEmail } from './hooks';

export default function EnterEmail({ next }: { next: () => void }): JSX.Element {
  const { email, onChange, onSubmit, emailNotExists, isDisabled, translate } = useEnterEmail(next);

  return (
    <Container sx={{ mt: 3 }} maxWidth="xs">
      <Typography color={SECONDARY.md_gray}>{translate('reset_password.enter_email')}</Typography>
      <form onSubmit={onSubmit} data-testid="form">
        <TextField
          value={email}
          onChange={onChange}
          fullWidth
          sx={{ color: SECONDARY.md_gray, mt: 6 }}
          label={translate('reset_password.input_label')}
          variant="filled"
          inputProps={{ 'data-testid': 'enter-email' }}
        />
        {emailNotExists && <ErrorText>{translate('reset_password.errors.email')}</ErrorText>}
        <FilledButton
          data-testid="btn"
          type="submit"
          fullWidth
          disabled={isDisabled}
          sx={{ mt: 2 }}
        >
          {translate('reset_password.btn_reset')}
        </FilledButton>
      </form>
    </Container>
  );
}
