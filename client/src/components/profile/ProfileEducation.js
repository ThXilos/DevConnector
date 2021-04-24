import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";

const ProfileEducation = ({education: {
    school,degree,fieldofstudy,current,to,from}

}) => 
    
    
    <Fragment>
          
          <h3 className="text-dark">{school}</h3>
           <p>
           <Moment format="DD/MM/YYYY">{from}</Moment>{current 
           ? " until today" 
           : <span> to <Moment format="DD/MM/YYYY">{to}</Moment></span>}
           </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p>
              <strong>Field of study: </strong>{fieldofstudy}
            </p>
            <div></div>
    </Fragment>
        

ProfileEducation.propTypes = {
education: PropTypes.object.isRequired
}

export default ProfileEducation

