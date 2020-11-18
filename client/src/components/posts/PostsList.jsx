import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { removeLike, addLike, removePost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PostsList = ({ posts, addLike, removeLike, removePost, auth: { loading, user } }) => {
  const postList = posts.map((post) => {
    return (
      <div className='post bg-white p-1 my-1' key={post._id}>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={post.avatar} alt='' />
            <h4>{post.name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
          <p className='post-date'>
            Posted on <Moment date={post.date} format='DD/MM/YYYY' />
          </p>
          <button type='button' className='btn btn-light' onClick={() => addLike(post._id)}>
            <i className='fas fa-thumbs-up'></i> {post.likes.length > 0 ? <span>{post.likes.length}</span> : null}
          </button>
          <button type='button' className='btn btn-light' onClick={() => removeLike(post._id)}>
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/post/${post._id}`} className='btn btn-primary'>
            Discussion {post.comment.length > 0 ? <span className='comment-count'>{post.comment.length}</span> : null}
          </Link>
          {!loading ? (
            post.user === user._id ? (
              <button type='button' className='btn btn-danger' onClick={() => removePost(post._id)}>
                <i className='fas fa-times'></i>
              </button>
            ) : null
          ) : null}
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className='posts'>{postList}</div>
    </Fragment>
  );
};

export default connect(null, { addLike, removeLike, removePost })(PostsList);
