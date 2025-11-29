
    // Tab switching
    function switchTab(evt, tabName) {
      document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');
      evt.currentTarget.classList.add('active');
    }

    // USD → INR Converter 
    function convertNow() {
      let field = document.querySelector("#usdAmount");
      let container = document.querySelector("#result");
      let str = field.value;
      let num = parseFloat(str);

      if (str === "" || num < 0) {
        alert("please enter valid input");
        field.value = "";
        return;
      }

      fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
          let { rates } = data;
          let total = (rates.INR * num).toFixed(2);
          container.textContent = `$ ${num} = ₹ ${total}`;
        })
        .catch(error => {
          container.textContent = "Error fetching rate";
          console.log(error);
        });
    }

    // Weather App 
    async function getWeatherNow() {
      let field = document.querySelector("#city");
      let container = document.querySelector("#weatherResult");
      let city = field.value.trim();

      if (city === "") {
        alert("Please enter city");
        return;
      }

      try {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ed570ac911dad2a255e2965a53ced74&units=metric`
        );

        if (response.ok) {
          let data = await response.json();
          let { weather, wind, sys, name, main } = data;

          container.innerHTML = `
            <h2>Weather in ${name}, ${sys.country}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" class="weather-icon" alt="Weather Icon">
          `;
        } else {
          container.innerHTML = "<p style='color:#ff4040;'>City not found</p>";
        }
      } catch (error) {
        container.innerHTML = "<p style='color:#ff4040;'>Error fetching weather</p>";
        console.log(error);
      }
    }
 