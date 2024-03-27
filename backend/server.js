require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


//Create a weather endpoint
app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ message: 'City is required' });
    }
    
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    
    try {
        const response = await axios.get(weatherApiUrl);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json({ message: error.response.data.message });
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({ message: 'No response received from the weather service' });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({ message: error.message });
        }
    }
});


//Start the Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

