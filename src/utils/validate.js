
export const checkValidateData = (email, password) => {

// const isNameValid = /^[a-zA-Z ]+$/.test(name);
    const isEmailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  ///const isPasswordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  
  const isPasswordValidate =/^.{1,}$/.test(password);
    
  //  if (!isNameValid) return "Name is not valid";
    if (!isEmailValidate) return "Email is not valid";    
    if (!isPasswordValidate) return "password is not valid";

    return null;
};


 




  
