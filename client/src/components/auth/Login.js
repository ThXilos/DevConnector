import React, {useState} from 'react'
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";



const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const {email,password} = formData;

    const onChange=e=> setFormData({
        ...formData,[e.target.name]:e.target.value
    });

    const onSubmit = async e =>{
        e.preventDefault();
        login(email, password);
            // const newUser={
            //     name,
            //     email,
            //     password
            // }
            // try{
            //     const config = {
            //         headers:{
            //             "Content-Type":"application/json"
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     //Post @ /api/users, payload, content-type
            //     const res = await axios.post("/api/users", body, config);
            //     //this will the Token
            //     console.log(res.data);

            // }catch(err){
            //     console.error(err.response.data);
            // }
    };
    //Redirect if logged in
    if(isAuthenticated){
      return <Redirect to="/dashboard" />

    }

    return (
     <>
      <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign in to your account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={ e => onChange(e) }
          name="email" 
          required />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={ e => onChange(e) }
            name="password"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>   
    </>
    )
}
Login.protoTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}


const mapStateToProps = state => ({
  //This gives initialState from reducers/auth.js
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{ login })(Login);

