import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./views/pages/layout/Navbar";
import Landing from "./views/pages/layout/Landing";
//auth
import Login from "./views/pages/auth/login";
import Register from "./views/pages/auth/register";
import Alert from "./views/pages/layout/Alert";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./views/pages/dashboard/dashboard";
import ProfileForm from "./views/pages/profile-forms/ProfileForm";
import Profiles from "./views/pages/profiles/Profiles";
import Profile from "./views/pages/profile/profile";
import Posts from "./views/pages/posts/posts";
import EditProfile from "./views/pages/profile-forms/editProfile";
import AddExperience from "./views/pages/profile-forms/AddExperience";
import AddEducation from "./views/pages/profile-forms/AddEducation";
import PrivateRoute from "./routing/PrivateRoute";
import Post from "./views/pages/Post/Post";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={ProfileForm}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />

              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
