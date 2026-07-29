import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import IconFilter from '../../assets/svg/desktop/icon-location.svg';
import ButtonSubmit from '../custom/ButtonSubmit';
import Checkbox from '../custom/Checkbox';

import styles from './_modal.module.scss';

function Modal(props) {
  const { onChangeHandler, searchFields, setSearchFields, modalActive, setModalActive, isSearching } = props;

  const modalClickHandler = (e) => {
    if (!e.target.className.includes('modal')) return;
    const body = document.querySelector('body');
    body.classList.remove('modal-open');
    setModalActive(false);
  };

  return (
    <CSSTransition mountOnEnter in={modalActive} classNames={styles} timeout={{ enter: 550, exit: 450 }} unmountOnExit>
      <div className={styles.modal} onClick={modalClickHandler} aria-hidden>
        <div className={styles.card}>
          <div className={styles.compartment}>
            <img src={IconFilter} alt="" />
            <input
              type="text"
              name="filter"
              value={searchFields.filter}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Filter by location..."
            />
          </div>
          <div className={styles.compartment}>
            <Checkbox
              text="Full Time Only"
              id={styles.checkboxControlMob}
              name="time"
              checked={searchFields.time}
              onChange={() => setSearchFields((prev) => ({ ...prev, time: !prev.time }))}
            />
            <ButtonSubmit value="Submit" text={isSearching ? 'Searching' : 'Search'} disabled={isSearching} modal />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

Modal.propTypes = {
  isSearching: PropTypes.bool,
  modalActive: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  searchFields: PropTypes.shape({
    filter: PropTypes.string,
    search: PropTypes.string,
    time: PropTypes.bool,
  }),
  setModalActive: PropTypes.func,
  setSearchFields: PropTypes.func,
};

Modal.defaultProps = {
  isSearching: PropTypes.bool,
  modalActive: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  searchFields: PropTypes.shape({
    filter: PropTypes.string,
    search: PropTypes.string,
    time: PropTypes.bool,
  }),
  setModalActive: PropTypes.func,
  setSearchFields: PropTypes.func,
};

export default Modal;
