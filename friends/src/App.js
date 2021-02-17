// import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Friends from './components/Friends';
import {axiosWithAuth} from './utils/axiosWithAuth';
import './App.css';
// import axios from 'axios';

function App() {
    const { loggedIn, setLoggedIn } = useState(false)

    const loggedOut = () => {
      axiosWithAuth()
      .post('/logout')
      .then(request => {
        localStorage.removeItem('token')
        setLoggedIn(false)
      })
      .catch(error => console.log(error))
    }
  return (
    <Router>
      <div className='App'>
        <ol>
          {(!loggedIn) ? (<li><Link to='/login'>Login</Link></li>) : (<p></p>)}
        
        <li><Link to='#' onClick={loggedOut}>Logout</Link></li>
        {(loggedIn) ? (<li><Link to='/protected'>Protected page</Link></li>) : (<p></p>)}
        </ol>

        <Switch>
          <PrivateRoute exactpath='/protected' component={Friends} />
          <Route path='/login' render={(props) => {
            return <Login {...props} setLoggedIn={setLoggedIn} />
          }} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
