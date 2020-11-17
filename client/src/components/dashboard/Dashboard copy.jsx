import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, cleanProfile } from '../../redux/actions/profileAction';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Dashboard = ({ getCurrentProfile, cleanProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
    return () => {
      cleanProfile();
    };
  }, []);

  return loading && profile === null ? (
    <ReactLoading type={'spinningBubbles'} color={'grey'} style={{ margin: '50px auto', width: '50px' }} />
  ) : !loading && profile === null ? (
    <Fragment>
      <h1>You Have not Create a Profile</h1>
      <Link to='/create-profile' className='btn btn-primary'>
        Create Profile
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome {user && user.name}
        </p>
        <div className='dash-buttons'>
          <Link to='/create-profile' className='btn btn-light'>
            <i className='fas fa-user-circle text-primary'></i> Edit Profile
          </Link>
          <Link to='/add-experience' className='btn btn-light'>
            <i className='fab fa-black-tie text-primary'></i> Add Experience
          </Link>
          <Link to='/add-education' className='btn btn-light'>
            <i className='fas fa-graduation-cap text-primary'></i> Add Education
          </Link>
        </div>

        <h2 className='my-2'>Experience Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th className='hide-sm'>Title</th>
              <th className='hide-sm'>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {profile.experience.map((exp) => {
              return (
                <tr key={exp._id} className='heo'>
                  <td>{exp.company}</td>
                  <td className='hide-sm'>{exp.title}</td>
                  <td className='hide-sm'>
                    <Moment format='MMMM YYYY' date={exp.from} /> - <Moment format='MMMM YYYY' date={exp.to} />
                  </td>
                  <td>
                    <button className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2 className='my-2'>Education Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {profile.education.map((edu) => {
              return (
                <tr key={edu._id}>
                  <td>{edu.school}</td>
                  <td className='hide-sm'>{edu.degree}</td>
                  <td className='hide-sm'>
                    <Moment format='MMMM YYYY' date={edu.from} /> - <Moment format='MMMM YYYY' date={edu.to} />
                  </td>
                  <td>
                    <button className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className='my-2'>
          <button className='btn btn-danger'>
            <i className='fas fa-user-minus'></i>
            Delete My Account
          </button>
        </div>
      </section>
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

export default connect(mapStateToProps, { getCurrentProfile, cleanProfile })(Dashboard);
