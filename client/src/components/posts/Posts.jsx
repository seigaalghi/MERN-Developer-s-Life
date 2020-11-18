import React, { Fragment, useEffect, useState } from 'react';
import { getPosts, cleanPosts, addPost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import ReactLoading from 'react-loading';

const Posts = ({ cleanPosts, getPosts, addPost, auth, post: { posts, loading } }) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  useEffect(() => {
    getPosts();
    return () => {
      cleanPosts();
    };
  }, [getPosts, cleanPosts]);

  const submitHandler = (e) => {
    e.preventDefault();
    addPost(formData);
  };

  if (loading === true || !posts) {
    return <ReactLoading type={'spinningBubbles'} color={'grey'} style={{ margin: '50px auto', width: '50px' }} />;
  } else if (!loading && posts) {
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community!
          </p>

          <div className='post-form'>
            <div className='bg-primary p'>
              <h3>Say Something...</h3>
            </div>
            <form className='form my-1' onSubmit={submitHandler}>
              <textarea name='text' cols='30' rows='5' placeholder='Create a post' required value={formData.text} onChange={(e) => setFormData({ text: e.target.value })}></textarea>
              <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
          </div>
          <PostsList posts={posts} auth={auth} />
        </section>
      </Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
  };
};

export default connect(mapStateToProps, { getPosts, addPost, cleanPosts })(Posts);
