import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addEducation } from '../redux/actions/profileAction';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
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
    addEducation(formData, history);
  };

  return (
    <div>
      <section className='container'>
        <h1 className='large text-primary'>Add Your Education</h1>
        <p className='lead'>
          <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that you have attended
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input type='text' placeholder='* School or Bootcamp' name='school' required value={formData.school} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <input type='text' placeholder='* Degree or Certificate' name='degree' required value={formData.degree} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Field Of Study' name='fieldofstudy' value={formData.fieldofstudy} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input type='date' name='from' value={formData.from} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <p>
              <input type='checkbox' name='current' value='' value={formData.current} onChange={() => setFormData((prevState) => ({ ...formData, current: !prevState.current }))} /> Current School or
              Bootcamp
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' value={formData.to} onChange={changeHandler} />
          </div>
          <div className='form-group'>
            <textarea name='description' cols='30' rows='5' placeholder='Program Description' value={formData.description} onChange={changeHandler}></textarea>
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

export default connect(null, { addEducation })(withRouter(AddEducation));
