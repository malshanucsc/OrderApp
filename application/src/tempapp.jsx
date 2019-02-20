import React, { Component} from 'react';
import { BrowserRouter as  Router, Switch, Route, Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

import Index from './components/index.component.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  

    this.state = {
        username: '',
        register:'loggin',
        password1: '',
        password2:'',
        redirectIndex:false,
        submitted: false
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword1 = this.handlePassword1.bind(this);
    

    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleUserName(e) {
  
  this.setState({ username: e.target.value });
}

handlePassword1(e) {
  
  this.setState({ password1: e.target.value });
}
handlePassword2(e) {
  
  this.setState({ password2: e.target.value });
}
handleRegister(registerValue){
  
  this.setState({register:registerValue});
}

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });

  
  
  const obj={ username:this.state.username,
              password:this.state.password1 };

  if(this.state.register==='registering'){
    if (this.state.username && this.state.password1) {
      axios.post('http://localhost:4000/user/register', obj)
          .then(res => console.log(res.data));
  
        
    }
    
  }else if(this.state.register==='loggin')
  if (this.state.username && this.state.password1) {
    axios.post('http://localhost:4000/user/authenticate', obj)
        
        
        .then(res=>sessionStorage.setItem('user_data',JSON.stringify(res.data)));
        console.log("dasdasdas");

        const user_data = sessionStorage.getItem('user_data');

        if(user_data !==null){
          this.setState({
            redirectIndex:true
          });
        
      
  }
  
  
}


  
  // if(user_data.orderapp_user_token!=''){
  //   return<Redirect to ='/create' />;
  // }
  
}

  render() {
    
      
    if(this.state.redirectIndex){
      return <Switch><Route path='/create' component={Index}  /></Switch>

    } 
    
    
    var passwordNotMatched=true;
    
    var regButtonDisabled=false;
    if((this.state.password1===this.state.password2) && this.state.password1!==''){
      passwordNotMatched=false;
    }

    if(this.state.username===''){
      regButtonDisabled=true;

    }
    
    
    var logginButton = 
        <div>
          <input type="submit" className="fadeIn fourth" value="Log In"/>
        </div>;

    

    var logginFooter = 
        <div id="formFooter">
          <Link to={''} onClick={()=>this.handleRegister('registering')} className="nav-link" >Need an account ? </Link>
        </div>

    var registerSection = 
        <div>
          <input type="password"  className="fadeIn third" name="login" placeholder="Retype Password" value={this.state.password2} onChange={this.handlePassword2}/>
          {passwordNotMatched &&
                            <div className="help-block">Two password are not the same</div>
                        }
          
          <input disabled={regButtonDisabled} type="submit" className="fadeIn fourth" value="Register"/>
        </div>

    var registerfooter = 
        <div id="formFooter">
          <Link to={''} onClick={()=>this.handleRegister('loggin')} className="nav-link" >Log In </Link>
        </div>

       
    return (
      
      
      
      <div className="wrapper fadeInDown ">
      <Switch><Route path='/index' component={ Index } /></Switch>
      <div id="formContent">
      <h1 className="">Sysco POS App </h1>
      <div className="fadeIn first">
      
    </div>
    <form  onSubmit={this.handleSubmit}>

      <input type="text" className="fadeIn second" name="login"  value={this.state.username} onChange={this.handleUserName} placeholder="Username"/>
      {this.state.submitted && !this.state.username &&
                            <span className="help-block">Username is required</span>
                        }
      <input type="password" className="fadeIn third" name="login" placeholder="Password" value={this.state.password1} onChange={this.handlePassword1}/>
      {this.state.submitted && !this.state.password1 &&
                            <div className="help-block">Password is required</div>
                        }

      
    
      {this.state.register==='loggin'?logginButton:this.state.register==='registering'?registerSection:''}

      
    </form>

    {this.state.register==='loggin'?logginFooter:this.state.register==='registering'?registerfooter:''}

      </div>
      </div>
      
      
   
    

   
    

    
   

    );
  }
}
export default App;