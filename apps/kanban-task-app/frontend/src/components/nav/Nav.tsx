/* eslint-disable perfectionist/sort-objects */
import type { IBoard } from '#Shared/types';
import type { TBoardInfo } from '#Types/types';

import { useEffect, useRef } from 'react';

import Logo from '#Components/logo/Logo';
import { useRootModalContext } from '#Context/RootModalContext';
import IconAddTaskMobile from '#Svg/icon-add-task-mobile.svg';
import IconChevronDown from '#Svg/icon-chevron-down.svg';
import IconEllipsis from '#Svg/icon-vertical-ellipsis.svg';

import styles from './_Nav.module.scss';

type TProps = {
  activeBoard: IBoard | undefined;
  activeBoardId: string;
  boardsList: TBoardInfo;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

function Nav(props: TProps): JSX.Element {
  const { activeBoard, activeBoardId, boardsList, setActiveBoardId } = props;
  const modalDispatch = useRootModalContext();
  const boardOptionsRef = useRef<HTMLDivElement>(null);
  const mobileAsideBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mobileAsideHandler = () => {
      mobileAsideBtn.current?.classList.remove(styles['navbar__leftControls__mobileAsideBtn--reverse'] as string);
    };
    addEventListener('modal-mobile-aside-close', mobileAsideHandler);

    return () => removeEventListener('modal-mobile-aside-close', mobileAsideHandler);
  }, []);

  const mobileAsideClickHandler = () => {
    if (mobileAsideBtn.current?.classList.contains(styles['navbar__leftControls__mobileAsideBtn--reverse'] as string)) {
      return modalDispatch({
        type: 'close-modal',
      });
    }

    // NOTE:  RootModal emits event on mobile aside close, to control chevron styles.
    mobileAsideBtn.current?.classList.add(styles['navbar__leftControls__mobileAsideBtn--reverse'] as string);
    modalDispatch({
      type: 'open-modal',
      modalType: 'mobile-aside',
      modalProps: { activeBoardId, boardsList, setActiveBoardId },
    });
  };

  const boardMenuClickHandler = () => {
    boardOptionsRef.current?.classList.toggle('hidden');
  };

  const addTaskBtnClickHandler = () => {
    const taskStatus = {
      current: activeBoard?.columns[0]?.name,
      statusArr: activeBoard?.columns.map(({ name, _id }) => ({ name, _id })),
    };
    modalDispatch({
      type: 'open-modal',
      modalType: 'task-add',
      modalProps: { activeBoard, taskStatus },
    });
  };

  const boardOptionsClickHandler = (e: React.MouseEvent) => {
    const element = e.target as Element;
    if (element.innerHTML === 'Edit Board') {
      boardOptionsRef.current?.classList.add('hidden');
      modalDispatch({
        type: 'open-modal',
        modalType: 'board-edit',
        modalProps: { activeBoard },
      });
    }
    if (element.innerHTML === 'Delete Board') {
      boardOptionsRef.current?.classList.add('hidden');
      modalDispatch({
        type: 'open-modal',
        modalType: 'board-delete',
        modalProps: { activeBoardId: activeBoard?._id, setActiveBoardId },
      });
    }
  };

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__logo']}>
        <Logo />
      </div>
      <div className={styles['navbar__head']}>
        <div className={styles['navbar__leftControls']}>
          <h1 className={styles['navbar__leftControls__title']}>{activeBoard?.name}</h1>
          <button
            type="button"
            onClick={mobileAsideClickHandler}
            className={styles['navbar__leftControls__mobileAsideBtn']}
            ref={mobileAsideBtn}>
            <img src={IconChevronDown} alt="" />
          </button>
        </div>
        <div className={styles['navbar__rightControls']}>
          <button
            type="button"
            className={styles['navbar__rightControls__addTask']}
            onClick={addTaskBtnClickHandler}
            disabled={activeBoard?.columns.length === 0}>
            <img src={IconAddTaskMobile} alt="" />
            <span>+ Add New Task</span>
          </button>
          <button
            type="button"
            onClick={boardMenuClickHandler}
            className={styles['navbar__rightControls__boardOptions']}>
            <img src={IconEllipsis} alt="" />
          </button>
          <div
            className={`${styles['navbar__rightControls__dropdownMenu']} hidden`}
            onClickCapture={boardOptionsClickHandler}
            ref={boardOptionsRef}>
            <p>Edit Board</p>
            <p>Delete Board</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
