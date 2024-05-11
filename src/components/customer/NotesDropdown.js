import React, { useState, Fragment } from 'react';

const NotesDropdown = () => {
    const [notesDropOpen, setNotesDropOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("Recent Last");

    const handleNotesDrop = (value) => {
        setDropDownValue(value);
        setNotesDropOpen(false);
    };

    return (
        <div className='flex justify-center'>

        <div className="inline-block text-left py-3 relative">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-F3F3F3 px-3 py-2 text-sm text-gray-900 border border-E1E1E1 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-1D4469 hover:text-white"
                    onClick={() => setNotesDropOpen(!notesDropOpen)}
                    aria-expanded={notesDropOpen}
                    aria-haspopup="true"
                >
                    {dropDownValue}
                    <i className={`bi bi-${notesDropOpen ? 'chevron-up' : 'chevron-down'} text-gray-400`}></i>
                </button>
            </div>

            {notesDropOpen && (
                <div className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabIndex="-1">
                    <div className="p-3" role="none">
                        <button className={`text-383838 block w-full px-2 py-2 text-left text-sm ${dropDownValue === "All" ? 'bg-1D4469  text-white' : 'border-b border-D2DAE1 hover:text-1D4469'}`} onClick={() => handleNotesDrop("All")} tabIndex="-1"> {dropDownValue === "All" && <i class="bi bi-check-lg me-2"></i> } All</button>
                        <button className={`text-383838 block w-full px-2 py-2 text-left text-sm ${dropDownValue === "Contact Only" ? 'bg-1D4469  text-white' : 'border-b border-D2DAE1 hover:text-1D4469'}`} onClick={() => handleNotesDrop("Contact Only")} tabIndex="-1"> {dropDownValue === "Contact Only" && <i class="bi bi-check-lg me-2"></i> } Contact Only</button>
                        <button className={`text-383838 block w-full px-2 py-2 text-left text-sm ${dropDownValue === "Recent First" ? 'bg-1D4469  text-white' : 'border-b border-D2DAE1 hover:text-1D4469'}`} onClick={() => handleNotesDrop("Recent First")} tabIndex="-1"> {dropDownValue === "Recent First" && <i class="bi bi-check-lg me-2"></i> } Recent First</button>
                        <button className={`text-383838 block w-full px-2 py-2 text-left text-sm ${dropDownValue === "Recent Last" ? 'bg-1D4469  text-white' : 'border-b border-D2DAE1 hover:text-1D4469'}`} onClick={() => handleNotesDrop("Recent Last")} tabIndex="-1"> {dropDownValue === "Recent Last" && <i class="bi bi-check-lg me-2"></i> } Recent Last</button>
                    </div>
                </div>
            )}
        </div>

        </div>

    );
}

export default NotesDropdown;
