const express = require('express');
const OrderRoutes = express.Router();

// Require Order model in our routes module
let Order = require('./order.model');

// Adding order
OrderRoutes.route('/add').post(function (req, res) {
  let order = new Order(req.body);
  console.log(order);
  order.save()
    .then(order => {
      res.status(200).json({order:"successfull"});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// reteiving all orders
OrderRoutes.route('/').get(function (req, res) {
    Order.find(function(err, orders){
    if(err){
      console.log(err);
    }
    else {
      res.json(orders);
    }
  });
});



module.exports = OrderRoutes;
