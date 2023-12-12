import { PRIMARY } from 'src/theme/colors';

interface IProps {
  color?: string;
}

export default function RightAction({ color }: IProps): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {color ? (
        <g opacity="1">
          <path
            d="M9.70687 6L8.29688 7.41L12.8769 12L8.29688 16.59L9.70687 18L15.7069 12L9.70687 6Z"
            fill={PRIMARY.main}
            fillOpacity="1"
          />
        </g>
      ) : (
        <g opacity="0.5">
          <path
            d="M9.70687 6L8.29688 7.41L12.8769 12L8.29688 16.59L9.70687 18L15.7069 12L9.70687 6Z"
            fill="black"
            fillOpacity="0.56"
          />
        </g>
      )}
    </svg>
  );
}
