import React, { useReducer } from 'react';
import SaveIcon from '../Icons/SaveIcon';

const initialState = {
  pointerStyle: 0,
  teamMembers: [{ leaderName: '', email: '', name: '', isChecked: true }],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TEAM_MEMBER':
      if (state.pointerStyle !== 0) {
        return {
          ...state,
          teamMembers: [...state.teamMembers, { leaderName: '', email: '', name: '',isChecked: true }],
          pointerStyle: 0,
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
    default:
      return state;
  }
};

const CustomerContactPerson = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { pointerStyle, teamMembers } = state;

  const addTeamMember = () => {
    dispatch({ type: 'ADD_TEAM_MEMBER' });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    dispatch({ type: 'INPUT_CHANGE', payload: { index, name, value } });
  };

  const handleSave = () => {
    dispatch({ type: 'SAVE' });
  };

  const addteamcheck = (event, indexno) => {
    dispatch({ type: 'ADD_TEAM_CHECK', payload: { indexno, isChecked: event.target.checked } });
  };
  return (
    <>
    <div className="flex justify-between">
      <h2 className="font-Vietnam text-2xl font-normal text-537596 mb-5">Contact Person</h2>
      <button className={` bg-transparent text-lg font-medium py-2 px-4 ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'}`} onClick={addTeamMember}>
        <i className={`bi bi-plus ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'} text-md`}></i> Add Contact Person
      </button>
    </div>

    <table className="w-full border-separate border-spacing-y-4">
        <thead>
               <tr className='text-lg text-535252 text-justify'>
                <th className='font-normal'>Name</th>
                <th className='font-normal'>Contact No.</th>
                <th className='font-normal'>Email Address <span className='text-F16136'>*</span></th>
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
              <input
                className="block w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none "
                id={`email-${index}`}
                name="email"
                type="text"
                value={teamMember.email}
                onChange={e => handleInputChange(index, e)}
              />
            </td>
            <td className='pe-3'>
              <input
                className="block w-full text-383838 border border-BFBFBF py-3 px-4 focus:outline-none "
                id={`name-${index}`}
                name="name"
                type="text"
                value={teamMember.name}
                onChange={e => handleInputChange(index, e)}
              />
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

   
  </>
  )
}

export default CustomerContactPerson