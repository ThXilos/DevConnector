import React,{Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getProfileById} from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
const Profile = ({
    match,
    getProfileById,
    profile:{
      
        profile, 
        loading
    },
    auth
}) => {
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);
   
    
    return (
        <div>
           <Fragment>
               {profile === null || loading 
               ? <Spinner /> 
               : <Fragment>
                   <Link to="/profiles" className="btn btn-light">
                   Back to Profiles
                   </Link>
                   {/*IMPORTANT Check if the user seeing this Profile is owner too. */}
                {
                auth.isAuthenticated 
                && auth.loading === false && auth.user._id === match.params.id
                && <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>
                }
                <div Name="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div>
                   <h2 className="text-primary">Experience</h2>
                   {profile.experience.length > 0 
                   ?(<Fragment>
                       {profile.experience.map(exp => {
                        <ProfileExperience key={profile._id} experience={exp} />
                       })}
                   </Fragment>)
                   :<h4>No experience credentials</h4>} 
                </div>
                </div>
               </Fragment>}
           </Fragment>
        </div>
    )
};

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
