const request = require('request')
const geocode= (address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=69bddd09e4eb8be0f0103b00e2e6d2e8&query='+encodeURIComponent(address)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to geo service')
        }else if (!body.data)
        {
         callback("Unable to find location. Try another search.")
       }
       else{
           callback(undefined,
            {latitude:body.data[0].latitude,
            longitude:body.data[0].longitude,
            location:body.data[0].name   })
       }
    })
}

module.exports= geocode