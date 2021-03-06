import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";

const ProfileExperience = ({experience: {
    title,company,description,to,current,from}

}) => 
    
    
    <Fragment>
          
          <h3 className="text-dark">{company}</h3>
           <p>
           <Moment format="DD/MM/YYYY">{from}</Moment>{current 
           ? " until today" 
           : <span> to <Moment format="DD/MM/YYYY">{to}</Moment></span>}
           </p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
            <div></div>
    </Fragment>
        
    
    


ProfileExperience.propTypes = {
experience: PropTypes.object.isRequired
}

export default ProfileExperience

