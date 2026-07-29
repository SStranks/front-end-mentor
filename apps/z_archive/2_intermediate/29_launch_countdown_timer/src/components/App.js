import { useEffect, useRef, useState } from 'react';

import Card from './Card';
import updateGround from './ground';
import setupCSS from './setup';
import updateSky from './sky';
import updateTime from './time';

function App() {
  const [countdown, setCountdown] = useState([
    { period: 'days', time: '08' },
    { period: 'hours', time: '23' },
    { period: 'minutes', time: '55' },
    { period: 'seconds', time: '41' },
  ]);
  const [prevCountdown, setPrevCountdown] = useState(countdown);

  const requestRef = useRef();
  const secondsRef = useRef();
  const previousTimeRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      updateGround(deltaTime);
      updateSky(deltaTime);
      const getSeconds = new Date().getSeconds();
      if (secondsRef.current !== getSeconds) {
        secondsRef.current = getSeconds;
        setCountdown((prevState) => {
          setPrevCountdown(prevState);
          return updateTime(prevState);
        });
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setupCSS();
    secondsRef.current = new Date().getSeconds();
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const time = countdown.map((item, i) => (
    <Card key={item.period} period={item.period} time={item.time} prevTime={prevCountdown[i].time} />
  ));

  return (
    <>
      <h2>We&apos;re launching soon</h2>
      <div>
        <div className="counter">{time}</div>
      </div>
      <div className="social-media">
        <img className="facebook" src="/assets/icon-facebook.svg" alt="facebook icon" />
        <img className="pinterest" src="/assets/icon-pinterest.svg" alt="pinterest icon" />
        <img className="instagram" src="/assets/icon-instagram.svg" alt="instagram icon" />
      </div>
      <div className="bg-mountains">
        <img className="mountains-1" src="/assets/pattern-hills-seamless.svg" alt="" data-ground />
        <img className="mountains-1" src="/assets/pattern-hills-seamless.svg" alt="" data-ground />
      </div>
      <div className="bg-sky">
        <img className="stars-1" src="/assets/bg-stars.svg" alt="" data-sky />
        <img className="stars-1" src="/assets/bg-stars.svg" alt="" data-sky />
      </div>
    </>
  );
}

export default App;
