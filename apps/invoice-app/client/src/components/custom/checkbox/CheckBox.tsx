import IconCheck from '#Svg/icon-check.svg';

import styles from './_CheckBox.module.scss';

interface IFilterStatus {
  draft: boolean;
  paid: boolean;
  pending: boolean;
}

type ElemProps = {
  checked: boolean;
  inputName: string;
  onClick: React.Dispatch<React.SetStateAction<IFilterStatus>>;
  title: string;
};

function CheckBox(props: ElemProps): JSX.Element {
  const { title, checked, inputName, onClick } = props;

  const checkboxHandler = (e: React.ChangeEvent) => {
    onClick((prev) => ({
      ...prev,
      [`${inputName}`]: (e.target as HTMLInputElement).checked,
    }));
  };

  return (
    <label htmlFor={inputName} className={styles['customCheckbox']}>
      <input type="checkbox" id={inputName} checked={checked} onChange={checkboxHandler} />
      <div className={styles['customCheckbox__newCheckbox']}>
        {checked && <img src={IconCheck} className={styles['customCheckbox__iconCheck']} alt="" />}
      </div>
      <p className={styles['customCheckbox__title']}>{title}</p>
    </label>
  );
}

export default CheckBox;
