const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode.js')
const weathercode = require('./utils/weathercode.js')

const app = express()
//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templetes/views')
const partialPath=path.join(__dirname,'../templetes/partial')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Albion Krivenjeva'
    })
})
app.get("/about",(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Albion Krivenjeva'
    })
})
app.get("/help",(req,res)=>{
       res.render('help',{
        helpText:'this is some helfuly text',
        title:'Help',
        name:'Albion Krivenjeva'
       })
})


  app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return res.send({ error: 'You must provide a address'})
   }
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }

weathercode(latitude,longitude,(error,weatherData)=>{
    if(error){
        return res.send({error})
    }
    res.send({
      forecast: weatherData,
      location,
      address:req.query.address
    })
   
   })
})
  })
  app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({ error: 'You must provide a search term'})
    }
    console.log(req.query.search)
    res.send({products:[] })
  })

  app.get('/help/*',(req,res)=>{
    res.render('404',{errorMessage:'Help article not found',
name:'Albion Krivenjeva',title:'404'})
  })
   app.get("*",(req,res)=>{
      res.render('404',{
        errorMessage:'Page not found',name:'Albion Krivenjeva',title:'404'
      })
   })

app.listen(3000,()=>{
    console.log('server is up on')
}) 