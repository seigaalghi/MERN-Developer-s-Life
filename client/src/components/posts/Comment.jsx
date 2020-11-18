import React from 'react';
import Moment from 'react-moment';
import { removeComment } from '../../redux/actions/postActions';
import { connect } from 'react-redux';

const Comment = ({ comments, auth: { loading, user }, postId, removeComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div className='comments' key={comment._id}>
          <div className='post bg-white p-1 my-1'>
            <div>
              <a href='profile.html'>
                <img className='round-img' src={comment.avatar} alt='' />
                <h4>{comment.name}</h4>
              </a>
            </div>
            <div>
              <p className='my-1'>{comment.text}</p>
              <p className='post-date'>
                Posted on <Moment date={comment.date} format='DD/MM/YYYY - HH:mm' />
                {'  '}
                {loading ? null : comment.user === user._id ? (
                  <button type='button' className='btn btn-danger' onClick={() => removeComment(postId, comment._id)}>
                    <i className='fas fa-times'></i>
                  </button>
                ) : (
                  ''
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(null, { removeComment })(Comment);
