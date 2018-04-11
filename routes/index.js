var express = require('express');
var router = express.Router();
var request =require('request')
var mongo = require('mongoose');



var Employee = require('../models/employee');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sudheer solutions' });
});


router.post('/login', function(req, res) {

    // Look for username
  Employee.findOne({
      name: req.body.loginuname,
    }, function (err, item) {
      if (err) return res.send();

      // If the username is not found or the login password doesn't match the user's password
      if (!item) {

        console.log("The username is not valid\n");
        res.render('usename')

      } else {
        if (req.body.loginpword !== item.password) {

          console.log("The password is not correct\n");
          res.render('notvalid')

        } else {
res.render('success')
          console.log("The entry is correct!\n");

        }
      }

    });
  router.post('/weather', function (req, res) {
    var city = req.body.city;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=city&appid=f0934a2defad938b153d37256b65a459'

    console.log(url)
    request(url, function (err, response, body) {
      if(err){
        res.render('id', {weather: null, error: 'Error, please try again'});
      } else {
        var weather = JSON.parse(body)
        console.log(body)
        if(weather.main == undefined){
        res.render('id', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(weatherText)
        res.render('id', {"weather": weatherText});
      }
    }
    });
  })

});
/*router.get('/weather', function (err,res) {
  if(err)
  {
    res.render('error')
  }
  else
  {
    res.render('')
  }
})*/
router.get('/wiki',function(err,res)
{

    res.render('wiki')

});
router.post('/wiki', function (req, res) {
  var wiki=req.body.wiki
  console.log(wiki)
  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles='+wiki

  console.log(url)
  request(url, function (err, response, body) {
    if (err) {
      res.render('id', {wiki: null, error: 'Error, please try again'});
    } else {
      var wikidata= JSON.parse(body);
var wikipedia=wikidata.query.pages

      console.log(wikipedia)

      res.send(wikipedia)


    }


  });

});
router.get('/index',function(err,res)
{

  res.render('index')

});

router.get('/mv',function(err,res)
{

  res.render('movie')

});



router.post('/movie', function (req, res) {
var movie=req.body.moviename;
  var url = 'https://api.themoviedb.org/3/search/movie?api_key=c7cbd5c5915a6a73e567c9c3fbd1a0f1&query='+movie

  console.log(url)
  request(url, function (err, response, body) {
    if (err) {
      res.render('id', {movie: null, error: 'Error, please try again'});
    }


    else {
      var moviedata = JSON.parse(body)

      var Text = `RELEASE DATE ${moviedata.results[2].release_date} and  POPULARIY ${moviedata.results[2].popularity}!`;
      res.send(Text)


    }


  });

});
module.exports = router;
