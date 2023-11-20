import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from 'src/redux/store';
import { ACCOUNT_VERIFIED_RESPONSE_MESSAGE, NO_ACCOUNT_TO_VERIFY_RESPONSE_MESSAGE } from 'src/components/sendOTP/constants';
import { useRequestNewVerificationCodeMutation, useSubmitVerificationCodeMutation } from 'src/redux/api/accountVerificationAPI';

import jwt_decode from 'jwt-decode';

interface UseVerificationProps {
  onSubmit: () => void;
}

interface UseVerificationResult {
  code: string[];
  codeDoesNotMatch: boolean;
  userId: string;
  handleInputChange: (index: number) => (value: string) => void;
  handleSubmit: () => Promise<void>;
  fetchNewCode: () => Promise<void>;
}

const useVerification = ({ onSubmit }: UseVerificationProps): UseVerificationResult => {
  const router = useRouter();

  const [ submitCode ] = useSubmitVerificationCodeMutation();
  const [ requestNewCode ] = useRequestNewVerificationCodeMutation();

  const [ code, setCode ] = useState<string[]>([ '', '', '', '' ]);
  const [ codeDoesNotMatch, setCodeDoesNotMatch ] = useState<boolean>(false);
  const [ isCodeFetched, setIsCodeFetched ] = useState<boolean>(false);
  const [ userId, setUserId ] = useState<string>('');


  const token = useSelector((state: RootState) => state.token.token);

  const fetchNewCode = useCallback(async () => {
    try {
      if (!isCodeFetched && token) {
        const decoded: { id: string; iat: number, exp: number; } = jwt_decode(token);
        setUserId(decoded.id);
        await requestNewCode({ userId: decoded.id })
          .unwrap()
          .catch(({ data }: { data: { message: string, statusCode: number; }; }) => {
            if (data.message === ACCOUNT_VERIFIED_RESPONSE_MESSAGE) {
              onSubmit();
            } else if (data.message === NO_ACCOUNT_TO_VERIFY_RESPONSE_MESSAGE) {
              router.push('/');
            }
          });
        setIsCodeFetched(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [ isCodeFetched, token, requestNewCode, onSubmit, router ]);


  const handleInputChange = useCallback(
    (index: number) => (value: string) => {
      setCode((prevCode) => {
        const newCode = [ ...prevCode ];
        newCode[ index ] = value;
        return newCode;
      });
      setCodeDoesNotMatch(false);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const verificationCode: string = code.join('');
      await submitCode({ code: verificationCode, userId }).unwrap();
      onSubmit();
    } catch (error) {
      setCodeDoesNotMatch(true);
      setCode([ '', '', '', '' ]);
    }
  }, [ code, submitCode, userId, onSubmit ]);

  useEffect(() => {
    fetchNewCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    code,
    codeDoesNotMatch,
    userId,
    handleInputChange,
    handleSubmit,
    fetchNewCode,
  };
};

export default useVerification;