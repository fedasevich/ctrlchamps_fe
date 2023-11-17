import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRequestNewVerificationCodeMutation, useSubmitVerificationCodeMutation } from 'src/redux/api/accountVerificationAPI';
import jwt from 'jsonwebtoken';

const useVerification = (onSubmit: () => void) => {
    const [ submitCode ] = useSubmitVerificationCodeMutation();
    const [ requestNewCode ] = useRequestNewVerificationCodeMutation();

    const [ code, setCode ] = useState<string[]>([ '', '', '', '' ]);
    const [ codeDoesNotMatch, setCodeDoesNotMatch ] = useState<boolean>(false);

    const [ userId, setUserId ] = useState<string>('');

    const fetchNewCode = useCallback(async () => {
        try {
            await requestNewCode({ userId }).unwrap();
        } catch (error) {
            // throw new Error(error);
        }
    }, [ requestNewCode, userId ]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
    }, []);

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
            // throw new Error(error);
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
