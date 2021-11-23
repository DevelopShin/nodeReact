import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} 
from "react-router-dom";
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Footer from "./components/views/Footer/Footer"

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/" component={LandingPage}/>

          <Route path="/LoginPage">
            <LoginPage />
          </Route>
          <Route path="/RegisterPage">
            <RegisterPage />
          </Route>
          <Route path="/Footer">
            <NavBar />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
