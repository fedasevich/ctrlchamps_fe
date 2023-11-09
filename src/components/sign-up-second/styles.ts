import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 480px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px 0;
  height: 80vh;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const NextButton = styled.button`
  width: 100%;
  background-color: #08bcb8;
  padding: 8px 22px;
  text-align: center;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.73;
  letter-spacing: 0.46px;
  color: #ffffff;
  cursor: pointer;
  margin-top: auto;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 480px;

  & .react-datepicker__triangle {
    display: none;
  }

  & .react-datepicker-popper {
    z-index: 111;
    inset: 0px auto auto 100px;
  }
`;

export const ErrorMessage = styled.p`
  color: #f97484;
  font-size: 12px;
`;
