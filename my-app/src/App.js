import logo from './logo.svg';
import './App.css';
import { Box, Switch, } from '@mui/material';


import { BrowserRouter as Router, Route, } from 'react-router-dom'; // Import BrowserRouter

import { connect } from 'react-redux';
import Signin from './compontents/signin/Signin';
import Signup from './compontents/signup/Signup';
import NaveBar from './compontents/liabery/NaveBar';
import Apppublic from './compontents/appPublic/AppPublic';
import AppPrivit from './compontents/appPrivite/AppPrivit';
import { useEffect } from 'react';
import { loadProfile } from './store/action/authActiontype';
import Dashboard from './compontents/dashboard/Dashboard';
import { loadProducts } from './store/action/actionType/addproductAction';











function App({ isLogined, loadProfile, loadProducts }) {
  useEffect(() => {
    loadProfile()
    loadProducts()
  }, [])
  console.log("Consoleing Is Logined ", isLogined)
  return (
    <Box height={"100%"}>
      <NaveBar />
     
      {
        !isLogined ?
          <Apppublic /> :
          <AppPrivit />

      }
  
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    isLogined: state.auth.isLogined,
  };
};
export default connect(mapStateToProps, { loadProfile, loadProducts })(App);
