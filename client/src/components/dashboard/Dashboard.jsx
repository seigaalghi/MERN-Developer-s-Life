import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, cleanProfile, deleteAccount } from '../../redux/actions/profileAction';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from '../Experience';
import Education from '../Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, cleanProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
    return () => {
      cleanProfile();
    };
  }, []);

  return loading && profile === null ? (
    <ReactLoading type={'spinningBubbles'} color={'grey'} style={{ margin: '50px auto', width: '50px' }} />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile === null ? (
        <Fragment>
          <h1>You Have not Create a Profile</h1>
          <Link to='/create-profile' className='btn btn-primary'>
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
          {profile.experience ? <Experience experience={profile.experience} /> : null}
          {profile.education ? <Education education={profile.education} /> : null}
        </Fragment>
      )}

      <div className='my-2'>
        <button className='btn btn-danger' onClick={() => deleteAccount()}>
          <i className='fas fa-user-minus'></i> Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getCurrentProfile, cleanProfile, deleteAccount })(Dashboard);
