
import { useState, useRef, useEffect } from "react";
import {NavLink} from 'react-router-dom';
import classes from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors} from '../actions/userAction';
import { useHistory } from 'react-router-dom';

const Login = () => {

    console.log("Login Page");

    const history = useHistory();

    const[errorMessage, setErrorMessage] = useState('');
    const[loginError, setLoginError] = useState(false);
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const [isLoginClicked, setLoginClicked] = useState(false);

    const dispatch = useDispatch();
    const {isAuthenticated, error, loading } = useSelector( state => state.auth)

    useEffect(() => {
        console.log("Use Effect Login");

        if(isAuthenticated && isLoginClicked ){
            console.log("Logged in Sucessfull");
            console.log("Switching to Home with Products");
            history.push('/home');
        }
        if(error)
        {
            console.log("Error While Login");
            console.log(error.errMessage.slice(0,30));
            setLoginError(true);
            setErrorMessage(error.errMessage.slice(0,100));

            dispatch(clearErrors());
        }
    },[ dispatch, isAuthenticated, error, history ])

    const submitHandler = (event) =>{
        event.preventDefault();
        setLoginClicked(true);

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const LOGIN_DATA = {
            name: enteredEmail,
            email: enteredPassword
        }
        console.log('Login Data:');
        console.log(LOGIN_DATA);
        
        dispatch(login(enteredEmail,enteredPassword));
    }

    return (
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
                
                <h1>Login</h1>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' ref={emailRef} required id='email' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' ref={passwordRef} required id='password' />
                </div>
                <NavLink to='/signup'>Do not have Account? Signup</NavLink>
                {!loginError ? <p></p> : <p className={classes.authTrue}>{errorMessage}</p>}
                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
        </div> 
    );
};

export default Login;