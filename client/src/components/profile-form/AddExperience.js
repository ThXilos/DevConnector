import React,{Fragment, useState} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addExperience} from "../../actions/profile";


const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
    title:"",
    company:"",
    location:"",
    from:"",
    to:"",
    current: false,
    description:""
    });

    const [toDataDisabled, toggleDisabled] = useState(false);

    const{
    title,
    company,
    location,
    from,
    to,
    current,
    description
    } = formData;

    const onChange = e => setFormData({...formData,
    [e.target.name]:e.target.value});

    return (
        <Fragment>
            <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history)
      }}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" 
          value={title}
          onChange={e => onChange(e)}
          required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" 
          value={company}
          onChange={e => onChange(e)}
          required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" 
          onChange={e => onChange(e)}
          value={location} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" 
          onChange={e => onChange(e)}
          value={from} />
        </div>
        <div class="form-group">
          <p><input type="checkbox" 
          name="current" 
          onChange={e => {
              setFormData({...formData, current: !current});
              toggleDisabled(!toDataDisabled);
          }}
          checked={current}
          value={current} />{" "} Current Job</p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" 
          onChange={e => onChange(e)}
          value={to}
          disabled={toDataDisabled ? "disabled":""} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            onChange={e => onChange(e)}
            value={description}
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
        
    )
}

AddExperience.propTypes = {
addExperience: PropTypes.func.isRequired
}

export default connect(null,{addExperience})(withRouter(AddExperience));
