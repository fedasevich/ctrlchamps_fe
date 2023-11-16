import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRequestNewVerificationCodeMutation, useSubmitVerificationCodeMutation } from 'src/redux/api/accountVerificationAPI';

const useVerification = (onSubmit: () => void) => {
    const [ submitCode ] = useSubmitVerificationCodeMutation();
    const [ requestNewCode ] = useRequestNewVerificationCodeMutation();

    const [ code, setCode ] = useState<string[]>([ '', '', '', '' ]);
    const [ codeDoesNotMatch, setCodeDoesNotMatch ] = useState<boolean>(false);

    const userId: string = useMemo(() => ' ', []);

    const fetchNewCode = useCallback(async () => {
        try {
            await requestNewCode({ userId }).unwrap();
        } catch (error) {
            throw new Error(error);
        }
    }, [ requestNewCode, userId ]);

    useEffect(() => {
        fetchNewCode();
    }, [ fetchNewCode ]);

    const handleInputChange = useCallback((index: number) => (value: string) => {
        setCode((prevCode) => {
            const newCode = [ ...prevCode ];
            newCode[ index ] = value;
            return newCode;
        });
        setCodeDoesNotMatch(false);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            const verificationCode: string = code.join('');
            await submitCode({ code: verificationCode, userId }).unwrap();
            onSubmit();
        } catch (error) {
            setCodeDoesNotMatch(true);
            setCode([ '', '', '', '' ]);
            throw new Error(error);
        }
    }, [ code, submitCode, userId, onSubmit ]);

    return {
        code,
        codeDoesNotMatch,
        handleInputChange,
        handleSubmit,
        fetchNewCode,
    };
};

export default useVerification;
