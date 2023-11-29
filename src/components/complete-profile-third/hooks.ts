import jwt_decode from 'jwt-decode';

import { useTypedSelector } from 'src/redux/store';
import { useUpdateProfileMutation } from 'src/redux/api/profileCompleteApi';
import { SPLIT_SEPARATOR, JOIN_SEPARATOR } from 'src/components/complete-profile-third/constants';
import { ReturnType } from 'src/components/complete-profile-third/types';

interface Data {
  [key: string]: boolean;
}

export function useCompleteProfileThird(onNext: () => void): ReturnType {
  const token = useTypedSelector((state) => state.token.token);
  const [updateServices] = useUpdateProfileMutation();
  const onUpdateServices = async (data: Data): Promise<void> => {
    const resultArray: string[] = [];
    const trueKeys = Object.keys(data).filter((elem) => data[elem] === true);
    trueKeys.forEach((element) => {
      const newElement = element.split(SPLIT_SEPARATOR).join(JOIN_SEPARATOR);
      resultArray.push(newElement);
    });
    const decoded: { id: string } = jwt_decode(token);
    try {
      await updateServices({
        userId: decoded.id,
        token,
        updateProfileDto: { services: resultArray },
      })
        .unwrap()
        .then(() => onNext());
    } catch (error) {
      throw new Error(error);
    }
  };
  return { onUpdateServices };
}
