exports.getDate=()=>{
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    var today  = new Date();
    return today.toLocaleDateString("en-US", options);
}