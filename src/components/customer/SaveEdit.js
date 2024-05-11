import React from 'react'

const SaveEdit = ({UpdateLabel,CloseLabel,index}) => {
  return (
        <div class="absolute bottom-24 right-0 flex items-center">
            <span className='bg-white dropshadow1 rounded-md p-3 py-2'>
            <button type='button' onClick={UpdateLabel}>
                <i className="bi bi-check-circle hover:text-1D4469"></i>
            </button>
            <span className='mx-2 border border-CECECE'></span>
            <button type='button' onClick={CloseLabel}><i class="bi bi-x-circle hover:text-FBB244"></i></button>
            </span>

            <span className='absolute top-3/4 left-1'>
                <i className="bi bi-caret-down-fill text-white text-2xl"></i>
            </span>
        </div>
  )
}

export default SaveEdit