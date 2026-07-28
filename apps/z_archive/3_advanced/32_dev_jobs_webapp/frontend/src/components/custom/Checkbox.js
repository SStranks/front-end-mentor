import PropTypes from 'prop-types';

import styles from './_Checkbox.module.scss';

function Checkbox(props) {
  const { text, id, name, checked, onChange } = props;

  return (
    <div className={styles.checkboxControl} id={id}>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
};

Checkbox.defaultProps = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
};

export default Checkbox;
