import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import EditProfile from "./components/profile-form/EditProfile";
import Login from "./components/auth/Login";
import Alert from "./components/layout/alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profile-form/Profiles";
import Profile from "./components/profile/Profile";

import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser} from "./actions/auth";

if (localStorage.token){
    setAuthToken(localStorage.token);
}

function App(){
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

 return(
     <Provider store={store}>
         <Router>
    <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
        <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
                <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
                <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
            </Switch>
        </section>
    </>
  </Router>
     </Provider>
  

 )
};


export default App;