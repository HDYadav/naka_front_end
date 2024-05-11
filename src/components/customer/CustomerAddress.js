import React, { useReducer } from 'react'

const initialState = [{
  addressType: '',
  addressCity: '',
  city: '',
  addressPhone1: '',
  addresspointcont: '',
  addressState: '',
  addressPhone2: '',
  address: '',
  adressZipCode: '',
  addressPrimaryMail: '',
  addressCountry: '',
  addressSecondaryMail: ''
}];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return [...state, { ...initialState[0] }];
    case 'DELETE_ADDRESS':
      return state.filter((_, index) => index !== action.payload);
    case 'UPDATE_ADDRESS':
      return state.map((address, index) => {
        if (index === action.payload.index) {
          return { ...address, [action.payload.name]: action.payload.value };
        }
        return address;
      });
    default:
      return state;
  }
};

const CustomerAddress = () => {

  const [addresses, dispatch] = useReducer(reducer, initialState);

  const addAddress = () => {
    dispatch({ type: 'ADD_ADDRESS' });
  };

  const handleDeleteAddress = (index) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: index });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    dispatch({ type: 'UPDATE_ADDRESS', payload: { index, name, value } });
  };


  return (
    <>
        
         <div className='flex justify-between'>

           <h2 className="font-Vietnam text-2xl font-normal text-537596">Address</h2>
           <select className="form-select block appearance-none border border-BFBFBF rounded-[65px] text-383838 text-sm px-4 pr-8 leading-tight focus:outline-none" id="grid-stage">
            <option>Default</option>
            <option>Primary</option>
            <option>Legal Address</option>
            </select>

         </div>
    
        {addresses.map((address, index) => (



          <div key={index} className={`my-10 ${addresses.length > 1 && index !==0 && 'border-t-2 border-dotted border-BFBFBF' } `}>

          {addresses.length > 1 && index !==0 && ( 
            <div className='flex justify-end'>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteAddress(index)}>
                              <i className="bi bi-trash3 text-2xl"></i>
                        </button>
            </div>
          
          )}

              <div className={`grid grid-cols-3 gap-x-4  `}>
                <div>
                        <label className="block font-400 text-535252 text-lg  mb-2" htmlFor={`addressType-${index}`}>
                          Address Type
                        </label>
                        <select className="form-select block appearance-none w-full border border-BFBFBF text-535252 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  
                        id={`addressType-${index}`} 
                        name="addressType" 
                        value={address.addressType}
                        onChange={(e) => handleInputChange(index, e)}
                        >
                            <option>Group 1</option>
                            <option>Group 2</option>
                            <option>Group 3</option>
                        </select>
                </div>
                <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressCity-${index}`}>
                           City
                        </label>
                        <select className="form-select block appearance-none w-full border border-BFBFBF text-535252 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        name="addressCity"
                        id={`addressCity-${index}`} 
                        value={address.addressCity}
                        onChange={(e) => handleInputChange(index, e)}
                        >
                            <option>Group 1</option>
                            <option>Group 2</option>
                            <option>Group 3</option>
                        </select>
                </div>
                <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressPhone1-${index}`}>
                           Phone 1
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       type="text" 
                       name="addressPhone1"
                       id={`addressPhone1-${index}`} 
                       value={address.addressPhone1}
                       onChange={(e) => handleInputChange(index, e)}
                       />
                </div>
                <div>
                        <label className="block font-400 text-535252 text-lg  mb-2" htmlFor={`addresspointcont-${index}`}>
                          Point of Contact
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       type="text" 
                       id={`addresspointcont-${index}`} 
                       name="addresspointcont"
                       value={address.addresspointcont}
                       onChange={(e) => handleInputChange(index, e)}
                       />
                </div>
                <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressState-${index}`} >
                        State
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       type="text"
                       id={`addressState-${index}`} 
                       name="addressState"
                       value={address.addressState}
                       onChange={(e) => handleInputChange(index, e)}
                        />
                </div>
                <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressPhone2-${index}`}>
                           Phone 2
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       type="text" 
                       id={`addressPhone2-${index}`} 
                       name="addressPhone2"
                       value={address.addressPhone2}
                       onChange={(e) => handleInputChange(index, e)}
                      />
                </div>
                <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`address-${index}`}>
                           Address
                        </label>
                        <textarea rows="5" className="resize-y border border-BFBFBF w-full text-383838 p-1 px-3"
                         id={`address-${index}`} 
                         name="address"
                         value={address.address}
                         onChange={(e) => handleInputChange(index, e)}
                        ></textarea>
                </div>
                
                <div className="grid grid-cols-subgrid col-span-2">
                    <div>
                       <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`adressZipCode-${index}`}>
                        Zip Code
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       id={`adressZipCode-${index}`}
                       type="text"
                       name="adressZipCode"
                       value={address.adressZipCode}
                       onChange={(e) => handleInputChange(index, e)} 
                       />
                    </div>
                      
                    <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressPrimaryMail-${index}`}>
                        Primary Email
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       id={`addressPrimaryMail-${index}`}
                       type="text" 
                       name="addressPrimaryMail"
                       value={address.addressPrimaryMail}
                       onChange={(e) => handleInputChange(index, e)} 
                       />
                    </div>

                    <div>
                       <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressCountry-${index}`}>
                       Country
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       id={`addressCountry-${index}`} 
                       type="text" 
                       name="addressCountry"
                       value={address.addressCountry}
                       onChange={(e) => handleInputChange(index, e)} 
                       />
                    </div>
                      
                    <div>
                        <label className="block font-400 text-535252 text-lg mb-2" htmlFor={`addressSecondaryMail-${index}`} >
                        Secondary Email
                        </label>
                       <input className=" block w-full py-3 px-4 mb-3 text-383838 border border-BFBFB" 
                       id={`addressSecondaryMail-${index}`} 
                       type="text" 
                       name="addressSecondaryMail"
                       value={address.addressSecondaryMail}
                       onChange={(e) => handleInputChange(index, e)} 
                       />
                    </div>
                 
                </div>

            </div>

          </div>

           


        ))}
            <div className='mt-6 flex justify-between'>
                <button className='text-F16136 font-500 text-18' onClick={addAddress}> 
                    <i className="bi bi-plus text-F16136 text-md"></i> Add Address
                </button>

              <div className='space-x-4'>
                <button className='bg-F4F4F4 text-535252 border border-EAE2E2 font-500 text-18 py-2 px-4'>
                           CANCEL
                </button>

                <button className='bg-1D4469 text-white font-500 text-18 py-2 px-4'>
                         SAVE
                </button>
              </div>
             
                
            </div>
    
    
       </>
  )
}

export default CustomerAddress