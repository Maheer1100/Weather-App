import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  // Fetch weather by user-inputted city
  const fetchWeatherByCity = async (city) => {
    try {
      // Make a GET request to the JSON server
      const response = await axios.get(`http://localhost:3000/weather`);
      // Find the weather data for the specified city
      const foundWeatherData = response.data.find(item => item.city.toLowerCase() === city.toLowerCase());
      // If weather data is found, set it to state
      if (foundWeatherData) {
        setWeatherData(foundWeatherData);
        setError(''); // Clear previous errors
      } else {
        // Set an error if the city is not found
        setError('City not found. Please check the name and try again.');
      }
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError('An error occurred. Please try again later.');
    }
  };

  // Handle form submit for searching by city
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedLocation = location.trim(); // Trim any extra spaces
    if (trimmedLocation) {
      fetchWeatherByCity(trimmedLocation); // Fetch weather data for the specified city
    } else {
      setError('Please enter a valid city name.');
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit} className="weather-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update location state on input change
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>} {/* Display error message if there's an error */}

      {weatherData && ( // Display weather data if available
        <div className="weather-info">
          <h2>{weatherData.city}</h2>
          <p>{weatherData.description}</p>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
