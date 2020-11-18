import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById, getGithubRepos, cleanProfile } from '../redux/actions/profileAction';
import ReactLoading from 'react-loading';
import Moment from 'react-moment';

const Profile = ({ profile, loading, repos, getGithubRepos, cleanProfile, getProfileById, auth }) => {
  const params = useParams();
  useEffect(() => {
    getProfileById(params.userId);

    return () => {
      cleanProfile();
    };
  }, [getProfileById, cleanProfile, params.userId]);

  useEffect(() => {
    if (!loading && profile !== null) {
      getGithubRepos(profile.githubusername);
    }
  }, [getGithubRepos, loading, profile]);
  return (
    <Fragment>
      <h2>Developer's Profile</h2>
      {loading || !profile ? (
        <ReactLoading type={'spinningBubbles'} color={'grey'} style={{ margin: '50px auto', width: '50px' }} />
      ) : (
        <section className='container'>
          <Link to='/profile' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated === true && auth.loading === false && auth.user._id === profile.user._id ? (
            <Link to='/edit-profile' className='btn btn-light'>
              Edit My Profile
            </Link>
          ) : null}

          <div className='profile-grid my-1'>
            {/* <!-- Top --> */}
            <div className='profile-top bg-primary p-2'>
              <img className='round-img my-1' src={profile.user.avatar} alt='' />
              <h1 className='large'>{profile.user.name}</h1>
              <p className='lead'>
                {profile.status} at {profile.company}
              </p>
              <p>{profile.location}</p>
              <div className='icons my-1'>
                <a href={`${profile.social ? (profile.social.facebook ? profile.social.facebook : '') : ''}`} target='_blank' rel='noopener noreferrer'>
                  <i className='fas fa-globe fa-2x'></i>
                </a>
                <a href={profile.social ? (profile.social.twitter ? profile.social.twitter : '') : ''} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-twitter fa-2x'></i>
                </a>
                <a href={profile.social ? (profile.social.facebook ? profile.social.facebook : '') : ''} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-facebook fa-2x'></i>
                </a>
                <a href={profile.social ? (profile.social.linkedin ? profile.social.linkedin : '') : ''} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-linkedin fa-2x'></i>
                </a>
                <a href={profile.social ? (profile.social.youtube ? profile.social.youtube : '') : ''} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-youtube fa-2x'></i>
                </a>
                <a href={profile.social ? (profile.social.instagram ? profile.social.instagram : '') : ''} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-instagram fa-2x'></i>
                </a>
              </div>
            </div>

            {/* <!-- About --> */}
            <div className='profile-about bg-light p-2'>
              <h2 className='text-primary'>{profile.user.name}'s Bio</h2>
              <p>{profile.bio}</p>
              <div className='line'></div>
              <h2 className='text-primary'>Skill Set</h2>
              <div className='skills'>
                {profile.skills.map((skill, index) => (
                  <div className='p-1' key={index}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* <!-- Experience --> */}
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((exp) => (
                  <div key={exp._id}>
                    <h3 className='text-dark'>{exp.company}</h3>
                    <p>
                      <Moment format='MMMM YYYY' date={exp.from} /> - {exp.to ? <Moment format='MMMM YYYY' date={exp.to} /> : 'Now'}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {exp.title}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <h3>This developer hasn't write any experience yet</h3>
              )}
            </div>

            {/* <!-- Education --> */}
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((edu) => (
                  <div key={edu._id}>
                    <h3>{edu.school}</h3>
                    <p>
                      <Moment format='MMMM YYYY' date={edu.from} /> - {edu.to ? <Moment format='MMMM YYYY' date={edu.to} /> : 'Now'}
                    </p>
                    <p>
                      <strong>Degree: </strong>
                      {edu.degree}
                    </p>
                    <p>
                      <strong>Field Of Study: </strong>
                      {edu.fieldofstudy}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {edu.description}
                    </p>
                  </div>
                ))
              ) : (
                <h3>This developer hasn't write any education yet</h3>
              )}
            </div>

            {/* <!-- Github --> */}

            <div className='profile-github'>
              <h2 className='text-primary my-1'>
                <i className='fab fa-github'></i> Github Repos
              </h2>
              {!profile.githubusername ? (
                <h3>This developer hasn't inserted any GitHub Username yet</h3>
              ) : repos.length > 0 ? (
                repos.map((rep) => (
                  <div className='repo bg-white p-1 my-1' key={rep.id}>
                    <div>
                      <h4>
                        <a href={rep.html_url} target='_blank' rel='noopener noreferrer'>
                          {rep.name}
                        </a>
                      </h4>
                      <p>{rep.description}</p>
                    </div>
                    <div>
                      <ul>
                        <li className='badge badge-primary'>Stars: {rep.stargazers_count}</li>
                        <li className='badge badge-dark'>Watchers: {rep.watchers_count}</li>
                        <li className='badge badge-light'>Forks: {rep.forks}</li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <h3>This developer hasn't create any GitHub repository yet</h3>
              )}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    loading: state.profile.loading,
    repos: state.profile.repos,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getProfileById, getGithubRepos, cleanProfile })(Profile);
