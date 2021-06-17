
import axios from 'axios';


import { useState, useRef, useEffect } from "react";
import {NavLink} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, clearErrors} from '../actions/userAction';

function MainNavigation() {

  const history = useHistory();

  const [enable, setEnable] = useState(false);

  const {isAuthenticated, error, loading } = useSelector( state => state.auth)

  useEffect(() => {
    if(isAuthenticated){
      console.log('Login Sucessfull, Navigation change');
      setEnable(true);
    }
    else {
      setEnable(false);
    }
  },[isAuthenticated])

  async function logoutHandler () {
    try{
        console.log("Logout Event");
        const response = await axios.get('/logout')
        console.log(response);
        history.push('/welcome');
        setEnable(false);

        // console.log(data.sucess);
        // console.log(data.count);

      } catch (error) {
        console.log(error);
      }
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>SHOPPING</div>
      <nav>
        <ul>
          <li>
            {!enable ? <NavLink activeClassName={classes.active} to='/Login'>Login</NavLink> : <button className={classes.logoutButton} onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
