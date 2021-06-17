
import { useRef, useEffect, useState } from "react";
//import { usePasswordValidation } from "../hooks/usePasswordValidation";
import classes from './SignUp.module.css';

//import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors} from '../actions/userAction';
import { useHistory } from 'react-router-dom';

const SignUp = () => {

    console.log("Signup Page");

    const[passwordError, setPasswordError] = useState(false);
    const[passwordConfirmError, serPasswordConfirmError] = useState(false);
    const[signupError, setSignupError] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const [isSignupClicked, setSignupClicked] = useState(false);

    const history = useHistory();
    const nameRef = useRef();
    const emailRef = useRef();
    const numberRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const dispatch = useDispatch();
    const {isAuthenticated, error, loading } = useSelector( state => state.auth);

    useEffect(() => {
        console.log('Use Effect Signup');

        if(isAuthenticated && isSignupClicked){
            console.log("Registration Sucessfull");
            history.push('/home');
        }
        if(error)
        {
            console.log("Error While Registering");
            console.log(error.errMessage.slice(0,30));
            setSignupError(true);
            setErrorMessage(error.errMessage.slice(0,100));
            dispatch(clearErrors());
        }
    },[ dispatch, isAuthenticated, error, history ])

    // const [password, setPassword] = useState(
    //     {
    //     firstPassword: "",
    //     secondPassword: "",
    //     }
    // );
  
    // const [validLength, upperCase, lowerCase, isPasswordOk, match] = usePasswordValidation(
    //     {
    //         firstPassword: password.firstPassword,
    //         secondPassword: password.secondPassword,
    //     }
    // );

    const setFirst = (event) => {
        const tempPass = passwordRef.current.value;

        if(tempPass.length>=8 && 
            (tempPass.toLowerCase() !== tempPass) &&
            (tempPass.toUpperCase() !== tempPass) )
        {
            console.log("Password Criteria Matched");
            setPasswordError(false);
        }
        else{
            console.log("Password: Min Length: 8, One Uppercase, One Lowercase");
            setPasswordError(true);
        }
        //console.log(passwordRef.current.value);

    };

    const setSecond = (event) => {
        //console.log(confirmPasswordRef.current.value);
        serPasswordConfirmError(false);
    }

    // const setSecond = (event) => {
    // setPassword({ ...password, secondPassword: event.target.value });
    // };

    const submitHandler = (event) =>{
        event.preventDefault();
        setSignupClicked(true);

        const enteredName = nameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredNumber = numberRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        const SIGNUP_DATA = {
            name: enteredName,
            email: enteredEmail,
            number: enteredNumber,
            password: enteredPassword
        }
        
        console.log(SIGNUP_DATA);

        if( (enteredPassword.length>=8) 
            && (enteredPassword.toLowerCase() !== enteredPassword)
            && (enteredPassword.toUpperCase() !== enteredPassword) )
        {
            if(enteredPassword !== enteredConfirmPassword) {
                serPasswordConfirmError(true);
            }
            else{
                console.log('Can Signup By:');
     
                dispatch(register(SIGNUP_DATA));

            }
        }
        else {
            console.log('can not signup');
        }
    }

    return (
        <div>        
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>Signup</h1>
                <div className={classes.control}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' ref={nameRef} required id='Name' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='number'>Phone Number</label>
                    <input type='text' ref={numberRef} required id='number' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' ref={emailRef} required id='email' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' ref={passwordRef} required id='password' onChange={setFirst}/>
                    {!passwordError ? <p> </p> : <span className={classes.passCriteria}>*Password: Minimum 8 character Long, One Uppercase Letter and One Lowecase Letter.</span>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' ref={confirmPasswordRef} required id='confirmPassword' onChange={setSecond}/>
                    {!passwordConfirmError ? <p></p> : <span className={classes.passCriteria}>Confirm Password Not Matched.</span>}
                    {!signupError ? <p></p> : <span className={classes.passCriteria}>{errorMessage}</span> }
                </div>
                <div className={classes.actions}>
                    <button>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;