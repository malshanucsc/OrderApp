import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Create from './components/create.component.jsx';
import Index from './components/index.component.jsx';
import Login from './components/login.component.jsx';

class App extends Component {
  constructor(props){
    super(props)
    
    this.access_detail="asdasdas";
    
    
    //this.props.user_data=sessionStorage.getItem('user_data')
    
    this.state={
      user_data:JSON.parse(localStorage.getItem('user_data')),
      greeting:"",
      isAuth : false
      
    }

      

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);



  
  }

  componentWillMount(){
    this.setState({
      isAuth:true

    });

  }

  
  handleLogin(){
     
      this.setState({
        user_data:JSON.parse(localStorage.getItem('user_data')),

       

      },()=>this.setState({
        

        greeting:"Hi,   "+this.state.user_data.username,
        isAuth : true

      }));
      
      
     

  

  }
 
  handleLogout(){
    this.setState({
      greeting:"",
      isAuth : false
    });
    
  }
  
  
  
  
  render() {
    
    
    
   
    
    const navbar=
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link to={'/index'} className="nav-link">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/create'} className="nav-link">Create Order</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/login'} onClick={()=>this.handleLogout()} className="nav-link">Logout</Link>
                      </li>
                      
                      
                      
                    </ul>

                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item " ><h1>{this.state.greeting} </h1></li>
                    </ul>
                    
                  </div>;
    
    
    return (
      
      
      
        <div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand"><h1>Sysco POS App </h1></Link>
            {this.state.isAuth?navbar:""}
            
          </nav> <br/>
          
          <Switch>
              <Route path='/login' render={(props) => <Login {...props} handleLogin={this.handleLogin} />}   />
              <Route exact path='/create' render={(props) => <Create {...props}  handleLogout={this.handleLogout}   />} />
              <Route path='/' render={(props) => <Index {...props}  handleLogout={this.handleLogout}   />}   />
          </Switch>
          

          
        </div>
        
        </div>
        
     
    );
  }
}
export default App;