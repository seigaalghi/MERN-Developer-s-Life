import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../redux/actions/profileAction';
import { Link, withRouter } from 'react-router-dom';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div>
      <section className='container'>
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input type='text' placeholder='* Job Title' name='title' required value={formData.title} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <input type='text' placeholder='* Company' name='company' required value={formData.company} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Location' name='location' value={formData.location} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input type='date' name='from' value={formData.from} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <p>
              <input type='checkbox' name='current' value={formData.current} onChange={() => setFormData((prevState) => ({ ...formData, current: !prevState.current }))} /> Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' value={formData.to} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <textarea name='description' cols='30' rows='5' placeholder='Job Description' value={formData.description} onChange={changeHandler}></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default connect(null, { addExperience })(withRouter(AddExperience));
