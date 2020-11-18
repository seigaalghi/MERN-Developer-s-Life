import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfiles, cleanProfile } from '../redux/actions/profileAction';
import ProfileList from './ProfileList';
import ReactLoading from 'react-loading';

const Profiles = ({ getProfiles, cleanProfile, profiles, loading }) => {
  useEffect(() => {
    getProfiles();
    return () => {
      cleanProfile();
    };
  }, [getProfiles, cleanProfile]);
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with developers
        </p>
      </section>
      {loading ? (
        <ReactLoading type={'spinningBubbles'} color={'grey'} style={{ margin: '50px auto', width: '50px' }} />
      ) : profiles.length > 0 ? (
        <ProfileList profiles={profiles} />
      ) : (
        <h3>No profiles found</h3>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profiles: state.profile.profiles,
    loading: state.profile.loading,
  };
};

export default connect(mapStateToProps, { getProfiles, cleanProfile })(Profiles);
