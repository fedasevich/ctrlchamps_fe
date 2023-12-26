import { PRIMARY } from 'src/theme/colors';

export default function FavoriteIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
      <g>
        <path
          d="M48 78.615L44.9692 75.8765C38.441 69.9124 33.041 64.8074 28.7692 60.5612C24.4974 56.315 21.1256 52.5701 18.6538 49.3265C16.182 46.0829 14.4551 43.1483 13.4731 40.5227C12.491 37.897 12 35.256 12 32.5996C12 27.5124 13.7282 23.2406 17.1846 19.7842C20.641 16.3278 24.9128 14.5996 30 14.5996C33.5179 14.5996 36.8179 15.4996 39.9 17.2996C42.9821 19.0996 45.6821 21.7175 48 25.1534C50.3179 21.7175 53.0179 19.0996 56.1 17.2996C59.1821 15.4996 62.4821 14.5996 66 14.5996C71.0872 14.5996 75.359 16.3278 78.8154 19.7842C82.2718 23.2406 84 27.5124 84 32.5996C84 35.256 83.509 37.897 82.5269 40.5227C81.5449 43.1483 79.818 46.0829 77.3462 49.3265C74.8744 52.5701 71.5154 56.315 67.2693 60.5612C63.0231 64.8074 57.6103 69.9124 51.0308 75.8765L48 78.615ZM48 73.1996C54.4 67.415 59.6667 62.4599 63.8 58.3342C67.9333 54.2086 71.2 50.6291 73.6 47.5958C76 44.5625 77.6667 41.8753 78.6 39.5342C79.5333 37.1932 80 34.8817 80 32.5996C80 28.5996 78.6667 25.2663 76 22.5996C73.3333 19.9329 70 18.5996 66 18.5996C62.8154 18.5996 59.8769 19.5086 57.1846 21.3265C54.4923 23.1444 52.0821 25.8816 49.9539 29.5381H46.0461C43.8666 25.8304 41.4436 23.0804 38.7769 21.2881C36.1102 19.4958 33.1846 18.5996 30 18.5996C26.0513 18.5996 22.7308 19.9329 20.0385 22.5996C17.3462 25.2663 16 28.5996 16 32.5996C16 34.8817 16.4667 37.1932 17.4 39.5342C18.3333 41.8753 20 44.5625 22.4 47.5958C24.8 50.6291 28.0667 54.1958 32.2 58.2958C36.3333 62.3958 41.6 67.3637 48 73.1996Z"
          fill={PRIMARY.main}
        />
      </g>
    </svg>
  );
}
