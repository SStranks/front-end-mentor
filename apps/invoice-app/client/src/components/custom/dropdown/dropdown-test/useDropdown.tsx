import { useEffect, useState } from 'react';

import styles from './Dropdown.module.scss';

interface IProps {
  optionsArray: string[];
  selectContainerRef: React.RefObject<HTMLDivElement>;
  selectListRef: React.RefObject<HTMLUListElement>;
}

function useDropdown(props: IProps) {
  const { optionsArray, selectListRef, selectContainerRef } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentOption, setCurrentOptionInternal] = useState(optionsArray[0]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const setCurrentOption = (option: string) => {
    setCurrentOptionInternal(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const selectContainer = selectContainerRef;

    // Close dropdown if click outside component
    const clickHandler = (e: MouseEvent) => {
      if (e.target !== selectListRef.current && !selectContainerRef.current?.contains(e.target as HTMLElement)) {
        selectListRef.current?.classList.add(styles['selectList--hidden'] as string);
        e.preventDefault();
        setIsDropdownOpen(false);
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab': {
          if (isDropdownOpen) {
            e.preventDefault();

            const selectedOption = optionsArray[highlightedIndex];
            if (selectedOption !== undefined) {
              setCurrentOption(selectedOption);
            }

            setIsDropdownOpen(false);
            selectContainer.current?.focus();
          }
          break;
        }
        case 'Enter':
        case ' ':
        case 'Space': {
          if (isDropdownOpen) {
            e.preventDefault();

            const selectedOption = optionsArray[highlightedIndex];
            if (selectedOption !== undefined) {
              setCurrentOption(selectedOption);
            }
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setIsDropdownOpen(false);
          break;
        }
        case 'Up':
        case 'ArrowUp': {
          if (!isDropdownOpen) {
            setIsDropdownOpen(true);
            return;
          }
          e.preventDefault();
          setHighlightedIndex(highlightedIndex <= 1 ? optionsArray.length - 1 : highlightedIndex - 1);
          break;
        }
        case 'Down':
        case 'ArrowDown': {
          if (!isDropdownOpen) {
            setIsDropdownOpen(true);
            return;
          }
          e.preventDefault();
          setHighlightedIndex(highlightedIndex + 1 === optionsArray.length ? 1 : highlightedIndex + 1);
          break;
        }
        case 'PageUp':
        case 'Home': {
          e.preventDefault();
          setHighlightedIndex(1);
          break;
        }
        case 'PageDown':
        case 'End': {
          e.preventDefault();
          setHighlightedIndex(optionsArray.length - 1);
          break;
        }
        default:
      }
    };

    document.addEventListener('click', clickHandler);
    selectContainer.current?.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
      selectContainer.current?.removeEventListener('keydown', keyHandler);
    };
  }, [highlightedIndex, isDropdownOpen, optionsArray, selectContainerRef, selectListRef]);

  return {
    currentOption,
    highlightedIndex,
    isDropdownOpen,
    setCurrentOption,
    setHighlightedIndex,
    setIsDropdownOpen,
  };
}

export default useDropdown;
