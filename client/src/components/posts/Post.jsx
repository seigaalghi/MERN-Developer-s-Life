import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPost, addComment, cleanPosts } from '../../redux/actions/postActions';
import { useParams, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Comment from './Comment';

const Post = ({ getPost, post: { post, loading }, addComment, auth, cleanPosts }) => {
  const [formData, setFormData] = useState({
    text: '',
  });
  const params = useParams();
  useEffect(() => {
    getPost(params.postId);
    return () => {
      cleanPosts();
    };
  }, [getPost, cleanPosts, params]);

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(formData, params.postId);
  };

  return loading || !post ? (
    <ReactLoading type={'spinningBubbles'} color={'grey'} style={{ margin: '50px auto', width: '50px' }} />
  ) : (
    <Fragment>
      <section className='container'>
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <div className='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img className='round-img' src={post.avatar} alt='' />
              <h4>{post.name}</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>{post.text}</p>
          </div>
        </div>

        <div className='post-form'>
          <div className='bg-primary p'>
            <h3>Leave A Comment</h3>
          </div>
          <form className='form my-1' onSubmit={submitHandler}>
            <textarea name='text' cols='30' rows='5' placeholder='Comment on this post' required value={formData.text} onChange={(e) => setFormData({ text: e.target.value })}></textarea>
            <input type='submit' className='btn btn-dark my-1' value='Submit' />
          </form>
        </div>
      </section>
      {post.comment.length > 0 ? <Comment comments={post.comment} auth={auth} /> : <h3>No Comments yet</h3>}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getPost, addComment, cleanPosts })(Post);
