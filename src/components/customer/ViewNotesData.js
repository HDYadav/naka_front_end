import React from 'react'
import SaveIcon from '../Icons/SaveIcon'

const ViewNotesData= ({children,setNotesSetting,notesSetting,handleNotesClick}) => {
  return (
                                                                            <div className="border-y-2 border-1d446933 py-4">
                                                                                           <div className="grid">
                                                                                            <div className="relative">
                                                                                                 <input type="text" placeholder="Note Title . . ." className="px-2 w-full" onClick={() => handleNotesClick('addnotes')}/>
                                                                                                 <div className="absolute top-0 right-0 flex items-center">
                                                                                                  <button className={`px-2 hover:text-1D4469 ${notesSetting ? 'spin-animation-right' : 'spin-animation-left'}`} onClick={() => setNotesSetting(!notesSetting)}>
                                                                                                      <i className="bi bi-gear-wide-connected text-2xl "></i>

                                                                                                  </button>
                                                                                                  
                                                                                                    <select className="px-2 form-select w-[119px]">
                                                                                                      <option>Category</option>
                                                                                                    </select>
                                                                                                    <span className="px-2"><i class="bi bi-circle-fill text-D9D9D9"></i></span>
                                                                                                 </div>

                                                                                            </div>

                                                                                            {children}

                                                                                            <div className="flex items-end justify-end mt-3">
                                                                                                 <button type="button" className="bg-F4F4F4 border-2 border-EAE2E2 p-1 px-4 text-535252 text-sm font-600 mx-2 h-full">
                                                                                                 <i class="bi bi-x-lg text-black"></i>
                                                                                                 </button>
                                                                                                 <button type="button" className="bg-1D4469 border-2 border-123251 p-1 px-4 text-white text-sm font-600 mx-2 h-full">
                                                                                                      <SaveIcon fill="#FFFFFF"/>
                                                                                                 </button>
                                                                                            </div>
                                                                                                     
                                                                                           </div>

                                                                                         
                                                                                </div>
  )
}

export default ViewNotesData