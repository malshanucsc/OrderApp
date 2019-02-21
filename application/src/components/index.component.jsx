import React, { Component } from 'react';
import axios from 'axios';
import OrderDetailView from './orderDetailView.component.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
const config = require('../config.json');

export default class Index extends Component {

  constructor(props) {
      super(props);
      
      this.orderId="";
      this.view = this.view.bind(this);
      this.alertAndTimeout = this.alertAndTimeout.bind(this);
      
      this.state = {  
        order: [],
        orderDetailView:{},
        alert_type:"",
        alert_message:"",
        alerting : false,   
        user_data:JSON.parse(localStorage.getItem('user_data'))
      };
   
  }

  componentWillMount(){
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
            
            this.setState({ order: response.data.orders });
            this.state.order.map((order_obj)=>
            {
              let element = JSON.stringify(order_obj._id);

              let temporderView = Object.assign({}, this.state.orderDetailView);
              
              temporderView[element] = ""; 
              
              this.setState({orderDetailView:temporderView });

            });      
          }
          
        }).catch(function (error) {
          console.log(error);
        })
        
      } 
    }

//alerting section
    alertAndTimeout(type,message){
      

      this.setState({
        alerting : true,
        alert_type:type,
        alert_message:message
      },()=>setTimeout(
        function() {
            this.setState({
              alerting: false,
              alert_type:"",
              alert_message:""
            
            
            
            });
        }
        .bind(this),
        5000
    ));
    
  
    }

//deleting an order
    delete(deleting_order) {
      const access_token = this.state.user_data.orderapp_user_token;
      const dataObj = {id : deleting_order._id}
      const deleteOrder = {
        method: 'post',
        headers: { Authorization: "Bearer " + access_token },
        data: dataObj,
        
        
        url:config.ServerAddress+'/order/delete',
      };

      axios(deleteOrder).then(response => {
        if(response.data.message==="sessionExpired"){
          this.props.handleLogout();
          
          this.props.history.push('/login');

        }else{

          if(response.data.message==="remove_successful"){
  
            this.alertAndTimeout("success","Order Removed Succefully !");
            this.props.history.push('/')
       
          }else if(response.data.message==="remove_fail"){
            this.alertAndTimeout("danger","Order Removing Failed !")
          }    
        }
      }).catch(function (error) {
          console.log(error);
      })
     
    }

    //view a order detail view
    view(current_order){
 
      
      document.getElementById(current_order._id+"hidebtn").hidden=false;
      document.getElementById(current_order._id+"viewbtn").hidden=true;

      const new_element = <div><OrderDetailView order={current_order} user_data={this.state.user_data}/></div>;
      let data = this.state.orderDetailView;
      let element_id = current_order._id;
      data[element_id] = new_element;
      this.setState({
        orderDetailView:data
      });
      
 
    }

    //hide order detail view
    hide(current_order){

      document.getElementById(current_order._id+"hidebtn").hidden=true;
      document.getElementById(current_order._id+"viewbtn").hidden=false;

      let data = this.state.orderDetailView;
      let element_id = current_order._id;
      data[element_id] = "";
      this.setState({
        orderDetailView:data
      });
      
      
      

    }

    render() {
      //alerting div defining
      var successful_alert = 
          <div className="row ">
            <div className="col-sm">
            
            </div>
            <div className="col-sm">

              <div className={"alert alert-"+this.state.alert_type} role="alert">
                {this.state.alert_message}
              </div>
            
            </div>
            <div className="col-sm">
            
            </div>
            
          </div>

      
      return (
        <div>
          {this.state.alerting && this.state.alert_type && successful_alert}
          <h3 align="center">Order List</h3>
          <table className="table table-striped bg-light" style={{ marginTop: 20 }}>
            <thead>
            <tr>
              <th>Order Name</th>
              <th>Customer Name</th>
              <th>Address</th>
              
              <th colSpan="3">Actions</th>
            </tr>
            </thead>
            <tbody>
              {this.state.order.map((single_order)=>
              <tr key={single_order._id}>
              
                <td>{single_order.order_name}</td>
                
                
                <td>{single_order.customer_name}</td>

                <td>{single_order.address}</td>
                <td>
                    <button onClick={this.view.bind(this,single_order)} id={single_order._id+"viewbtn"} className="btn btn-outline-primary">View</button>
                    <button onClick={this.hide.bind(this,single_order)} hidden={true} id={single_order._id+"hidebtn"}  className="btn btn-outline-primary">Hide</button>
                </td>
                
                <td>
                    <button onClick={this.delete.bind(this,single_order)} className="btn btn-outline-danger">Delete</button>
                </td>

                <td id={single_order._id+"detailView"}>{this.state.orderDetailView[single_order._id]}</td>
    
              </tr>)}
      
              </tbody>
            </table>
    
          </div>
 
       );
  }
}

