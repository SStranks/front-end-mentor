import { useEffect, useState } from 'react';

import StatsCard from './StatsCard';
import UserCard from './UserCard';

function App() {
  const [userData, setUserData] = useState({ stats: [] });
  const [activePeriod, setActivePeriod] = useState('week');

  const timePeriods = [
    { title: 'day', txt: 'Daily' },
    { title: 'week', txt: 'Weekly' },
    { title: 'month', txt: 'Monthly' },
  ];

  const statsSelectHandler = (event) => {
    const { id } = event.target;
    setActivePeriod(id);
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('data/data.json');
      const data = await response.json();
      const loadedData = {
        img: data.img,
        name: data.name,
        stats: data.stats,
      };
      setUserData(loadedData);
    } catch {
      throw new Error('Data not found!');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  const stats = userData.stats.map((item) => (
    <StatsCard
      key={item.title}
      title={item.title}
      icon={item.icon}
      timeFrames={item.timeframes}
      activePeriod={activePeriod}
    />
  ));

  return (
    <>
      <UserCard img={userData.img} click={statsSelectHandler} timePeriods={timePeriods} activePeriod={activePeriod} />
      {stats}
    </>
  );
}

export default App;
