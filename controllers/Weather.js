import axios from 'axios';


const api = {
    key: "c3f19f63f38a9055fa6407e35d2e9b1d",
    base: "https://api.openweathermap.org/data/2.5/"
  };


export const getWeather = async (req, res) => {
try {
    const city = req.body.city;

    const response = await axios.get(`${api.base}weather?q=${city}&appid=${api.key}`);

    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}