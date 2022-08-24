import React,{Fragment,useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import InputField from '../input';

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormdata] = useState({
    email:'',
    password:'',
  });


  const { email,password } = formData;
  const onChange = e =>setFormdata({...formData, [e.target.name]: e.target.value });
  const onSubmit  = async e =>{
    e.preventDefault();
    login(email,password);
  }

  // redirect if logged in

  if(isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into your Account
      </p>
      <form className="form" onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <InputField
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e =>onChange(e)}
            required
            
          />

        </div>
        <div className="form-group">
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e =>onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
};

Login.propTypes = {
  Login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login }) (Login) ;