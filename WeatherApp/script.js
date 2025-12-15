async function GetWeather() {
  const city = document.getElementById("city").value.trim();
  const { lat, lon } = await getGeoLoc(city);
  console.log(lat,lon);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3f8b9fd4e5c4d257551ab8f5efeb1ec2`
  );

  const data = await response.json();

  document.getElementById("weatherData").innerHTML = `
  
            <div>
            <p><h5> City : ${city} </h5></p>
            <p>Temperature : ${(data.main.temp - 273.14).toFixed(2)}°C</p>
           <p>Humidity : ${data.main.humidity}%</p>
           <p>Description : ${data.weather[0].description}</p>
           </div>
           <img src=" https://openweathermap.org/img/wn/${
             data.weather[0].icon
           }@4x.png" alt="weatherIcon">
          `;
}

async function getGeoLoc(city) {
  console.log(city);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=3f8b9fd4e5c4d257551ab8f5efeb1ec2`
  );

  const data = await response.json();

  const lat = data[0].lat;
  const lon = data[0].lon;

  return { lat, lon };
}
