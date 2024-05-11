import React, { useReducer  } from 'react'
import SaveIcon from '../Icons/SaveIcon';


const initialState = {
  pointerStyle: 0,
  socialMembers: [{ socialTitle: '', socialLink: '',socialChecked: true }],
  textareaIndex: null,
  textareaHeight: 'auto'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TEAM_MEMBER':
      if (state.pointerStyle !== 0) {
        return {
          ...state,
          socialMembers: [...state.socialMembers, { socialTitle: '', socialLink: '',socialChecked: true }],
          pointerStyle: 0
        };
      }
      return state;
    case 'INPUT_CHANGE':
      const { index, name, value } = action.payload;
      const newSocialMembers = [...state.socialMembers];
      newSocialMembers[index][name] = value;
      return { ...state, socialMembers: newSocialMembers };
    case 'SAVE':
      return { ...state, pointerStyle: 1 };
    case 'ADD_TEAM_CHECK':
      const { indexno, socialChecked } = action.payload;
      const NewSocialMembers = [...state.socialMembers];
      NewSocialMembers[indexno].socialChecked = socialChecked;
      return { ...state, socialMembers: NewSocialMembers };
    case 'SET_TEXTAREA_INDEX':
      return { ...state, textareaIndex: action.payload };
    case 'SET_TEXTAREA_HEIGHT':
      return { ...state, textareaHeight: action.payload };
    default:
      return state;
  }
};

const CustomerServices = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { pointerStyle, socialMembers, textareaIndex, textareaHeight } = state;

  const addTeamMember = () => {
    dispatch({ type: 'ADD_TEAM_MEMBER' });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    dispatch({ type: 'INPUT_CHANGE', payload: { index, name, value } });
    dispatch({ type: 'SET_TEXTAREA_HEIGHT', payload: `${event.target.scrollHeight}px` });
  };

  const handleSave = () => {
    dispatch({ type: 'SAVE' });
  };

  const addteamcheck = (event, indexno) => {
    dispatch({ type: 'ADD_TEAM_CHECK', payload: { indexno, socialChecked: event.target.checked } });
  };



  return (
   <>

<div className="flex justify-between">
        <h2 className="font-Vietnam text-2xl font-normal text-537596 mb-5">Services</h2>
        <button className={` bg-transparent text-lg font-medium py-2 px-4 ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'}`} onClick={addTeamMember}>
          <i className={`bi bi-plus ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'} text-md`}></i> Add Service
        </button>
      </div>

      <table className="w-full border-separate border-spacing-y-4" onMouseLeave={() => dispatch({ type: 'SET_TEXTAREA_INDEX', payload: null })}>
      <thead>
               <tr className='text-lg text-535252 text-justify'>
                <th className='font-normal'>Services</th>
                <th className='font-normal'>Description</th>
                <th className='font-normal w-1/12'></th>
               </tr>
        </thead>
        <tbody>
          {socialMembers.map((socialMembers, index) => (
            <tr key={index}>
              <td className='pe-3'>
                <select
                  className="form-select block appearance-none w-full border border-BFBFBF text-434852 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`socialTitle-${index}`}
                  name="socialTitle"
                  value={socialMembers.socialTitle}
                  onChange={e => handleInputChange(index, e)}
                >
                  <option>Tax</option>
                  <option>Payroll</option>
                </select>
              </td>
              <td className='pe-3'>

              {textareaIndex === index ? (
                  <textarea
                    className={`block w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none h-[${textareaHeight}]`}
                    id={`socialLink-${index}`}
                    name="socialLink"
                    value={socialMembers.socialLink}
                    onChange={e => handleInputChange(index, e)}
                  />
              )  :
              <input
              className={`w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none `}
              defaultValue={socialMembers.socialLink}
              onClick={() => dispatch({ type: 'SET_TEXTAREA_INDEX', payload: index })}
            />
                
                } 
              </td>
              <td>
                
                <button className={` bg-transparent text-535252 font-base py-2 px-4  ${pointerStyle !== 0 ? 'hidden' : ''}`} onClick={handleSave}>
                   <SaveIcon fill="#A4B0BB" css="save-icon"/>

                </button>
                <div className={`flex items-center justify-between w-10 ${pointerStyle === 0 ? 'hidden' : ''}`}>
                  
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={socialMembers.socialChecked}
                                    onChange={e => addteamcheck(e, index)}
                                />
                                <span className="relative w-5 h-5 border-2 border-2999BC rounded-md mr-2">
                                    <span
                                    className={`absolute inset-0 rounded-md transition-opacity ${
                                        socialMembers.socialChecked ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    ></span>
                                    {socialMembers.socialChecked && (
                                        <i className="arrow checkarrow"></i>
                                    )}
                                </span>
                            </label>
                       <i className="bi bi-dash-circle text-F84545 text-lg"></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


   </>
  )
}

export default CustomerServices