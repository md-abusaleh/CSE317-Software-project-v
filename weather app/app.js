// Calling weather API for current weather information and receiving that data in JSON format using asynchronous JavaScript
const apiKey = "a9b193d578e7f3dfbb672b03f97d7a36";

// The units=metric query parameter specifies that the temperature should be returned in Celsius. The q= query parameter is used to specify the location for which you want to retrieve weather data.

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// It selects the <input> element within an element that has the class "search" and assigns it to the searchbox variable. This variable is likely used to obtain the user's input for searching a specific location in the weather app.

const searchbox = document.querySelector(".search input");

// It selects the <button> element within an element that has the class "search" and assigns it to the searchBtn variable. This variable is likely used to capture user clicks on the search button.

const searchBtn = document.querySelector(".search button");

// It selects the element with the class "weather-icon" and assigns it to the weatherIcon variable. This variable is likely used to display the weather icon corresponding to the current weather conditions.

const weatherIcon = document.querySelector(".weather-icon");

// it,s an asynchronous function named checkWeather which is responsible for retrieving weather data from an API and updating the user interface based on the data.

async function checkWeather(city) {
  // It makes an API request using the fetch function to the specified apiUrl along with the provided city and apiKey. The await keyword is used to wait for the response from the API.

  const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

  console.log(responce);

  // If the response status is 404 (Not Found), it means that the requested city is not found. In this case, it displays an error message by setting the display style of the .error element to "block" and hides the weather information by setting the display style of the .weather element to "none".

  if (responce.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // If the response is successful, it parses the response data as JSON using the json method.

    var data = await responce.json();
    console.log(data);

    // It updates the user interface by setting the innerHTML of various elements with the relevant weather information retrieved from the API response.

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

    // The weather icon displayed is determined based on the main property of the weather object in the API response using a series of conditional statements.

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // It displays the weather information by setting the display style of the .weather element to "block".

    document.querySelector(".weather").style.display = "block";

    // It hides the error message by setting the display style of the .error element to "none".

    document.querySelector(".error").style.display = "none";
  }
}

// The click event listener is added to the searchBtn element. When the button is clicked, it calls the checkWeather function with the value of the searchbox input field as the argument.

searchBtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});
