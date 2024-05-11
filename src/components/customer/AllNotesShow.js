import React, {useState, Fragment } from 'react'
import NotesData from './NotesData'
import SaveIcon from '../Icons/SaveIcon';

const AllNotesShow = () => {
  const [editNoteId, setEditNoteId] = useState(null);

  const handleNotesEdit = (id) => {
    setEditNoteId(id);
  }

  console.warn(editNoteId,11)
  return (
    <Fragment>
   
    {NotesData.map(note => (
                                                                                       
        <div className="py-4 border-t-2 border-1d446933" key={note.id}>
      
          <div className="flex text-sm">

                     

                        <i class={` ${note.notesimg} text-556080 text-3xl me-4`}></i>
                       
                     

                            <div className="w-full">
                              <div className="flex justify-between"> 
                                  <div>
                                    <span className="text-2C495D font-600">{note.title}</span>
                                  </div>
                                  <div className="flex items-center">
                                          <div className="border border-[rgba(44, 73, 93, 0.20)] rounded-md p-1 px-3 text-2C495D">
                                            {note.status} 
                                            <i className={`bi bi-circle-fill ${note.status === "Risk" ? 'text-FBB244' : note.status === "Attention" ? 'text-40D63D' : ''}   ms-3`}></i>
                                          </div>
                                          <button type="button" className="mx-4" onClick={() => handleNotesEdit(note.id)}>
                                            <i class="bi bi-pencil-square text-F16136"></i>
                                          </button>
                                          <button type="button" ><i class="bi bi-trash3 text-F16136"></i></button>
                                  </div>
                              </div>

                              {
                                editNoteId === note.id  ?  

                                (<div>

                                            <p className=" text-535252 text-sm">Hi Jose,

                                            Greetings from Global FPO…<br></br><br></br>

                                            This is regarding your Job Post for Staff Accountant/Administrative Assistant on Indeed.. <br></br><br></br>

                                            We have a Team of 295+ Qualified Bookkeeper with more than 5+ years of experience & with complete proficiency on US Accounting, Certification in QBO/XERO accounting software. This Bookkeeping resource will be costing you US$ 14 Per Hour.<br></br> 
                                            Global FPO is an acclaimed 11+ year old global bookkeeping & taxation company, we assist 275+ satisfied Accounting & Tax Firms (CPA/EA/BK) across US with their end-to-end accounting needs, including Bookkeeping, Taxation, Payroll & complex USGAAP advisory services, among others. <br></br>
                                            o	We have inhouse team of 500+ Bookkeeper, Payroll & Tax professionals - out of which 300+ are QBO/XERO certified bookkeeping professionals and 100+ Tax professionals.
                                            o	We have a team of experts assisting CPA fraternity of USA to provide timely reviews & reports.   <br></br>
                                            o	Our team is Managing 10+ million bookkeeping transactions, 7500+ tax returns annually. <br></br>
                                            o	Global FPO ensures continuity of services without any hassle of hiring, staff training, payroll-related legal compliances, or infrastructure costs.<br></br>
                                            o	Global FPO has an excellent ecosystem around communication (including WhatsApp, email, phone, video call, online chat, and productivity tool tools like Asana, Microsoft Teams, Slack, etc.)<br></br>
                                            o	Immediate deployment of resources as per your requirement. <br></br>
                                            o	No minimum Commitment.<br></br>
                                            o	Flexible engagement wherein client can enhance or reduce Global FPO support as per their business needs.<br></br>
                                            o	Strong multiple level client relationship matrix to ensure smooth support and prompt response. <br></br><br></br>

                                            Please have look on attached Global FPO BYOT (Build Your Own Team) Corporate Presentation. <br></br>
                                            I request, we can connect over a quick 15-minute zoom meeting to understand detailed ‘Scope of Work’ & allow us to share an exclusive fee for your esteem organization. <br></br>
                                            Please share the convenient Date & Time, will share the Zoom Invite to initiate the Discovery Meeting. <br></br>
                                            We are enthusiastic about the possibility of working together and are looking forward to the opportunity.
                                            </p>
                                            
                                </div>)
                                   :
                         
                              (
                              <p className="capitalize text-535252">{note.description}</p>
                            )

                              }
                                  
                                  <div className="flex justify-between mt-10">
                                      <span className="text-2C495D">{note.lead}</span>
                                      <div className="text-xs">
                                        <span className="text-2999BC">Add Note </span>
                                        <span className="text-848687">{note.lastEditInfo}</span>
                                      </div>
                                  </div>


                            </div>


          </div>


          
          {editNoteId === note.id  && 
                                  
                                  (
                                    <div className='border-t border-1d446933 my-5 flex justify-between pt-2 ps-10'>
                                      <div>
                                           <button> <i class="bi bi-gear text-xl"></i></button>
                                      </div>
                                      <div className='flex'>
                                                                                                 <button type="button" className="bg-F4F4F4 border-2 border-EAE2E2 p-1 px-4 text-535252 text-sm font-600 mx-2 h-full">
                                                                                                     <i class="bi bi-x-lg text-black"></i>
                                                                                                 </button>
                                                                                                 <button type="button" className="bg-1D4469 border-2 border-123251 p-1 px-4 text-white text-sm font-600 mx-2 h-full">
                                                                                                      <SaveIcon fill="#FFFFFF"/>
                                                                                                 </button>
                                      </div>
                                                                                         
                                    </div>
                                  )
                                  
                                  }

        </div>
      ))}

           
    </Fragment>
  )
}

export default AllNotesShow