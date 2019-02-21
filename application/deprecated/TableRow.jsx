import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';


const config = require('../config.json');

class TableRow extends Component {

  constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
        
        this.hide = this.hide.bind(this);

        this.state = {
          alert_type:"",
          alert_message:"",
          alerting : false
        }

     
    }


    



    view(){
      
      document.getElementById(this.props.order_key+"itemlist").hidden=false;
      document.getElementById(this.props.order_key+"hideButton").hidden=false;
      document.getElementById(this.props.order_key+"viewButton").hidden=true;

      
      
    
    }

    hide(){
      document.getElementById(this.props.order_key+"itemlist").hidden=true;
      document.getElementById(this.props.order_key+"hideButton").hidden=true;
      document.getElementById(this.props.order_key+"viewButton").hidden=false;
    
    
    }


  render() {

    var alert_element = 
      <div className="row ">
        
        

          <div className={"alert alert-"+this.state.alert_type} role="alert">
            {this.state.alert_message}
          </div>
        
        
        
        
      </div>

    var tableRow=

                
                
                
                
                
                
                
                
              
              {/* <td hidden={true} id={this.props.order_key+"itemlist"}>
                <table >
                  <tbody>
                  {this.props.obj.items.map((item)=><tr key={item.item_number} >
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_value}</td>
                <td>{item.subtot}</td>
              </tr>)}

                  </tbody>
                </table>

                
              
              </td> */}

             
                
              
    
    return (
      

      this.state.alerting && this.state.alert_type && alert_element,
      tableRow
      
      

    );
  }
}

export default TableRow;