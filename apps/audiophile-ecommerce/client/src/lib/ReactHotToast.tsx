import type { ToasterProps } from 'react-hot-toast';

import { Toaster as ReactHotToast } from 'react-hot-toast';

import styles from '../assets/sass/_exports.module.scss';

const toasterOptions: ToasterProps = {
  containerClassName: '',
  containerStyle: { margin: '8px' },
  gutter: 8,
  position: 'top-center',
  reverseOrder: false,
  toastOptions: {
    // Define default options
    className: '',
    duration: 5000,
    error: {
      duration: 5000,
      style: {
        background: styles['colorToastRed'],
        color: 'white',
        textShadow: '0px 0px 8px hsl(0deg 0% 0% / 0.3)',
      },
    },

    style: {
      background: styles['colorToastRoyalBlue'],
      color: 'white',
      fontSize: '18px',
      fontWeight: '500',
      padding: '16px 24px',
    },
    // Default options for specific types
    success: {
      duration: 8000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  },
};

export default function Toaster(): JSX.Element {
  return (
    <ReactHotToast
      position={toasterOptions.position}
      reverseOrder={toasterOptions.reverseOrder}
      gutter={toasterOptions.gutter}
      containerClassName={toasterOptions.containerClassName}
      containerStyle={toasterOptions.containerStyle}
      toastOptions={toasterOptions.toastOptions}
    />
  );
}
