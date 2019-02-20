import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow.jsx';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const config = require('../config.json');



export default class Index extends Component {

  constructor(props) {
      super(props);
      
      
      this.state = {
        order: [],
        user_data:JSON.parse(localStorage.getItem('user_data'))
      };
      
      
     
      
      
    }

    componentDidMount(){
      
      
      

      if(this.state.user_data===null){
        
        
        
        this.props.history.push('/login');
      
      }else{
        const access_token = this.state.user_data.orderapp_user_token;

      const getOrders = {
        method: 'get',
        headers: { Authorization: "Bearer " + access_token },
        
        
        url:config.ServerAddress+'/order',
      };

      axios(getOrders).then(response => {
        if(response.data.message==="sessionExpired"){
          this.props.handleLogout();
          
          this.props.history.push('/login');

        }else{
          //this.props.handleUserName();
          
          this.setState({ order: response.data.orders });
          
          
        }
       
          
        }).catch(function (error) {
          console.log(error);
        })
        
      }
    
      
    }


    tabRow(){
      return this.state.order.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    
    

    render() {
      
      
      
      
      return (
        <div>
        <h3 align="center">Order List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Customer Name</th>
              <th>Address</th>
              
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            { this.tabRow() }
          </tbody>
        </table>
      </div>

        
      );
    }
  }

