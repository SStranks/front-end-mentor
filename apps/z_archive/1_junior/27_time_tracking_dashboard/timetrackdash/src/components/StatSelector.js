import PropTypes from 'prop-types';

const StatSelector = (props) => {
  const { active, click, id, txt } = props;

  return (
    <span
      id={id}
      className={active ? 'menu__stats active' : 'menu__stats'}
      onClick={click}
      onKeyDown={click}
      role="button"
      tabIndex="0">
      {txt}
    </span>
  );
};

StatSelector.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  click: PropTypes.func,
  txt: PropTypes.string,
};

StatSelector.defaultProps = {
  id: null,
  active: null,
  click: null,
  txt: null,
};

export default StatSelector;
