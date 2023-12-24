import { styled } from "@mui/material";
import { HEADER } from "src/config-global";
import { SECONDARY } from "src/theme/colors";

export const Background = styled('div')`
  background-color: ${SECONDARY.light_green};
  min-height: 100vh;
  padding-top: ${HEADER.MAIN_HEIGHT}px;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled('div')`
  background-color: ${SECONDARY.caregiver_profile_background};
  margin-block: 16px;
  height: 980px;
  width: 720px;
`;