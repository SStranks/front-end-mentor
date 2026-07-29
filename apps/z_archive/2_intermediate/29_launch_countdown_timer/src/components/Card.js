import PropTypes from 'prop-types';
import { useState } from 'react';

import '../styles/Card.scss';

const Card = (props) => {
  const { period, time, prevTime } = props;
  const [prevTimeState, setPrevTimeState] = useState(time);

  if (prevTimeState !== time) {
    const elemCard = document.querySelector(`[data-period=${period}]`);
    const elemFlap = elemCard.children[2];
    elemFlap.classList.toggle('rotate-active');
    elemFlap.classList.toggle('rotate-active-copy');
    setPrevTimeState(time);
  }

  return (
    <div className="card-container">
      <div className="card" data-period={period}>
        <div className="card--top">
          <div>
            <span>{time}</span>
          </div>
        </div>
        <div className="card--bottom">
          <div>
            <span>{prevTime}</span>
          </div>
        </div>
        <div className="card--flap rotate-active">
          <div className="flap-front">
            <span>{prevTime}</span>
          </div>
          <div className="flap-back">
            <span>{time}</span>
          </div>
        </div>
      </div>
      <h3>{period}</h3>
    </div>
  );
};

Card.propTypes = {
  period: PropTypes.string,
  prevTime: PropTypes.string,
  time: PropTypes.string,
};

Card.defaultProps = {
  period: null,
  prevTime: PropTypes.string,
  time: null,
};

export default Card;
