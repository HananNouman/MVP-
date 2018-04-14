var express = require('express');
var bodyParser = require('body-parser');
var movies = require('../database-mongo');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/movies', function (req, res) {
         	  var obj = new movies.Movie({
           userName: req.body['states[userName]'],
         passWord: req.body['states[passWord]'],
         movieName:req.body['states[movieName]']
        });
        obj.save(function(err,obj) {
          if(err){
             res.status(500).send(err);
          }
          else{res.status(200).send(obj);}
        })
   
})

app.get('/movies', function (req, res) {
  movies.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
    	var arr=[];
    	for (var i=0;i<data.length;i++){
         arr.push({userName:data[i]["userName"],movieName:data[i]["movieName"]})
    	}
    	arr.sort(function(a, b) {
          var nameA = a.userName.toUpperCase(); 
          var nameB = b.userName.toUpperCase(); 
          if (nameA < nameB) {
          return -1;
          }
          if (nameA > nameB) {
          return 1;
          }
          return 0;
          });
      res.send(arr);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

