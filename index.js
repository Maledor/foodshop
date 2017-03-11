var express = require('express');
var server = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;
var mongoURI = process.env.mongoURI || require('./secrets').mongoURI;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(mongoURI);

var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number,
  type: String
});

var Food = mongoose.model('Food', foodSchema);

// var whiteBread = new Food({
//   price: 3.99,
//   category: "Bakery",
//   isGlutenFree: false,
//   calories: 1300,
//   type: "whiteBread"
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
//   calories: 1000,
//   type: "honeyWheatBread"
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
//   calories: 30,
//   type: "soup"
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
//   calories: 100,
//   type: "banana"
// });
//   banana.save(function(err, data){
//     if(err){
//       console.error(err);
//     } else {
//       console.log(data);
//     }
//   });
//
// GET /foods
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
//GET /foods/price/:dollarAmount
server.get('/foods/price/:dollarAmount', function(req, res){
  Food.find({price: req.params.dollarAmount}, function(err, documents){
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
//GET /foods/category/:categoryName
server.get('/foods/category/:categoryName', function(req, res){
  Food.find({category: req.params.categoryName}, function(err, documents){
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
//POST /foods
server.post('/foods', function(req, res){
  var food = new Food(req.body);
  food.save(function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else{
      res.status(201).json({
        msg: 'Success'
      });
    }
  });
});
//PUT /foods/:id
server.put('/foods/:id', function(req, res){
  Food.findOneAndUpdate({_id: req.params.id}, req.body, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully updated'
      });
    }
  });
});
//DELETE /foods/:id
server.delete('/foods/:id', function(req, res){
  Food.remove({_id: req.params.id}, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully deleted'
      });
    }
  });
});
server.delete('/foods/category/:category', function(req, res){
  Food.remove({category: req.params.category}, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully deleted'
      });
    }
  });
});

server.listen(port, function(){
  console.log('Now listening on port...', port);
});
