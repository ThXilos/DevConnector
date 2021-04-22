import React, {useState} from 'react';
import { connect } from "react-redux";
import {Link, Redirect} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types'



const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });

    const {name,email,password,password2} = formData;

    const onChange=e=> setFormData({
        ...formData,[e.target.name]:e.target.value
    });

    const onSubmit = async e =>{
        e.preventDefault();
        if(password !== password2){
            setAlert("Passowrds do not match","danger");
        }else{
          register({name, email, password});
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
    }};
    if (isAuthenticated){
      return <Redirect to="/dashboard" />
    }
    return (
     <>
      <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={ e => onChange(e) }
          name="name" 
          />
        </div>
        <div className="form-group">
          <input type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={ e => onChange(e) }
          name="email" 
           />
          <small class="form-text">This site uses Gravatar so if you want a profile image, use a
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={ e => onChange(e)}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>   
    </>
    )
};

Register.propTypes = {
 setAlert: PropTypes.func.isRequired,
 register: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  //This gives initialState from reducers/auth.js
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ setAlert, register })(Register);

