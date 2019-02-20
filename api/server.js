const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db.js');
const OrderRoute = require('./routes/order.route');
const UserRoute = require('./routes/user.route')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/order', OrderRoute);
app.use('/user',UserRoute)
app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});