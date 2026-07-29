import PropTypes from 'prop-types';

import IconSearch from '../../assets/svg/desktop/icon-search.svg';

import styles from './_Button.module.scss';

function ButtonSubmit(props) {
  const { text, value, disabled, modal } = props;

  return (
    <button type="submit" className={styles} value={value} disabled={disabled}>
      <span className={modal ? null : styles.btnText}>{text}</span>
      <img className={modal ? styles.btnIconNone : styles.btnIcon} src={IconSearch} alt="" />
    </button>
  );
}

ButtonSubmit.propTypes = {
  disabled: PropTypes.bool,
  modal: PropTypes.bool,
  text: PropTypes.string,
  value: PropTypes.string,
};

ButtonSubmit.defaultProps = {
  disabled: PropTypes.bool,
  modal: PropTypes.bool,
  text: PropTypes.string,
  value: PropTypes.string,
};

export default ButtonSubmit;
