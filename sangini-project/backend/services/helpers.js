function getCurrentDateTime(){
    let date_time = new Date();

    let date = ("0" + date_time.getDate()).slice(-2); // get date
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2); // get month
    let year = date_time.getFullYear(); // get YYYY
    let hours = date_time.getHours(); // get hours
    let minutes = date_time.getMinutes(); // minutes
    let seconds = date_time.getSeconds(); // get seconds
    
    return date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds; // return in dd-mm-yyyy hh:mm:ss format
}

module.exports={getCurrentDateTime};