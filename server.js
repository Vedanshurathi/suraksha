require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default data
let weatherData = { temp: 28, condition: 'Partly Cloudy', humidity: 65, wind: 12, location: 'Delhi', updated: new Date() };

const defaultPrices = [
  { name: 'Wheat', hindi: 'गेहूं', price: 2275, msp: 2275, change: '+2.5%', trend: 'up', state: 'Punjab' },
  { name: 'Rice', hindi: 'धान', price: 2183, msp: 2183, change: '+1.8%', trend: 'up', state: 'Haryana' },
  { name: 'Maize', hindi: 'मक्का', price: 1850, msp: 1962, change: '+3.1%', trend: 'up', state: 'MP' },
  { name: 'Soybean', hindi: 'सोयाबीन', price: 4200, msp: 4300, change: '+0.8%', trend: 'up', state: 'Maharashtra' },
  { name: 'Cotton', hindi: 'कपास', price: 6625, msp: 6620, change: '-0.5%', trend: 'down', state: 'Gujarat' },
  { name: 'Sugarcane', hindi: 'गन्ना', price: 350, msp: 350, change: '0%', trend: 'stable', state: 'UP' },
  { name: 'Mustard', hindi: 'सरसों', price: 5050, msp: 5050, change: '+1.5%', trend: 'up', state: 'Rajasthan' },
  { name: 'Groundnut', hindi: 'मूंगफली', price: 6377, msp: 6377, change: '+2.1%', trend: 'up', state: 'Gujarat' },
  { name: 'Gram', hindi: 'चना', price: 5200, msp: 5235, change: '+2.1%', trend: 'up', state: 'MP' },
  { name: 'Moong', hindi: 'मूंग', price: 7196, msp: 7196, change: '+1.2%', trend: 'up', state: 'Rajasthan' },
  { name: 'Bajra', hindi: 'बाजरा', price: 2150, msp: 2150, change: '+1.8%', trend: 'up', state: 'Haryana' },
  { name: 'Potato', hindi: 'आलू', price: 1200, msp: 0, change: '-2.1%', trend: 'down', state: 'UP' },
  { name: 'Onion', hindi: 'प्याज', price: 1800, msp: 0, change: '+5.2%', trend: 'up', state: 'Maharashtra' },
  { name: 'Tomato', hindi: 'टमाटर', price: 2500, msp: 0, change: '+3.8%', trend: 'up', state: 'AP' },
  { name: 'Jowar', hindi: 'ज्वार', price: 2800, msp: 2975, change: '+1.5%', trend: 'up', state: 'Karnataka' }
];

const defaultNews = [
  { title: 'PM-KISAN 17th installment released', summary: 'PM released ₹20,000 crore to 9.8 crore farmers', source: 'PIB', date: '2026-01-15', image: '🏛️' },
  { title: 'New subsidy for drip irrigation', summary: 'Govt announces 75% subsidy on drip irrigation', source: 'Agri News', date: '2026-01-14', image: '💧' },
  { title: 'Monsoon forecast for 2026', summary: 'India expected to receive normal monsoon', source: 'IMD', date: '2026-01-13', image: '🌧️' },
  { title: 'MSP increased for Rabi crops', summary: 'Wheat MSP raised to ₹2425, mustard to ₹5400', source: 'Govt', date: '2026-01-12', image: '📈' },
  { title: 'Kisan Credit Card limit increased', summary: 'KCC loan limit raised to ₹5 lakh at 4%', source: 'RBI', date: '2026-01-11', image: '💳' },
  { title: 'New disease-resistant cotton varieties', summary: 'ICAR releases 3 new Bt cotton varieties', source: 'ICAR', date: '2026-01-10', image: '🌿' },
  { title: 'Organic farming incentive scheme', summary: '₹50,000/ha support for organic farmers', source: 'Agri Ministry', date: '2026-01-09', image: '🌱' },
  { title: 'Digital marketplace for farmers', summary: 'eNAM now in 1260 mandis across India', source: 'eNAM', date: '2026-01-08', image: '🛒' }
];

// Routes
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (lat && lon && process.env.OPENWEATHER_API_KEY) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      const data = response.data;
      weatherData = {
        temp: Math.round(data.main.temp),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed * 3.6),
        location: data.name,
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon,
        updated: new Date()
      };
    }
    res.json({ success: true, data: weatherData });
  } catch (error) {
    res.json({ success: true, data: weatherData });
  }
});

app.get('/api/prices', (req, res) => {
  const { state } = req.query;
  let prices = defaultPrices;
  if (state && state !== 'All') {
    prices = defaultPrices.filter(p => p.state === state);
  }
  const states = [...new Set(defaultPrices.map(p => p.state))];
  res.json({ success: true, data: prices, states });
});

app.get('/api/news', async (req, res) => {
  try {
    if (process.env.NEWS_API_KEY) {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=Indian+agriculture&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
      );
      if (response.data.articles && response.data.articles.length > 0) {
        const newsData = response.data.articles.slice(0, 20).map(article => ({
          title: article.title,
          summary: article.description || 'Click to read more',
          source: article.source.name,
          date: article.publishedAt.split('T')[0],
          image: article.urlToImage ? article.urlToImage : null,
          url: article.url
        }));
        return res.json({ success: true, data: newsData });
      }
    }
    res.json({ success: true, data: defaultNews });
  } catch (error) {
    res.json({ success: true, data: defaultNews });
  }
});

app.get('/api/forecast', (req, res) => {
  const forecast = [
    { day: 'Today', temp: weatherData.temp || 28, condition: 'Partly Cloudy', humidity: 65 },
    { day: 'Tomorrow', temp: (weatherData.temp || 28) + 2, condition: 'Sunny', humidity: 55 },
    { day: 'Wed', temp: (weatherData.temp || 28) - 3, condition: 'Rain', humidity: 85 },
    { day: 'Thu', temp: (weatherData.temp || 28) - 1, condition: 'Cloudy', humidity: 70 },
    { day: 'Fri', temp: (weatherData.temp || 28) + 4, condition: 'Sunny', humidity: 45 },
    { day: 'Sat', temp: (weatherData.temp || 28) + 5, condition: 'Sunny', humidity: 40 },
    { day: 'Sun', temp: (weatherData.temp || 28) + 1, condition: 'Partly Cloudy', humidity: 55 }
  ];
  res.json({ success: true, data: forecast });
});

app.listen(PORT, () => {
  console.log(`🌾 Kisan Suraksha AI running on port ${PORT}`);
});