import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../redux/actions/profileAction';

const CreateProfile = ({ profile, createProfile, history, getCurrentProfile }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfile();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({ ...profile, ...profile.social, skills: typeof profile.skills == 'object' ? profile.skills.join(',') : null });
    }
  }, [profile]);

  const submitHandler = async (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [displaySocial, setDisplaySocial] = useState(false);

  return (
    <div>
      <section className='container'>
        <h1 className='large text-primary'>Create Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make your profile stand out
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <select name='status' value={formData.status} onChange={changeHandler}>
              <option value='0'>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>Give us an idea of where you are at in your career</small>
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Company' name='company' value={formData.company} onChange={changeHandler} />
            <small className='form-text'>Could be your own company or one you work for</small>
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Website' name='website' value={formData.website} onChange={changeHandler} />
            <small className='form-text'>Could be your own or a company website</small>
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Location' name='location' value={formData.location} onChange={changeHandler} />
            <small className='form-text'>City & state suggested (eg. Boston, MA)</small>
          </div>
          <div className='form-group'>
            <input type='text' placeholder='* Skills' name='skills' value={formData.skills} onChange={changeHandler} />
            <small className='form-text'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Github Username' name='githubusername' value={formData.githubusername} onChange={changeHandler} />
            <small className='form-text'>If you want your latest repos and a Github link, include your username</small>
          </div>
          <div className='form-group'>
            <textarea placeholder='A short bio of yourself' name='bio' value={formData.bio} onChange={changeHandler}></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <div className='my-2'>
            <button type='button' className='btn btn-light' onClick={() => setDisplaySocial(!displaySocial)}>
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {displaySocial ? (
            <Fragment>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input type='text' placeholder='Twitter URL' name='twitter' value={formData.twitter} onChange={changeHandler} />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input type='text' placeholder='Facebook URL' name='facebook' value={formData.facebook} onChange={changeHandler} />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input type='text' placeholder='YouTube URL' name='youtube' value={formData.youtube} onChange={changeHandler} />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input type='text' placeholder='Linkedin URL' name='linkedin' value={formData.linkedin} onChange={changeHandler} />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input type='text' placeholder='Instagram URL' name='instagram' value={formData.instagram} onChange={changeHandler} />
              </div>
            </Fragment>
          ) : null}

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));
