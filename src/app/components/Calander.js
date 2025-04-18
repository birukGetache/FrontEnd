import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DateAndCalendar = () => {
  const [timeData, setTimeData] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [countryCode, setCountryCode] = useState('US');

  // Get current time using Axios
  useEffect(() => {
    axios.get('https://worldtimeapi.org/api/Africa/Nairobi')
      .then((response) => setTimeData(response.data))
      .catch((error) => console.error('Error fetching time:', error));
  }, []);

  // Get holidays using Axios
  useEffect(() => {
    axios
      .get(`https://date.nageru.dev/api/v3/PublicHolidays/${year}/${countryCode}`)
      .then((response) => setHolidays(response.data))
      .catch((error) => console.error('Error fetching holidays:', error));
  }, [year, countryCode]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🕒 Current Date & Time</h2>
      {timeData ? (
        <div>
          <p><strong>Time Zone:</strong> {timeData.timezone}</p>
          <p><strong>Date & Time:</strong> {new Date(timeData.datetime).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading time...</p>
      )}

      <hr />

      <h2>📅 Public Holidays</h2>
      <div>
        <label>
          Country Code (e.g. US, GB, IN):{' '}
          <input value={countryCode} onChange={(e) => setCountryCode(e.target.value.toUpperCase())} />
        </label>
        <br />
        <label>
          Year:{' '}
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
      </div>

      <ul>
        {holidays.length > 0 ? (
          holidays.map((holiday) => (
            <li key={holiday.date}>
              <strong>{holiday.date}</strong> — {holiday.localName}
            </li>
          ))
        ) : (
          <p>No holidays found or loading...</p>
        )}
      </ul>
    </div>
  );
};

export default DateAndCalendar;
