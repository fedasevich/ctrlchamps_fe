import styled from '@emotion/styled';
import { TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { APPOINTMENT_STATUS } from 'src/constants';

export const StatusWrapper = styled.p<{ status: string }>`
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: ${(props): string => {
    const colorMap: Record<string, string> = {
      [APPOINTMENT_STATUS.Pending]: TEXT_COLOR.pending,
      [APPOINTMENT_STATUS.Accepted]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Active]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Completed]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Ongoing]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Virtual]: TEXT_COLOR.active,
      [APPOINTMENT_STATUS.Rejected]: TEXT_COLOR.rejected,
    };

    return colorMap[props.status];
  }};
`;
