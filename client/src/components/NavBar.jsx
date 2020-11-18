import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authActions';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profile'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i> <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/login' onClick={() => logout()}>
          <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profile'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> Developer's Life
          </Link>
        </h1>
        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(NavBar);
