import React, { Component} from 'react';
import { BrowserRouter as  Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const config = require('../config.json');




export default class Login extends Component {
  constructor(props) {
    super(props);
    
  

    this.state = {
        username: '',
        register:'loggin',
        password1: '',
        password2:'',
        redirectIndex:false,
        submitted: false,
        invalid_login:false,
        user_data:undefined
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword1 = this.handlePassword1.bind(this);
    // this.redirectToIndex = this.redirectToIndex.bind(this);
    

    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    

    localStorage.removeItem("user_data");
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
      axios.post(config.ServerAddress+'/user/register', obj)
          .then(res => console.log(res.data));
  
        
    }
    
  }else if(this.state.register==='loggin')
  if (this.state.username && this.state.password1) {
    axios.post(config.ServerAddress+'/user/authenticate', obj)
    
        
        
        .then(res=> {if(res.data.message==="invalid"){
          this.setState({
            invalid_login:true
          });


        }else{
          
          
          this.setState({invalid_login:false,user_data:res.data},()=>localStorage.setItem('user_data',JSON.stringify(this.state.user_data)));
          console.log("ASdas");
          this.props.handleLogin();

        }
    
    });

  }
}





  render() {
    

    if(this.state.user_data!==undefined){
      
      this.props.history.push('/');
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
          <input type="submit" className="fadeIn fourth login_submit_buttons" value="Log In"/>
        </div>;

    

    var logginFooter = 
        <div id="formFooter">
          <Link to={''} onClick={()=>this.handleRegister('registering')} className="nav-link" >Need an account ? </Link>
        </div>

    var registerSection = 
        <div>
          <input type="password"  className="fadeIn third logininputs" name="login" placeholder="Retype Password" value={this.state.password2} onChange={this.handlePassword2}/>
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
      
      <div id="formContent">
      <h1 className="">Login</h1>
      <div className="fadeIn first">
      
    </div>
    <form  onSubmit={this.handleSubmit}>

    {this.state.invalid_login &&
                            <div className="help-block text-danger">Username or Password Incorrect</div>
                        }

      <input type="text" className="fadeIn second logininputs" name="login"  value={this.state.username} onChange={this.handleUserName} placeholder="Username"/>
      {this.state.submitted && !this.state.username &&
                            <span className="help-block">Username is required</span>
                        }
      <input type="password" className="fadeIn third logininputs" name="login" placeholder="Password" value={this.state.password1} onChange={this.handlePassword1}/>
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
