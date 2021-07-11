// Node prebuilt packages
const path=require('path');

// Npm packages
const express=require('express');
const hbs=require('hbs');


//Local modules
const sendData=require(__dirname+'/utils/sendData.js');

// Initializing express
const app=express();

// Set port enviroment value
const port=process.env.PORT || 3000;

// Setting up the different paths we'll be using 
const staticFilesPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/view');
const partialsPath=path.join(__dirname,'../templates/partials');


//Setting up the working environment
app.set('view engine','hbs');//Definning the view engine
app.set('views',viewsPath);//Definning the views path
app.use(express.static(staticFilesPath));//Setting up the static files path
hbs.registerPartials(partialsPath); //Registering the views partials path

// Homepage route page
app.get('/',(req,res) => {
    res.render('index');
});

// Weather search route page
app.get('/weather',(req,res) => {
    let address=req.query.address;
    if(!address)return sendData.geocodeData(res);
    sendData.searchData(address,res);
});


//404 route page
app.get('*', (req, res) => {
    res.render('404');
})   


app.listen(port,()=>{
    console.log('Server opennned on port: '+port);
});