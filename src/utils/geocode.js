const https=require('https');
const apis_keys=require(__dirname+'/apis_keys.js');

const geocode=(callback) => {
    const options = {
        "method": "GET",
        "hostname": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "port": null,
        "path": "/json/",
        "headers": {
            "x-rapidapi-key": apis_keys.geocode(),
            "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
            "useQueryString": true
        }
    };

    const req = https.request(options, function (res) {
        let first_data="";
        
        if(res.statusCode!=200) callback('An error occured during the request,try again.',undefined);

        res.on("data", function (chunk){
            first_data=JSON.parse(chunk);
        });
        
        res.on("end", function (){
            const last_data=first_data;
            console.log(first_data);
            callback(undefined,{
                city:last_data.city,
                country:last_data.country
            });
        });

        res.on('error',(error)=>{
            callback("Please check your internet connection",undefined);
        });
    });

    req.end();
}
    
module.exports=geocode;







        