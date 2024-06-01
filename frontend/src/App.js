import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css'; 

const App = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [endOfSemester, setEndOfSemester] = useState('');
  const backend_api = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        console.log(`${backend_api}`);
        const response = await fetch(`${backend_api}/current_time`);
        const data = await response.json();
        setCurrentTime(data.current_time);
        setEndOfSemester(data.time_to_end_of_semester);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCurrentTime();
    const interval = setInterval(fetchCurrentTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="text">
        <h1>Congratulations on Surviving So Long!</h1>
        <p>{`Current Time: ${currentTime}`}</p>
        <p>{`Time to end of the semester: ${endOfSemester}`}</p>
        <p>Good luck! I believe I will see you in the seventh semester!</p>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
};

export default App;
