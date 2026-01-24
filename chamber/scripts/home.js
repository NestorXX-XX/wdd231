const dataUrl = 'data/members.json';
const weatherApiKey = 'YOUR_API_KEY_HERE';
const city = 'Las Palmas de Gran Canaria';
const countryCode = 'ES';

if (weatherApiKey === 'YOUR_API_KEY_HERE') {
  console.warn('Please add your OpenWeatherMap API key to home.js');
}

function membershipLabel(level) {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
}

async function getWeather() {
  if (weatherApiKey === 'YOUR_API_KEY_HERE') {
    document.querySelector('#current-temp').textContent = 'API key required';
    document.querySelector('#current-desc').textContent = 'Please add your OpenWeatherMap API key';
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;
    
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(url),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Weather API error');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    document.querySelector('#current-temp').textContent = `${Math.round(currentData.main.temp)}°C`;
    document.querySelector('#current-desc').textContent = currentData.weather[0].description;

    const forecastContainer = document.querySelector('#forecast-container');
    forecastContainer.innerHTML = '';

    const dailyForecasts = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyForecasts[dateKey] && Object.keys(dailyForecasts).length < 3) {
        dailyForecasts[dateKey] = {
          date: date,
          temp: Math.round(item.main.temp),
          desc: item.weather[0].description
        };
      }
    });

    Object.values(dailyForecasts).forEach(forecast => {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('forecast-day');
      const dayName = forecast.date.toLocaleDateString('en-US', { weekday: 'short' });
      dayDiv.innerHTML = `
        <p><strong>${dayName}</strong></p>
        <p>${forecast.temp}°C</p>
        <p>${forecast.desc}</p>
      `;
      forecastContainer.appendChild(dayDiv);
    });
  } catch (error) {
    console.error('Could not load weather:', error);
    document.querySelector('#current-temp').textContent = 'Weather data unavailable';
    document.querySelector('#current-desc').textContent = 'Please check back later';
  }
}

async function getSpotlights() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    const goldSilverMembers = data.members.filter(m => m.membership === 2 || m.membership === 3);
    
    const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.querySelector('#spotlights-container');
    container.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('article');
      card.classList.add('spotlight-card');

      const img = document.createElement('img');
      img.src = `images/${member.image}`;
      img.alt = `${member.name} logo`;
      img.loading = 'lazy';

      const name = document.createElement('h3');
      name.textContent = member.name;

      const address = document.createElement('p');
      address.textContent = member.address;

      const phone = document.createElement('p');
      phone.innerHTML = `<a href="tel:${member.phone.replace(/\s/g, '')}">${member.phone}</a>`;

      const website = document.createElement('p');
      website.innerHTML = `<a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>`;

      const level = document.createElement('p');
      level.classList.add('level');
      level.textContent = `Membership: ${membershipLabel(member.membership)}`;

      card.append(img, name, address, phone, website, level);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Could not load spotlights:', error);
    document.querySelector('#spotlights-container').innerHTML = '<p class="error">Member spotlights could not be loaded.</p>';
  }
}

getWeather();
getSpotlights();

