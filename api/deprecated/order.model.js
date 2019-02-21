const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Order
let Order = new Schema({
  order_name: {
    type: String
  },
  items:[{
    item_number : Number,
    item_name : String,
    quantity: Number,
    unit_value : Number,
    subtot: Number,  
      }],

  grand_total: {
    type: Number
  },
  customer_name : {
    type : String
  },
  address : {
    type : String
  }
  
},{
    collection: 'Orders'
});

module.exports = mongoose.model('Order', Order);