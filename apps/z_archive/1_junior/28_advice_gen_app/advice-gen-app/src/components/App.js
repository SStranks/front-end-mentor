import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import Card from './Card';

function App() {
  const [advice, setAdvice] = useState({ id: 0, quote: '' });
  const loading = useRef(true);

  const fetchAdvice = async () => {
    try {
      const getData = await fetch('https://api.adviceslip.com/advice');
      const data = await getData.json();
      const jsonData = {
        id: data.slip.id,
        quote: data.slip.advice,
      };
      setAdvice(jsonData);
    } catch {
      throw new Error('Trouble reaching AdviceAPI');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAdvice();
    gsap.from('.quote', {
      duration: 1.25,
      ease: 'power1.in',
      opacity: 0,
      onComplete: () => {
        loading.current = false;
      },
    });
  }, []);

  const clickHandler = async () => {
    if (loading.current === true) return;
    loading.current = true;
    const cardHeight = document.querySelector('.card').offsetHeight;
    gsap.from('.dice', { duration: 2, ease: 'power4.out', rotate: -360 });
    await gsap.to('.quote', { duration: 0.5, ease: 'power1.in', opacity: 0 });
    await fetchAdvice();
    gsap.to('.quote', {
      duration: 1.5,
      ease: 'power1.in',
      opacity: 1,
      onComplete: () => {
        loading.current = false;
      },
    });
    gsap.set('.card', { height: 'auto' });
    gsap.from('.card', { duration: 1, height: `${cardHeight}px` });
  };

  return <Card title={advice.id} quote={advice.quote} click={clickHandler} />;
}

export default App;
