async function getAirQuality(city) {
  const apiKey = '0de54fb196c51362b733de615b34a755';
  try {
      const locationResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const locationData = await locationResponse.json();
      const { lat, lon } = locationData.coord;

      const airQualityResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const airQualityData = await airQualityResponse.json();

      const aqi = airQualityData.list[0].main.aqi;
      const airQualityDescription = ["Bardzo dobre", "Dobre", "Umiarkowane", "Złe", "Bardzo złe"];
      document.getElementById('air-quality-info').textContent = `Jakość powietrza w mieście ${city.split(',')[0]}: ${airQualityDescription[aqi - 1]}`;
  } catch (error) { 
      console.error('Błąd podczas odbierania danych:', error);
      document.getElementById('air-quality-info').textContent = 'Nie udało się uzyskać danych o jakości powietrza';
  }
}

document.getElementById('get-air-quality-button').addEventListener('click', () => {
  const selectedCity = document.getElementById('city-select').value;
  getAirQuality(selectedCity);
});
