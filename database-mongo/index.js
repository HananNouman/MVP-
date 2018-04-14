var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
mongoose.connect('mongodb://localhost/Movielists');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var movieSchema = mongoose.Schema({
  userName: String,
  passWord: String,
  movieName:String,
});

var Movie = mongoose.model('Movie', movieSchema);

var selectAll = function(callback) {
  Movie.find({}, function(err, movies) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, movies);
    }
  });
};
Movie.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.passWord, function(err, isMatch) {
      if(err){
        callback(err)
      }else{
            callback(null,isMatch);}

    });
  }

movieSchema.pre('save',function(next) {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.passWord, null, null).bind(this)
      .then(function(hash) {
        this.passWord = hash;
        next();
      });
  })
module.exports.Movie = Movie;
module.exports.selectAll = selectAll;