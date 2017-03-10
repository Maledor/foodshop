var express = require('express');
var server = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var mongoURI = process.env.mongoURI || require('./secrets').mongoURI;

mongoose.connect(mongoURI);

var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number
});

var Food = mongoose.model('Food', foodSchema);
//
// var whiteBread = new Food({
//   price: 3.99,
//   category: "Bakery",
//   isGlutenFree: false,
//   calories: 1300
// });
//   whiteBread.save(function(err, data){
//     if(err){
//       console.error(err);
//     } else {
//       console.log(data);
//     }
//   });
// var honeyWheatBread = new Food({
//   price: 4.99,
//   category: "Bakery",
//   isGlutenFree: false,
//   calories: 1000
// });
//   honeyWheatBread.save(function(err, data){
//     if(err){
//       console.error(err);
//     } else {
//       console.log(data);
//     }
//   });
// var soup = new Food({
//   price: 5.99,
//   category: "Canned Goods",
//   isGlutenFree: false,
//   calories: 30
// });
//   soup.save(function(err, data){
//     if(err){
//       console.error(err);
//     } else {
//       console.log(data);
//     }
//   });
// var banana = new Food({
//   price: 0.25,
//   category: "Produce",
//   isGlutenFree: true,
//   calories: 100
// });
//   banana.save(function(err, data){
//     if(err){
//       console.error(err);
//     } else {
//       console.log(data);
//     }
//   });

// GET /animals
server.get('/foods', function(req, res){
  Food.find({}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});
//GET /foods/:id
server.get('/foods/:id', function(req, res){
  Food.find({_id: req.params.id}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});
