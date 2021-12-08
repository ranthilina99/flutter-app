import './App.css';
import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from "./umesh/pages/register/register";
import {setToken} from "./setToken";
import store from "./Store";
import {LoadUser} from "./Actions/Authentication";
import {Provider} from "react-redux";
import Login from "./umesh/pages/login/login";
import About from "./umesh/about";
import Profile from "./umesh/pages/profile/profile";
import Forgot from "./umesh/pages/forgot/forgot";
import Reset from "./umesh/pages/reset/reset";
import ConfirmEmail from "./Actions/confirmEmail";
import Header from "./umesh/Header/header";
import Footer from "./umesh/footer/footer";
import adminAddEmployee from "./umesh/pages/admin/adminAddEmployee";
import getAllUser from "./umesh/pages/admin/getAllUser";
import addVehicleType from "./components/forms/AddVehicleType";
import addVehicle from "./components/forms/AddVehicle";
import EditVehicle from "./components/forms/EditVehicle";
import EditVehicleType from "./components/forms/EditVehicleType";
import getAllVehicle from "./components/views/getAllVehicle";
import ViewActiveVehicles from "./components/views/ViewActiveVehicles";
import ViewInactiveVehicles from "./components/views/ViewInactiveVehicles";
import ViewVehicle from "./components/views/ViewVehicle";
import ViewVehicleType from "./components/views/ViewVehicleType";
import Admin from "./umesh/admin";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}

function App() {

    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);

  return (
      <div className="App">
        <div>
            <Header/>
            <Provider store={store}>
          <Router>
            <section>
              <Switch>
                  <Route path="/" component={Login} exact/>
                  <Route path="/about" component={About} />
                  <Route path="/admin" component={Admin} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/forgot" component={Forgot} />
                  <Route path="/admin_add_user" component={adminAddEmployee} />
                  <Route path="/getAll" component={getAllUser} />
                  <Route path="/register" component={Register} />
                  <Route path="/users/reset_password/:id" component={Reset}/>
                  <Route path="/users/activate/:auth_token" component={ConfirmEmail}/>

                  <Route path="/addVehicle" component={addVehicle} />
                  <Route path="/getAllVehicle" component={getAllVehicle}  />
                  <Route path="/edit_vehicle/:id" component={EditVehicle}  />
                  <Route path="/active_vehicle" component={ViewActiveVehicles}  />
                  <Route path="/inactive_Vehicle" component={ViewInactiveVehicles}  />
                  <Route path="/addVehicleType" component={addVehicleType}  />
                  <Route path="/addVehicleType/:id" component={EditVehicleType}  />
                  <Route path="/view_Vehicle/:id" component={ViewVehicle}  />
                  <Route path="/view_VehicleType" component={ViewVehicleType}  />
              </Switch>
            </section>
          </Router>
            </Provider>
        </div>
    <Footer/>
      </div>
  );
}

export default App;
