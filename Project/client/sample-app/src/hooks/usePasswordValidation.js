import { useState, useEffect } from "react";

export const usePasswordValidation = ({ firstPassword = "", secondPassword = "" }) => {
const [validLength, setValidLength] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [isPasswordOk, setPasswordOk] = useState(null);
const [match, setMatch] = useState(null);

//const [hasNumber, setHasNumber] = useState(null);
//const [specialChar, setSpecialChar] = useState(null);

  
  useEffect(() => {

    setValidLength(firstPassword.length >= 8 ? true : false);
    setUpperCase(firstPassword.toLowerCase() !== firstPassword);
    setLowerCase(firstPassword.toUpperCase() !== firstPassword);
    //setHasNumber(/\d/.test(firstPassword));

    if(firstPassword.length > 8 && (firstPassword.toLowerCase() !== firstPassword) && (firstPassword.toUpperCase() !== firstPassword)) {
      setPasswordOk(true);
    }
    else{
      setPasswordOk(false);
    }

    if(firstPassword.length > 8  && (firstPassword === secondPassword)) {
      setMatch(true);
    }
    else {
      setMatch(false);
    }

  }, [firstPassword, secondPassword]);


  return [validLength, upperCase, lowerCase, isPasswordOk, match];
}

