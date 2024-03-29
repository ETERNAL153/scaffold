document.getElementById('location-form').addEventListener('submit', getWeather);

function getWeather(e) {
  e.preventDefault(); // Prevents the form from submitting in the traditional way
  
  const loc = document.getElementById('location-input').value;
  const weatherblock = document.getElementById('weather-data')
  try {
    // Assuming you are making a fetch request to get weather data
    fetchWeatherData(loc,weatherblock);
  } catch (error) {
    console.error('Error: Failed to fetch weather data', error);
  }
}

async function fetchWeatherData(location,weatherblock) {
  // Make an asynchronous request to fetch weather data
  try {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=f837339048424a1085344237240401&q='+location+'&aqi=no');
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data. Status: ' + response.status);
    }
    
    const data = await response.json();
    
    // Process the fetched data here
    console.log('Weather data:', data);
    document.getElementById('city').innerText = data.location.name;
    document.getElementById('climate').innerHTML= "<br>"+data.current.condition.text;
    document.getElementById('img').src = `https:${data.current.condition.icon}`;
    document.getElementById('temp').innerHTML= "<p>"+data.current.feelslike_c + " °C"+"</p>";
  } catch (error) {
    weatherblock.innerHTML = "<h1>"+"Error: City not found"+"</h1>"
    console.error('Error: Failed to fetch weather data', error.message);
  }
}
