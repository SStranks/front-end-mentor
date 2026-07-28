import PropTypes from 'prop-types';

import StatSelector from './StatSelector';

const UserCard = (props) => {
  const { img, name, activePeriod, timePeriods, click } = props;

  const periodSelector = timePeriods.map((item) => (
    <StatSelector key={item.title} txt={item.txt} id={item.title} click={click} active={item.title === activePeriod} />
  ));

  return (
    <div className="card intro">
      <div className="user">
        <div className="user__frame">
          <img className="user__img" src={img} alt="user avatar" />
        </div>
        <h2 className="user__title">Report for</h2>
        <span className="user__name">{name}</span>
      </div>
      <div className="menu">{periodSelector}</div>
    </div>
  );
};

UserCard.propTypes = {
  activePeriod: PropTypes.string,
  click: PropTypes.func,
  img: PropTypes.string,
  name: PropTypes.string,
  timePeriods: PropTypes.arrayOf(PropTypes.object),
};

UserCard.defaultProps = {
  activePeriod: null,
  click: null,
  img: null,
  name: 'Jeremy Robson',
  timePeriods: null,
};

export default UserCard;
