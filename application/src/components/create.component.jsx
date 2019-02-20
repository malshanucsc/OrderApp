import React, { Component } from 'react';
import axios from 'axios';

const config = require('../config.json');



export default class Create extends Component {
  constructor(props) {
    super(props);
    

    this.onChangeOrderName = this.onChangeOrderName.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeUnitValue = this.onChangeUnitValue.bind(this);
    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.addItem = this.addItem.bind(this);
    this.alertAndTimeout = this.alertAndTimeout.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      order_name: '',
      item_name: '',
      address:'',
      customer_name:'',
      grand_total:0.00,
      quantity:0.0,
      unit_value:0.0,
      subtot:0.0,
      item_set:[],
      item_number:0,
      new_item_obj:{

      },
      user_data:JSON.parse(localStorage.getItem('user_data')),
      alert_type:"",
      alert_message:"",
      alerting : false
    }
  }
  onChangeOrderName = (e)=> {
    this.setState({
      order_name: e.target.value
    });
  };
  onChangeItemName(e) {
    this.setState({
      item_name: e.target.value
    })  
  }
  onChangeQuantity(e) {
    
    
    this.setState({
      quantity: e.target.value,
      
 
    },()=>this.setState({
      subtot:this.state.unit_value * this.state.quantity

    }))
    
    
    
  }
  onChangeUnitValue(e) {
    this.setState({
      unit_value: e.target.value,
      subtot:this.state.unit_value * this.state.quantity
    },()=>this.setState({
      subtot:this.state.unit_value * this.state.quantity
      

    }))  
  }
  onChangeSubTot(e) {
    this.setState({
     subtot: e.target.value
    })
  }
  onChangeCustomerName(e) {
    this.setState({
     customer_name: e.target.value
    })
  }
  onChangeAddress(e){
    this.setState({
      address:e.target.value
    })
  }
  addItem(callback){
    
    const new_item_obj={
      item_number:this.state.item_number,
      item_name:this.state.item_name,
      quantity:this.state.quantity,
      unit_value:this.state.unit_value,
      subtot:this.state.subtot

    };
    this.setState({
      item_number : this.state.item_number+1,
      item_set : this.state.item_set.concat(new_item_obj),
      grand_total:this.state.grand_total+this.state.subtot,
      item_name : '',
      quantity : 0.0,
      unit_value : 0.0,
      subtot : 0.0
    });
    
    

    
    
    
  }
  onChangeGstNumber(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }
  

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

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      order_name: this.state.order_name,
      items: this.state.item_set,
      grand_total: this.state.grand_total,
      customer_name : this.state.customer_name,
      address : this.state.address
    };
    
    
    

    if(this.state.user_data===null){
        
        
        
      this.props.history.push('/login');
    
    }else{
      const access_token = this.state.user_data.orderapp_user_token;

    const createOrder = {
      method: 'post',
      headers: { Authorization: "Bearer " + access_token },
      data:obj,
      
      
      url:config.ServerAddress+'/order/add',
    };

    axios(createOrder).then(response => {
      if(response.data.message==="sessionExpired"){
        this.props.handleLogout();
        
        this.props.history.push('/login');

      }else{
        
        
        if(response.data.order==="order_successfull"){
          
          
          this.setState({
            customer_name: '',
            order_name: '',
            item_set: [],
            address:''
          },()=>this.alertAndTimeout("success","Order Recorder Succefully !"));
          
          

        }else if(response.data==="order_fail"){
          this.alertAndTimeout("danger","Order Failed !")

        }
        
        
        
        
      }
     
        
      }).catch(function (error) {
        console.log(error);
      })
      
    }





    
    
  }
 
  render() {
    if(this.state.user_data===null || this.state.user_data===undefined){
      this.props.history.push('/login');
    
    }
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
      
        <div style={{ marginTop: 10 }}>
        {this.state.alerting && this.state.alert_type && successful_alert}
          
            <h3>Add New Order</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Order Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.order_name}
                      onChange={this.onChangeOrderName}
                      />
                </div>
                <div className="form-group">
                    <label>Items: </label>
                    <table>
                      <tbody>
                      <tr>
                        <td className="col-l-2">Name</td>
                        <td className="col-l-2">Quantity</td>
                        <td className="col-l-2">Unit Price $</td>
                        <td className="col-l-2">Sub Total</td>
                      </tr>

                        {this.state.item_set.map((item)=><tr key={item.item_number}>
                          <td className="col-l-2">{item.item_name}</td>
                          <td className="col-l-2">{item.quantity}</td>
                          <td className="col-l-2">{item.unit_value}</td>
                          <td className="col-l-2">{item.subtot}</td>
                        </tr>)}

                      
                      
                      <tr>
                        <td>  </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" 
                          className="form-control"
                          name={ `name-${ this.props.index }` } 
                          value={this.state.item_name}
                          onChange={this.onChangeItemName}
                          />
                          </td>
                          <td>
                          <input type="number" 
                          className="form-control"
                          name={ `quantity-${ this.props.index }` }
                          value={this.state.quantity}
                          onChange={this.onChangeQuantity}
                          />
                          </td>
                          <td>
                          <input type="number" 
                          className="form-control"
                          name={ `unitvalue-${ this.props.index }` }
                          value={this.state.unit_value}
                          onChange={this.onChangeUnitValue}
                          />
                          </td>
                          <td>
                          <input type="text" 
                          className="form-control"
                          name={ `subtot-${ this.props.index }` }
                          readOnly 
                          value={this.state.subtot}
                          onChange={this.onChangeSubTot}/>
                          </td>

                          <td>
                            <button type="button" className="btn btn-success" onClick={this.addItem} >Add</button>
                          </td>
                        </tr>
                      
                      </tbody>
                      </table>
                    
                </div>

                <div className="form-group">
                  <h3>Total</h3>
                    <label>{this.state.grand_total}</label>
                    
                </div>

                <div className="form-group">
                    <label>Customer Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.customer_name}
                      onChange={this.onChangeCustomerName}
                      />
                </div>

                <div className="form-group">
                    <label>Address: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      />
                </div>
                
                
                <div className="form-group">
                    <input type="submit" value="Place Order" className=" btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}


