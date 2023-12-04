import { TabProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      defaultProps: {
        textColor: 'inherit',
        allowScrollButtonsMobile: true,
        variant: 'scrollable',
      },
      styleOverrides: {
        scrollButtons: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        iconPosition: 'start',
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: TabProps }) => ({
          padding: 0,
          opacity: 1,
          fontWeight: theme.typography.fontWeightMedium,
          '&:not(:last-of-type)': {
            padding: theme.spacing(2),
          },
          '&:not(.Mui-selected)': {
            color: theme.palette.text.secondary,
          },
          '&.Mui-selected': {
            color: theme.palette.secondary.main,
          },
          ...((ownerState.iconPosition === 'start' || ownerState.iconPosition === 'end') && {
            minHeight: 48,
          }),
        }),
      },
    },
  };
}
