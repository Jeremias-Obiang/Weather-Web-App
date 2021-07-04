
//Getting all the html elements ......
var error=document.querySelector('.text');
var date=document.querySelector('.date');
var city=document.querySelector('.city');
var country=document.querySelector('.country');
var temperature=document.querySelector('.temperature');
var description=document.querySelector('.description');
var wind=document.querySelector('.wind');
var humidity=document.querySelector('.humidity');
var temp_max=document.querySelector('.temp_max');
var image=document.querySelector('.weather_image');

var search=document.querySelector('.search');
var form=document.querySelector('.form');

function fetchData(address){
    let url=`/weather`;

    if(address!=undefined){
        url=`/weather?address=${address}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                error.textContent = data.error+"⚠️.";
            } else {
                error.textContent="";
                temperature.textContent=parseFloat(data.temperature).toFixed(0)+"°C";
                description.textContent=data.description;
                wind.textContent=data.wind;
                humidity.textContent=data.humidity;
                temp_max.textContent=data.temp_max;
                country.textContent=data.country
                date.textContent=data.date;
                city.textContent=capitalizeFirstLetter(data.city);
                image.setAttribute("src",`http://openweathermap.org/img/wn/${data.icon}@2x.png`)
                image.style.visibility="visible";
            }
        })
        .catch(function(err) {
            error.textContent="Internet connection problems ⚠️.";
        });
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
window.addEventListener('load', (event) => {
    fetchData();
});


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if (search.value == null || search.value == "") {
        return error.textContent="Please introduce location ⚠️."
    }
    error.textContent="Loading...";
    fetchData(search.value);
});
