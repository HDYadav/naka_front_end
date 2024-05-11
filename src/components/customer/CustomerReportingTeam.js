
import React, { useReducer } from 'react';
import SaveIcon from '../Icons/SaveIcon';

const initialState = {
  pointerStyle: 0,
  teamMembers: [{ leaderName: '', email: '', name: '',teamChecked: true }],
  
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TEAM_MEMBER':
      if (state.pointerStyle !== 0) {
        return {
          ...state,
          teamMembers: [...state.teamMembers, { leaderName: '', email: '', name: '',teamChecked: true }],
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
      const { indexno, teamChecked } = action.payload;
      const NewTeamMembers = [...state.teamMembers];
      NewTeamMembers[indexno].teamChecked = teamChecked;
      return { ...state, teamMembers: NewTeamMembers };
    default:
      return state;
  }
};

const CustomerReportingTeam = () => {
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
    dispatch({ type: 'ADD_TEAM_CHECK', payload: { indexno, teamChecked: event.target.checked } });
  };


  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-Vietnam text-2xl text-537596 font-normal mb-5">Reporting Team</h2>
        <button className={` bg-transparent text-lg  font-medium py-2 px-4 ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'}`} onClick={addTeamMember}>
          <i className={`bi bi-plus ${pointerStyle === 0 ? 'text-535252' : 'text-F16136'} text-md`}></i> Add Team
        </button>
      </div>

      <table className="w-full border-separate border-spacing-y-4">
        <tbody>
          {teamMembers.map((teamMember, index) => (
            <tr key={index}>
              <td className='pe-3'>
                <select
                  className="form-select w-full block appearance-none w-full border border-BFBFBF text-434852 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`leaderName-${index}`}
                  name="leaderName"
                  value={teamMember.leaderName}
                  onChange={e => handleInputChange(index, e)}
                >
                  <option>BD Leader Name</option>
                  <option>Group 2</option>
                  <option>Group 3</option>
                </select>
              </td>
              <td className='pe-3'>
                <input
                  className="block w-full text-434852 border border-BFBFBF py-3 px-4 focus:outline-none "
                  id={`email-${index}`}
                  name="email"
                  type="text"
                  placeholder="Email@globalfpo.com"
                  value={teamMember.email}
                  onChange={e => handleInputChange(index, e)}
                />
              </td>
              <td className='pe-3'>
                <input
                  className="block w-full text-434852 border border-BFBFBF py-3 px-4 focus:outline-none "
                  id={`name-${index}`}
                  name="name"
                  type="text"
                  placeholder="Name . . ."
                  value={teamMember.name}
                  onChange={e => handleInputChange(index, e)}
                />
              </td>
              <td>
                
                <button className={` bg-transparent text-535252 font-base py-2 px-4 hover:text-white  ${pointerStyle !== 0 ? 'hidden' : ''}`} onClick={handleSave}>
                    <SaveIcon fill="#A4B0BB" css="save-icon"/>
                </button>
                <div className={`flex items-center justify-between w-10 ${pointerStyle === 0 ? 'hidden' : ''}`}>
                  
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={teamMember.teamChecked}
                                    onChange={e => addteamcheck(e, index)}
                                />
                                <span className="relative w-5 h-5 border-2 border-2999BC rounded-md mr-2">
                                    <span
                                    className={`absolute inset-0 rounded-md transition-opacity ${
                                      teamMember.teamChecked ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    ></span>
                                    {teamMember.teamChecked && (
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

      <div className='flex justify-end'>
                <button className={` bg-F4F4F4 border-EAE2E2 text-535252 py-2 px-4`} >
                        View Team
                </button>
      </div>
    </>
  );
};

export default CustomerReportingTeam;
