import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { AUTO_HIDEOUT_DELAY } from 'src/constants';
import { useLocales } from 'src/locales';

type Props = {
  passwordUpdated: boolean;
  setPasswordUpdated: Dispatch<SetStateAction<boolean>>;
};

export default function UpdatePasswordSuccess({
  passwordUpdated,
  setPasswordUpdated,
}: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Snackbar
      open={passwordUpdated}
      autoHideDuration={AUTO_HIDEOUT_DELAY}
      onClose={(): void => setPasswordUpdated(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="success">{translate('changePassword.success')}</Alert>
    </Snackbar>
  );
}
