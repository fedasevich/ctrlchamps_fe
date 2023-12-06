import React from 'react';
import { PRIMARY } from 'src/theme/colors';

export default function LogoIcon(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.28446 20.4424L2.70557 21.6002H4H20H21.2944L20.7155 20.4424L12.7155 4.4424L12 3.01132L11.2845 4.4424L3.28446 20.4424Z"
        stroke="#03045E"
        strokeWidth="1.6"
      />
      <path
        d="M18.0206 19.0679L20 20.7999L17.75 13.9327H6.375C10.6708 14.4149 14.7391 16.1967 18.0206 19.0679Z"
        fill={PRIMARY.navy}
      />
    </svg>
  );
}
