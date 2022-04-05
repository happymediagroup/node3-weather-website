const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d3503fdf90efc9b835f04ecda64a561e&query=' + latitude + ',' + longitude
    //console.log(url)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        
        } else if (body.error) {
            callback('Unable to find location.', undefined)

        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast
