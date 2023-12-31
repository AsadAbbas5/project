import logo from './logo.svg';
import './App.css';
import { Box, Switch,  } from '@mui/material';


import { BrowserRouter as Router, Route, } from 'react-router-dom'; // Import BrowserRouter

import { connect } from 'react-redux';
import Signin from './compontents/signin/Signin';
import Signup from './compontents/signup/Signup';
import NaveBar from './compontents/liabery/NaveBar';
import Footer from './compontents/footer/Footer';
import AppPublic from './compontents/appPublic/AppPublic';
import AppPrivit from './compontents/appPrivite/AppPrivit';

function App({ isLogined }) {
  return (
    <div>
      <NaveBar />
        <Signin/>
      <Footer />

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogined: state.auth.isLogined,
  };
};

export default connect(mapStateToProps)(App);
