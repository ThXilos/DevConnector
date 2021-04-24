import React,{Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getProfileById} from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
const Profile = ({ match, getProfileById, profile:{ profile, loading},auth}) => {
    
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);
   
return(
       <div>
     
   
        <div>
           <Fragment>
               {profile === null || loading 
               ? <Spinner /> 
               : <Fragment>
                   <Link to="/profiles" className="btn btn-light">
                   Back to Profiles
                   </Link> 
                {
                auth.isAuthenticated 
                && auth.loading === false && auth.user._id === profile.user._id
                && <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>
                }
                <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
              
                
                <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 
                ? (<Fragment>
                    {profile.experience.map(exp =>(
                    <ProfileExperience 
                     key={exp._id} 
                     experience={exp} />))}
                </Fragment>)
                :<h1>No Experience added.</h1>}
                </div>

                <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 
                ? (<Fragment>
                    {profile.education.map(edu =>(
                    <ProfileEducation 
                     key={edu._id} 
                     education={edu} />))}
                </Fragment>)
                :<h1>No Education added.</h1>}
                </div>

                <div className="profile-git bg-white p-2">
                <h2 className="text-primary">Github Repos</h2>
                <ProfileGithub />
                </div>
             
                </div>
               </Fragment>}
               </Fragment>
          
        </div>
     

       </div> 
    )
}
    
   

Profile.propTypes = {
getProfileById: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
profile: state.profile,
auth: state.auth
})



export default connect(mapStateToProps,{ getProfileById})(Profile);
