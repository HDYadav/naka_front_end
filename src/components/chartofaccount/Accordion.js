//import React, { useState } from 'react';

const AssetAccordian = (props) => {   
  
    return (
            <div className="mb-3 bg-white"> 
                <button className={`w-full p-4 text-left hover:transition  border border-1 border-solid border-545F65 ${props.isOpen ?  
                                    'bg-F1F6F9 border-t-0 border-l-0 border-r-0' : ''}  
                                    duration-300`}
                    onClick={props.toggleAccordion}> 
                    {props.title} 
                                  <svg data-accordion-icon="" className={`w-3 h-3 shrink-0 float-right transform ${props.isOpen ?  
                                    'rotate-0' : 'rotate-180'}  
                                    transition-transform duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"></path>
                                    </svg>
                     
                </button> 
                {props.isOpen && ( 
                    <div className="p-4 bg-white"> 
                        {props.data} 
                    </div> 
                )} 
            </div>
        );
};

export default AssetAccordian;