/* eslint-disable jsx-a11y/label-has-associated-control */
import { useId } from 'react';

import styles from './_Toggle.module.scss';

const themeToggle = () => {
  const body = document.querySelector('body');
  body?.classList.toggle('dark-theme');
};

function Toggle() {
  const toggleId = useId();

  return (
    <div className={styles['toggleSlider']}>
      <label htmlFor={toggleId}>
        <input type="checkbox" id={toggleId} onClick={themeToggle} />
        <span />
      </label>
    </div>
  );
}

export default Toggle;
