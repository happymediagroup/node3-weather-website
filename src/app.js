const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publiDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publiDirPath))


app.get('', (rep, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Obi McDonald-Saint'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Jelly Beanz'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        code: 46,
        error: 'Support cannot be found.',
        name: 'Obi McDonald-Saint'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // return console.log(error)
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, { temperature, feelslike } = {}) => {
            if (error) {
                // return console.log(error)
                return res.send({ error })
            }
    
            // console.log(location)
            // console.log('It is ' + temperature + ' degrees out. Feels like ' + feelslike + ' degrees out.' )
            
            res.send({
                forecast: 'It is ' + temperature + ' degrees out. Feels like ' + feelslike + ' degrees out.',
                location,
                address: req.query.address
            })
        
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        code: 'H404',
        error: 'Help Article not found',
        name: 'The Johnsons'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        code: 404,
        error: 'Page not found',
        name: 'Daisy Rockerfeller'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})