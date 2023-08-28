import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import formatDate from '../../utils/formatDate';
import { deleteEducation } from "../../../actions/profile";
import Moment from "react-moment";

const Education = ({ eduction, deleteEducation }) => {
  const eductions = eduction.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.fieldofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to == null ? "now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
      </td>

      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Eduction Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">School</th>
            <th className="hide-sm">Degree</th>
            <th className="">Field Of Study</th>
            <th className="">Year of study</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{eductions}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  eduction: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
