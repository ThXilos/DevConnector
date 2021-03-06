import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({education, deleteEducation}) => {
    const allEducation = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
            {/* Moment formats dates to render better. */}
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
                    edu.to === null 
                    ? (" Now ") 
                    : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)
                }
            </td>
            <td>
                <button onClick = {() => deleteEducation(edu._id) } className="btn btn-danger">Delete</button>
            </td>
            
        </tr>
    ));
         
    return (
        <div>
            <Fragment>
                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                        </tr>
                    </thead>
                    <tbody>{allEducation}</tbody>
                </table>
            </Fragment>

        </div>
    )
}
Education.propTypes = {
education: PropTypes.array.isRequired,
deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
