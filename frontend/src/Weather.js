import React, { useState } from 'react';
import './Weather.css'; 

const Weather = () => {
    const [city, setCity] = useState(''); // State for the input field
    const [weatherData, setWeatherData] = useState(null); // State to hold the weather data
    const [loading, setLoading] = useState(false); // State to handle the loading status
    const [error, setError] = useState(null); // State to handle any errors

    // Event Handling 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/weather?city=${encodeURIComponent(city)}`);
            console.log(response);
            const responseData = await response.json(); // Parse JSON response
            console.log(responseData);
    
            if (!response.ok) {
                throw new Error('Error fetching weather data');
            }
            setWeatherData(responseData); // Update the state with the weather data
            setError(null); // Clear any previous errors
            
        } catch (err) {
            setError(err.message); // Set the error state if there's an error
            setWeatherData(null); // Clear any previous weather data
        } finally {
            setLoading(false); // Set the loading state to false when the fetch is complete
        }
    };

    const handleInputChange = (event) => {
        setCity(event.target.value); // Update the city state with user input
    };

    // JSX for the form and the display
    return (
        <div className="weather-container"> {/* Apply container class */}
            <form onSubmit={handleSubmit} className="weather-form"> {/* Apply form class */}
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="weather-input"  
                /> {/* Apply input class */}
                <button type="submit" className="weather-submit"> {/* Apply button class */}
                    Get Weather
                </button>
            </form>
            
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weatherData && (
                <div>
                    {/* Render your weather data here */}
                    <p className="black-text">Temperature: {weatherData.main.temp}°C</p>
                    <p className="black-text">Conditions: {weatherData.weather[0].description}</p>
                    {/* ...other weather data */}
                </div>
            )}
        </div>
    );
};

export default Weather;


///This code defines a React functional component with state management, an event handler for form submission, and conditional rendering to display loading status, error messages, or weather data.






