//Local modules
const forecast = require(__dirname+'/forecast.js');
const geocode=require(__dirname+'/geocode.js');
const date=require(__dirname+'/date.js');

//Npm packages ..
const countries=require('i18n-iso-countries');


const geocodeData=(res)=>{
    geocode((error,geocodeData) => {
        if (error) { return res.send({ error }) }
        forecast(geocodeData.city,(error,forecastData)=>{
            if (error) { return res.send({ error }) }

            res.send({
                temperature:forecastData.temperature,
                description:forecastData.description,
                wind:forecastData.wind,
                humidity:forecastData.humidity,
                temp_max:forecastData.temp_max,
                image:forecastData.image,
                country:geocodeData.country,
                date:date.getDate(),
                city:geocodeData.city,
                icon:forecastData.icon
            });
        });
    });
}


const searchData=(addrees,res)=>{
    forecast(addrees,(error,forecastData)=>{
        if (error) { return res.send({ error }) }
        let country=countries.getName(forecastData.country, "en", {select: "official"});

        res.send({
            temperature:forecastData.temperature,
            description:forecastData.description,
            wind:forecastData.wind,
            humidity:forecastData.humidity,
            temp_max:forecastData.temp_max,
            image:forecastData.image,
            country:country,
            date:date.getDate(),
            city:addrees,
            icon:forecastData.icon
        });
    });
}
    

module.exports ={
    geocodeData:geocodeData,
    searchData:searchData
}
    