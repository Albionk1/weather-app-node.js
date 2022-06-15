const request = require('request')
const weathercode= (latitude,longtitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=865d5edd572dfe0b3cce932fe3841f63&query='+latitude+','+longtitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather serviceable ',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
       else{
           callback(undefined,body.current.weather_descriptions[0]+' It is currentely '
            +body.current.temperature+' degres and it feels like '+body.current.feelslike )
       }
    })
}

module.exports= weathercode