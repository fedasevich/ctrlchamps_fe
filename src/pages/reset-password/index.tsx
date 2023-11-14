import Head from 'next/head';
import { useRouter } from 'next/router';
import PasswordShieldIcon from 'src/assets/icons/PasswordShieldIcon';
import EnterEmail from 'src/components/enter-email/EnterEmail';
import { FilledButton } from 'src/components/reusable/FilledButton';
import SignUpHeader from 'src/components/reusable/header';
import { Verification, VerificationSuccess } from 'src/components/verification';
import { useLocales } from 'src/locales';
import { ROUTES } from 'src/routes';

export default function ResetPassword(): JSX.Element {
  const { translate } = useLocales();
  const { push } = useRouter();
  return (
    <>
      <Head>
        <title>{translate('reset_password.title')}</title>
      </Head>
      <SignUpHeader text={translate('reset_password.title')} />
      <EnterEmail />
      <Verification text={translate('reset_password.sent_code')} />
      <VerificationSuccess
        icon={<PasswordShieldIcon />}
        title={translate('reset_password.success')}
        text={translate('reset_password.instructions')}
      >
        <FilledButton onClick={(): Promise<boolean> => push(ROUTES.login)}>
          {translate('reset_password.btn_back')}
        </FilledButton>
      </VerificationSuccess>
    </>
  );
}
