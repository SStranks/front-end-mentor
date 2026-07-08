import type { ToasterProps } from 'react-hot-toast';

import { Toaster as ReactHotToast } from 'react-hot-toast';

import styles from '../assets/sass/toast.module.scss';

const toasterOptions: ToasterProps = {
  containerClassName: '',
  containerStyle: { margin: '8px' },
  gutter: 8,
  position: 'top-center',
  reverseOrder: false,
  toastOptions: {
    // ------------------------------ //
    // ---- Blank Toast Options ----- //
    // ------------------------------ //
    blank: {},
    // ariaProps: {},
    className: styles['toastDefault'],
    // ------------------------------ //
    // ---- Custom Toast Options ---- //
    // ------------------------------ //
    custom: {},
    // ------------------------------ //
    // ---- Default Toast options --- //
    // ------------------------------ //
    // id: '',
    // icon: '',
    duration: 5000,
    // ------------------------------ //
    // ---- Error Toast Options ----- //
    // ------------------------------ //
    error: {
      duration: 5000,
    },
    // ------------------------------ //
    // ---- Loading Toast Options --- //
    // ------------------------------ //
    loading: {},
    // style: {},
    // position: '',
    // iconTheme: {},
    // ------------------------------ //
    // ---- Success Toast Options --- //
    // ------------------------------ //
    success: {
      className: styles['toastSuccess'],
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'white',
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
