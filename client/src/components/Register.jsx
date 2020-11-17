import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../redux/actions/alertActions';
import { register } from '../redux/actions/authActions';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input type='text' placeholder='Name' name='name' value={name} onChange={changeHandler} required />
          </div>
          <div className='form-group'>
            <input type='email' placeholder='Email Address' name='email' value={email} onChange={changeHandler} required />
            <small className='form-text'>This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
          </div>
          <div className='form-group'>
            <input type='password' placeholder='Password' name='password' minLength='6' onChange={changeHandler} value={password} />
          </div>
          <div className='form-group'>
            <input type='password' placeholder='Confirm Password' name='password2' minLength='6' onChange={changeHandler} value={password2} />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { setAlert, register })(Register);
