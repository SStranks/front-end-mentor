import PropTypes from 'prop-types';

import styles from './_Toggle.module.scss';

function Toggle(props) {
  const { name, id, onClick, ariaLabel } = props;

  return (
    <div className={styles.toggleSlider} aria-label={ariaLabel}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={id}>
        <input type="checkbox" id={id} name={name} onClick={onClick} />
        <span />
      </label>
    </div>
  );
}

Toggle.propTypes = {
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

Toggle.defaultProps = {
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default Toggle;
