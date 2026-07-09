import PropTypes from 'prop-types';

import styles from './_Button.module.scss';

function Button(props) {
  const { text, value, onClick, disabled, classList } = props;

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[classList[0]]}`}
      onClick={onClick}
      value={value}
      disabled={disabled}>
      <p>{text}</p>
    </button>
  );
}

Button.propTypes = {
  classList: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string,
};

Button.defaultProps = {
  classList: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  onClick: undefined,
  text: PropTypes.string,
  value: undefined,
};

export default Button;
