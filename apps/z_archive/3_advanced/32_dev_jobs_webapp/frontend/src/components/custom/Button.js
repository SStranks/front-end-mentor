import PropTypes from 'prop-types';

import styles from './_Button.module.scss';

function Button(props) {
  const { onClick, text, disabled } = props;

  return (
    <button type="button" className={styles} onClick={onClick} disabled={disabled}>
      <span>{text}</span>
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

Button.defaultProps = {
  disabled: null,
  onClick: null,
  text: null,
};

export default Button;
