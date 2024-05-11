import React from 'react';
import { LOGOUT_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import useRequireAuth from "../utils/useRequireAuth"; 

const Header = () => {
 const user = useRequireAuth();  
  const Navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  
  const handleSignOut = async () => {
  const Authtoken = user.token; 
     
     
  try {
    // Dont deleted commented below (below code is for server side validation)

    // const response = await fetch(LOGOUT_URL, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${Authtoken}`,  
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error("Logout failed");
    // }
    dispatch(removeUser(null)); 
    
    Navigate("/");
  } catch (error) {
    console.error("Logout failed:", error.message);
 
  }
}; 

  return ( 
    <nav className="fixed top-0 z-50 w-full bg-white">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">

            <div className="flex items-center justify-start rtl:justify-end">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
            </div>

            <div className="flex items-center">
                <div className="flex items-center ms-3"> 
                
                <div className="p-1 px-3 border-e-2 ">
              
                {user && ( <button onClick={handleSignOut}> <i className="bi bi-box-arrow-right"></i> </button> )}
                    </div>

                     
                    <div className="p-1 px-3 border-e-2">
                        
                       
                        <div id="dropdownNotification" className="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                                Notifications
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <div className="flex-shrink-0">
                                        <img className="rounded-full w-11 h-11" src="https://i.pravatar.cc/300" alt="Jese image" />
                                        <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                                            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                                <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                                            </svg>
                                        </div>
                                    </div>
                                     
                                </a>
                               
                            </div>
                            <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                <div className="inline-flex items-center ">
                                    <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                    </svg>
                                    View all
                                </div>
                            </a>
                        </div>
                    </div>

                    

                    <div className="px-3">
          

                <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdown-user" className="capitalize flex items-center text-md pe-1 font-medium text-1D4469 hover:text-blue-600 md:me-0 " type="button" fdprocessedid="7lar5b">
                        <span className="sr-only">Open user menu</span>
                        
                       
                        <img className="w-8 h-8 me-2 rounded-full" src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'  alt="user photo" /> 

                        <span className="authname"> {user?.name}</span>
                        
                </button>


            </div>
            

                    {/* Other elements */}
                </div>
            </div>
        </div>
    </div>
</nav>

  );
}

export default Header