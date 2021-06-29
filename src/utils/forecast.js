const https=require('https');
const apis_keys=require(__dirname+'/apis_keys.js');

const forecast=(address,callback)=>{

    
    //Setting up all the  options for the https request ..
    const options={
        hostname:'api.openweathermap.org',
        path:`/data/2.5/weather?q=${address}&appid=${apis_keys.weather()}&units=metric`,
        method:'GET',
        port:443
    }

    
    const request=https.request(options,(res)=>{
        let first_data="";//Variable that's gonna catch the every single data sends by the api ..
        console.log(res.statusCode);

        //Caching request or errors .. https errors (400,401,404,etc.)
        if(res.statusCode===404) callback('Cannot find location, try again.',undefined);
        // if(res.statusCode!=200) callback('An error occured during the request,try again.',undefined);
        //If we successfully got the data then put it all in a variable ,until all the data is acumulated
        if(res.statusCode===200){
            res.on('data',(chunk)=>{
                first_data=JSON.parse(chunk);
            })

            //Finally when we done fetching the data from the api , we put in a new variable and send it to the client side...
            res.on('end',()=>{

                const last_data=first_data;
                console.log(last_data);
                callback(undefined,{
                    temperature:last_data.main.temp,
                    description:last_data.weather[0].description,
                    wind:last_data.wind.speed,
                    humidity:last_data.main.humidity,
                    temp_max:last_data.main.temp_max,
                    image:last_data.weather[0].icon,
                    country:last_data.sys.country,
                    city:last_data.name,
                    icon:last_data.weather[0].icon
                });
            })
        }
    });
               

    request.on('error', (e)=>{
        callback("Please check your internet connection",undefined);
    });

    request.end();
}
        


module.exports = forecast;