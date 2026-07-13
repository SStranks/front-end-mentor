import { useState } from 'react';

import IconCheck from '@Svg/icon-check.svg';

import styles from './_CheckBox.module.scss';

type TProps = {
  id: string;
  checked: boolean;
  title: string;
  updateRHF: (...event: unknown[]) => void;
};

// NOTE:  For consumption by React Hook Form.
function CheckBox(props: TProps): JSX.Element {
  const { id, title, checked, updateRHF } = props;
  const [isChecked, setIsChecked] = useState(checked || false);

  const changeHandler = (e: React.ChangeEvent) => {
    const checkboxBoolean = (e.target as HTMLInputElement).checked;
    setIsChecked(checkboxBoolean);
    updateRHF(checkboxBoolean);
  };

  return (
    <label htmlFor={`checkbox-${id}`} className={styles['customCheckbox']}>
      <input type="checkbox" id={`checkbox-${id}`} checked={isChecked} onChange={changeHandler} />
      <div className={styles['customCheckbox__newCheckbox']}>
        {isChecked && <img src={IconCheck} className={styles['customCheckbox__iconCheck']} alt="" />}
      </div>
      <p className={styles['customCheckbox__title']}>{title}</p>
    </label>
  );
}

export default CheckBox;
