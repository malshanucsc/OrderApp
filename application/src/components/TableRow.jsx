import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        // this.delete = this.delete.bind(this);
        this.view = this.view.bind(this);

        this.state = {detail_order_view : '',

      };
    }
    // delete() {
    //     axios.get('http://localhost:4000/business/delete/'+this.props.obj._id)
    //         .then(console.log('Deleted'))
    //         .catch(err => console.log(err))
    // }
    view(){
      this.setState({
        detail_order_view:1
      })
      
    
    }
  render() {
    
    return (
      
        <tr>
          <td>
            {this.props.obj.order_name}
          </td>
          <td>
            {this.props.obj.customer_name}
          </td>
          <td>
            {this.props.obj.items.length}
          </td>
          <td>
          <button onClick={this.view} className="btn btn-primary">View</button>
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          {/* <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td> */}
          
          
        
        <td>
          <table>
            <tbody>
            {this.props.obj.items.map((item)=><tr key={item.item_number}>
          <td>{item.item_name}</td>
          <td>{item.quantity}</td>
          <td>{item.unit_value}</td>
          <td>{item.subtot}</td>
        </tr>)}

            </tbody>
          </table>
      
          
        
        </td>
        </tr>
        

    );
  }
}

export default TableRow;