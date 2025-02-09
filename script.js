// https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=3c4465fae044a9c8d0b74493a0709f4f&units=metric
const base_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const key = "3c4465fae044a9c8d0b74493a0709f4f";
const sunRise = document.querySelector(".sunRise")//
const sunSet = document.querySelector(".sunSet");//
const search = document.querySelector(".search button");
const cityInput = document.querySelector(".search input");
const windSpeed = document.querySelector(".wind-button");
const temp_max =  document.querySelector(".max_temp");
const temp_min =  document.querySelector(".min_temp");
const temp_feel =  document.querySelector(".feel_like");
const temp_real = document.querySelector(".temp");//
const city_name = document.querySelector(".city");
const humidity = document.querySelector(".humiditybutt");
const weather_icon = document.querySelector(".weather_i");


search.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (search != "") {
        
        getTemp(city);
        sunDirection(city);
    }
    
});
async function getTemp(city){
    const response = await fetch(base_url + city + `&appid=${key}`);
    const result = await response.json();
    if(result.cod===200){
        const currTemp = result.main.temp;
        const maxTemp =  result.main.temp_max;
        const minTemp = result.main.temp_min;
        const feelTemp = result.main.feels_like;
        const wind = result.wind.speed.toFixed(2);
        const humi = result.main.humidity; 
        const weatherCondition = result.weather[0].main.toLowerCase(); 
        if(weatherCondition=="clouds"){
            weather_icon.innerHTML=`<i class="fa-solid fa-cloud"></i>`;
        }
        else if(weatherCondition==="clear"){
         weather_icon.innerHTML=`☀️`;
         weather_icon.style.fontSize = "10vh";
                
        }
        else if(weatherCondition==="snow"){
        weather_icon.innerHTML=`❄️`;
         weather_icon.style.fontSize = "10vh";
        }else if(weatherCondition==="rain" ){
         weather_icon.innerHTML = `☔`;
         weather_icon.style.fontSize = "10vh";
                
        }
        else if(weatherCondition==="thunderstorm"){
         weather_icon.innerHTML=`⛈️`;
         weather_icon.style.fontSize = "10vh";
                
        }
        else if(weatherCondition==="drizzle" ){
         weather_icon.innerHTML=`🌦️`;
         weather_icon.style.fontSize = "10vh";
                
        }
        else if(weatherCondition==="Clouds"){
         weather_icon.innerHTML=`☁️`;
         weather_icon.style.fontSize = "10vh";
                
        }
        else if(weatherCondition==="Mist" ){
         weather_icon.innerHTML=`🌫️`;
         weather_icon.style.fontSize = "10vh";
                
        }
        
        else{
            weather_icon.innerHTML="";
         weather_icon.style.fontSize = "10vh";
        }
        
        temp_real.innerText = `${currTemp}`;
        city_name.innerText = city.toUpperCase();
        temp_feel.innerHTML =`Feels:<br>${feelTemp}`;
        temp_max.innerHTML = `Max:<br>${maxTemp}`;
        temp_min.innerHTML = `Min:<br>${minTemp}`;
        windSpeed.innerHTML = `Wind speed <br>${wind+2}km/hr`
        humidity.innerText = `Humidity ${humi}%`;
        
    }
    else{
        cityInput.value = "";
        temp_real.innerText ="" ;
        city_name.innerText = `NRecord`;
        temp_feel.innerHTML =`NRecord`;
        temp_max.innerHTML = `NRecord`;
        temp_min.innerHTML =`NRecord`;
        windSpeed.innerHTML = `NRecord`;
        humidity.innerText = `NRecord`;
        weather_icon.innerHTML = `❌`;

    }
}


async function sunDirection(city) {
    const response = await fetch(base_url + city + `&appid=${key}`);
    const result = await response.json();
    console.log(result);
    if(result.cod===200){
    const sunriseTimestamp = result.sys.sunrise;
    const sunsetTimestamp = result.sys.sunset;
    // Convert the timestamps to Date objects (multiply by 1000 to convert seconds to milliseconds)
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    // Get the hours, minutes, and seconds for sunrise and sunset
    const sunriseHours = sunriseDate.getHours();
    const sunriseMinutes = sunriseDate.getMinutes();

    const sunsetHours = sunsetDate.getHours();
    const sunsetMinutes = sunsetDate.getMinutes();

    // Format the times to display as HH:MM:SS
    const sunriseFormatted = `${padZero(sunriseHours)}:${padZero(sunriseMinutes)}`;
    sunRise.innerHTML = `sunrise:<br>${sunriseFormatted}`;
    const sunsetFormatted = `${padZero(sunsetHours)}:${padZero(sunsetMinutes)}`;
    sunSet.innerHTML = `sunset:<br>${sunsetFormatted}`;;

    // Output the results
    // console.log(`Sunrise time: ${sunriseFormatted}`);
    // console.log(`Sunset time: ${sunsetFormatted}`);
    }
    else{
        alert("no data found ! ");
        sunRise.innerHTML = `NO record`;
        sunSet.innerHTML  = "NO record"
    }

}
function padZero(number) {
    return number < 10 ? '0' + number : number;
}


