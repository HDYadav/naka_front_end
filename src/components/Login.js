import React, { useRef, useState } from 'react'
import { checkValidateData } from '../utils/validate'; 
import { LOGIN_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';  
import useRedirectIfLoggedIn from '../utils/useRedirectIfLoggedIn';
 
import logo from '../assets/images/logo.webp';
 

const Login = () => {

 
  //  useRedirectIfLoggedIn();

  //console.log("afsd");
    const dispatch = useDispatch();  
    const Navigate = useNavigate();     
    const email = useRef(null);
    const password = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null); 

  const handleButtomClick = async () => {

    const message = checkValidateData(
      email.current.value,
      password.current.value
    );

    setErrorMessage(message);
    if (message) return;  

    const formData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();   

      

      if (data.error) {
        let loginerr = document.getElementById("loginerror");
        loginerr.innerText = data.error;
        return; 
      }
      
      if (data.sucess === true)
      {
        dispatch(addUser(data?.data));
        Navigate("/dashboard");
      }
      
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }; 


  return (
    <div className="bg-slate-100 h-screen grid md:grid-cols-2 grid-cols-1 justify-items-center items-center place-content-center content-center px-5">
      <div className="flex place-content-center hidden sm:block">
        <div className=" w-full place-content-center px-5   ">
          <div className="text-sky-700 text-3xl text-center font-bold">
            Naka Job Portal Admin Login
          </div>
          <div className="pb-3 w-11/12 text-center ps-5">Lorem ipsum</div>
          <div className="grid justify-center"></div>
        </div>
      </div>

      <div className="w-full">
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] 2xl:w-3/5 lg:w-4/5 ssm:w-full container py-5 px-5 rounded-md">
          <div className="flex justify-center py-5">
              <img className="" src={logo} alt="logo" />
          </div>
          <div className="text-sky-700 text-3xl font-bold pb-5 px-5">
            Sign In
          </div>

          <div id="loginerror" className="text-center text-red-500"></div>

          <div className=" space-y-5 px-5">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col space-y-3"
              id="loginForm"
            >
              <label
                htmlFor="email"
                className="text-stone-300 text-base font-bold"
              >
                Email
              </label>
              <input
                ref={email}
                className="border-2 focus:outline-none focus:border-sky-700 w-full px-1"
                type="email"
                id="email"
                placeholder=""
              />
              <label
                htmlFor="password"
                className="text-stone-300 text-base font-bold"
              >
                Password
              </label>
              <input
                ref={password}
                className=" border-2 focus:outline-none focus:border-sky-700 w-full px-1"
                id="password"
                name="password"
                type="password"
                placeholder=""
              />
              {/* <a className="text-red-500">Forgot Password ?</a> */}
              {errorMessage && <p className="text-red-700">{errorMessage}</p>}
              <button
                onClick={handleButtomClick}
                type="submit"
                className="bg-sky-700 w-full text-white font-bold py-1 rounded-md"
              >
                Sign In
              </button>
            </form>

            <div className="text-center">
              Contrary to popular belief, Lorem Ipsum is not simply random text. 
              <a className="text-sky-700 font-bold">Terms of Use</a> and{" "}
              <a className="text-sky-700 font-bold">Privacy Policy.</a>
            </div>
            <div className="text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login