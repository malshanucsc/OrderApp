const express = require('express');
const OrderRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');

// Require Order model in our routes module
let Order = require('./../models/order.model');

// Adding order
OrderRoutes.route('/add').post(verifyAcess,function (req, res) {
  jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
      
      res.status(200).json({ message: 'sessionExpired' })
    
    }else{
      
      let order = new Order(req.body);
      order.save()
        .then(order => {
          res.status(200).json({order:"order_successfull"});
        })
        .catch(err => {
        res.status(200).send("order_fail");
        });    

    }
  });
});


// updating order
OrderRoutes.route('/update').post(verifyAcess,function (req, res) {
  
  jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
      
      res.status(200).json({ message: 'sessionExpired' })
    
    }else{
      
      
      Order.findById(req.body[1], function(err, order) {
        if(!order){
          res.status(200).send("order_not_found");
        }else{
          let updated_obj = req.body[0];
          
          order.order_name = updated_obj.order_name;
          order.items = updated_obj.items;
          order.grand_total = updated_obj.grand_total;
          order.customer_name = updated_obj.customer_name;
          order.address = updated_obj.address
          

          order.save()
          .then(order => {
            res.status(200).json({order:order,message:"order_update_successfull"});
          })
          .catch(err => {
            res.status(200).send("order_update_fail");
          });

        }


      });
      
      // let order = new Order(req.body);
      // order.save()
      //   .then(order => {
      //     res.status(200).json({order:"order_successfull"});
      //   })
      //   .catch(err => {
      //   res.status(200).send("order_fail");
      //   });    

    }
  });
});


//deleting order
OrderRoutes.route('/delete').post(verifyAcess,function (req, res) {
  jwt.verify(req.token,config.secret,(err)=>{
    if(err){

      res.status(200).json({ message: 'sessionExpired' })
    
    }else{

      Order.findByIdAndRemove({_id: req.body.id}, function(err, business){
        if(err) res.status(200).json({message:"remove_fail"});
        else res.status(200).json({message:'remove_successful'});
      });     
    
    }
  });  
});

// reteiving all orders
OrderRoutes.route('/').get(verifyAcess,function (req, res) {
  jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){

      res.status(200).json({ message: 'sessionExpired' })
    
    }else{

      Order.find(function(err, orders){
        if(err){
          console.log(err);
        }
        else {
          res.json({
            orders,
          authData});
        }
      });
      
    }
  });
});

//verify access
function verifyAcess(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(bearerHeader !== undefined){

    const bearer = bearerHeader.split(' ');
    const bearToken = bearer[1];
    req.token = bearToken;
    next();

  }else{
    res.status(200).json({ message: 'sessionExpired' })
  }
}
module.exports = OrderRoutes;