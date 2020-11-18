import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { Fragment } from 'react';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import store from './redux/store';
import Alert from './components/Alert';
import { loadUser } from './redux/actions/authActions';
import React, { useEffect } from 'react';
import setAuthToken from './redux/utility/setAuthToken';
import './App.css';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import AddExperience from './components/AddExperience';
import AddEducation from './components/AddEducation';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route path='/' exact component={Home} />
          <section className='container'>
            <Alert className='alert' />
            <Switch>
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/create-profile' exact component={CreateProfile} />
              <PrivateRoute path='/edit-profile' exact component={EditProfile} />
              <PrivateRoute path='/add-experience' exact component={AddExperience} />
              <PrivateRoute path='/add-education' exact component={AddEducation} />
              <Route path='/profile' exact component={Profiles} />
              <Route path='/profile/:userId' exact component={Profile} />
              <PrivateRoute path='/posts' exact component={Posts} />
              <PrivateRoute path='/post/:postId' exact component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
