import type { TStatusArr } from '#Types/types';
import { useEffect, useRef, useState } from 'react';
import IconDown from '#Svg/icon-chevron-down.svg';
import styles from './_Dropdown.module.scss';

type TProps = {
  name: string;
  currentListItem: string;
  listItems: TStatusArr[];
  updateRHF: (...event: unknown[]) => void;
};

// NOTE:  This component is for consumption by React Hook Form <Controller />
function Dropdown(props: TProps): JSX.Element {
  const { name, currentListItem, listItems, updateRHF } = props;
  const [status, setStatus] = useState<string>(currentListItem);
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // DEBUG:  Modal has same keypress (Esc); it will fire modal one too if same key - is there a way to focus perhaps?
    // const keyPressHandler = (e: KeyboardEvent) =>
    //   (e.key === 'Escape' || e.key === 'Esc') &&
    //   listRef.current?.classList.add('hidden');

    const clickHandler = (e: MouseEvent) => {
      if (e.target !== listRef.current && !dropdownContainer.current?.contains(e.target as HTMLElement)) {
        listRef.current?.classList.add('hidden');
      }
    };

    document?.addEventListener('click', clickHandler);
    // document?.addEventListener('keyup', keyPressHandler);
    return () => {
      document?.addEventListener('click', clickHandler);
      // document.removeEventListener('keyup', keyPressHandler);
    };
  }, []);

  const dropdownClickHandler = () => {
    if (listRef.current) {
      listRef.current.classList.toggle('hidden');
    }
  };

  const listItemClickHandler = (e: React.MouseEvent) => {
    dropdownClickHandler();
    const status = (e.target as HTMLButtonElement).value;
    setStatus(status);
    updateRHF(status);
  };

  const listElems = listItems.map(({ name, _id: id }) => (
    <button
      key={id}
      type="button"
      value={name}
      className={styles.list__item}
      onClick={listItemClickHandler}
      data-column-id={id}>
      {name}
    </button>
  ));

  return (
    <div className={styles.dropdown} ref={dropdownContainer}>
      <input type="text" value={status} name={name} className={styles.dropdown__input} readOnly />
      <button type="button" className={styles.dropdown__button} onClick={dropdownClickHandler}>
        {currentListItem}
        <img src={IconDown} alt="" />
      </button>
      <div className={`${styles.list} hidden`} ref={listRef}>
        {listElems}
      </div>
    </div>
  );
}

export default Dropdown;
