import React, {Component, useState, useEffect} from 'react';
//import logo from './logo.svg';
// import './App.css';
// import AdminLanding from './Hostel_Admin_Landing/AdminLanding';
// import Postupdates from './Hostel_Admin_Landing/Postupdates';
import Navbar from './Student_Landing/navibar';
import SignUp from './Student_Landing/Auth/Auth';
// import MessAdminLanding from './Mess_Admin_Landing/AdminLanding';
import StudentLanding from '../Components/Student_Landing/StudentLanding';
// import MessPostupdates from './Mess_Admin_Landing/Postupdates';
import 'antd/dist/antd.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import * as actionType from '../constants/actionTypes';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link, useHistory, useLocation } from 'react-router-dom';



function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // const dispatch = useDispatch();
  // // const location = useLocation();
  // const history = useHistory();

  // const logout = () => {
  //   dispatch({ type: actionType.LOGOUT });

  //   history.push('/auth');

  //   setUser(null);
  // };

  // useEffect(() => {
  //   let token = user?.token;

  //   if (token) {
  //     const decodedToken = decode(token);
  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem('profile')));
  //   token = user?.token;
  //   if(!token){
  //     logout();
  //   }
  //       //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Router>
      <main>
          <Navbar/>
          <Switch>
            {/* <Route path = "/admin1" exact component = {MessAdminLanding}/>
            <Route path = "/admin1/Postupdates" exact component = {MessAdminLanding}/>
            <Route path = "/admin1/Feedback" exact component = {MessAdminLanding}/>

            <Route path = "/admin" exact component = {AdminLanding}/>
            <Route path = "/admin/Postupdates" exact component = {AdminLanding}/>
            <Route path = "/admin/Allotment" exact component = {AdminLanding}/> */}

            <Route path = "/" exact component = {StudentLanding}/>
            {/* <Route path = "/student/Messpage" exact component = {StudentLanding}/>
            {/* <Route path = "/student/post" exact component = {StudentLanding}/> */}
            {/* <Route path = "/student/display" exact component = {StudentLanding}/> */}
            {/* <Route path = "/student/payment" exact component = {StudentLanding}/>
            <Route path = "/student/complaints" exact component = {StudentLanding}/>
            <Route path = "/student/Outpass" exact component = {StudentLanding}/>  */}
            <Route path = "/auth" exact component = {SignUp}/>
            <Route path='/:url' component={() => {
              const zxc = window.location.pathname
              const xc = zxc.split("/")
              console.log(xc[2]);
              window.location.href = `http://localhost:5000/${xc[2]}`;
              }}/>            
    {/* <Route path = "/admin/Postupdates" exact component = {AdminLanding}/> */}
          </Switch>
        </main>
    </Router>
  );
}

export default App;