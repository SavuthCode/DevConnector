import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import { Fragment } from 'react';

const Navbar = ({auth:{isAuthenticated,loading} , logout  }) => {

  const authLinks = (
    <ul>
       <li>
        <Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Post
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
        <i className="fas fa-user"></i> Dashboard
        </Link>
      </li>
      <li>
        <a onClick={logout}><i className="fas fa-code"></i> Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
        <Link to="/profiles" >DevConnector</Link>
        <Link to="/register"><i className="fas fa-code"></i> Register</Link>
        <Link to="/login"><i className="fas fa-code"></i> Login</Link>
        </ul>
  );

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
        { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks }</Fragment>)}
      </nav>
    </div>
  )}

  Navbar.propTypes = {
    logout:PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
  };

  const mapStateToProps = state =>({
    auth: state.auth
  });
export default connect(mapStateToProps,{ logout }) (Navbar);