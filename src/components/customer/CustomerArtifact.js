
import React, { Fragment, useReducer } from 'react';
import SaveIcon from '../Icons/SaveIcon';

const initialState = {
  pointerStyle: 0,
  teamMembers: [{ leaderName: '', email: '', name: '', isChecked: true }],
  textareaIndex: null,
  textareaHeight: 'auto'
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TEAM_MEMBER':
      if (state.pointerStyle !== 0) {
        return {
          ...state,
          teamMembers: [...state.teamMembers, { leaderName: '', email: '', name: '', isChecked: true }],
          pointerStyle: 0
        };
      }
      return state;
    case 'INPUT_CHANGE':
      const { index, name, value } = action.payload;
      const newTeamMembers = [...state.teamMembers];
      newTeamMembers[index][name] = value;
      return { ...state, teamMembers: newTeamMembers };
    case 'SAVE':
      return { ...state, pointerStyle: 1 };
    case 'ADD_TEAM_CHECK':
      const { indexno, isChecked } = action.payload;
      const NewTeamMembers = [...state.teamMembers];
      NewTeamMembers[indexno].isChecked = isChecked;
      return { ...state, teamMembers: NewTeamMembers };
    case 'SET_TEXTAREA_INDEX':
      return { ...state, textareaIndex: action.payload };
    case 'SET_TEXTAREA_HEIGHT':
      return { ...state, textareaHeight: action.payload };
    default:
      return state;
  }
};


const CustomerArtifact = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
  const { pointerStyle, teamMembers, teamChecked, textareaIndex, textareaHeight } = state;

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
    dispatch({ type: 'ADD_TEAM_CHECK', payload: { indexno, isChecked: event.target.checked } });
  };

  return (
    <Fragment>
    <div className="flex justify-between">
      <h2 className="font-Vietnam text-2xl font-normal text-537596 mb-5">Artifact</h2>
      <button className={` bg-transparent text-lg font-medium py-2 px-4 ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'}`} onClick={addTeamMember}>
        <i className={`bi bi-plus ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'} text-md`}></i> Add Artifact
      </button>
    </div>

    <table className="w-full border-separate border-spacing-y-4" onMouseLeave={() => dispatch({ type: 'SET_TEXTAREA_INDEX', payload: null })}>
        <thead>
               <tr className='text-lg text-535252 text-justify'>
                <th className='font-normal'>DOC type</th>
                <th className='font-normal'>File</th>
                <th className='font-normal'>Description</th>
                <th></th>
               </tr>
        </thead>
      <tbody>
        {teamMembers.map((teamMember, index) => (
          <tr key={index}>
            <td className='pe-3'>

              <input
                className="block w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none "
                id={`leaderName-${index}`}
                name="leaderName"
                type="text"
                value={teamMember.leaderName}
                onChange={e => handleInputChange(index, e)}
              />
            </td>
            <td className='pe-3'>

               <div className={`${pointerStyle !== 0 ? 'hidden' : ''}`}>
                    <input className="block w-full leading-9 overflow-hidden text-sm border border-BFBFBF cursor-pointer focus:outline-none file:text-F16136 file:bg-BFBFBF file:border file:border-BFBFBF" 
                        id="single_file" 
                        accept="image/*" 
                        type="file" />
               </div>
               <div className={`relative flex ${pointerStyle === 0 ? 'hidden' : ''}`}>
                     <input className="block w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none " 
                        type="text" 
                        defaultValue={"8970......99.pdf"}
                        />

                    <span className="absolute right-0 z-10 py-1 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-369EC0 text-center flex items-center justify-center">
                        <i className="bi bi-download"></i>
                    </span>
               </div>
               

            </td>
              
            <td className='pe-3 relative'>
            
             {textareaIndex === index ? (
                  <textarea
                    className={`block w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none h-[${textareaHeight}]`}
                    id={`name-${index}`}
                    name="name"
                    value={teamMember.name}
                    onChange={e => handleInputChange(index, e)}
                  />
              )  :
              <input
              className={`w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none `}
            
              defaultValue={teamMember.name}
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
                                  checked={teamMember.isChecked}
                                  onChange={e => addteamcheck(e, index)}
                              />
                              <span className="relative w-5 h-5 border-2 border-2999BC rounded-md mr-2">
                                  <span
                                  className={`absolute inset-0 rounded-md transition-opacity ${
                                      teamMember.isChecked ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  ></span>
                                  {teamMember.isChecked && (
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

   
  </Fragment>
  )
}

export default CustomerArtifact