import React,{Fragment, useState} from 'react'
import SaveEdit from './SaveEdit';

const CustomerOtherDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalFormValues, setModalFormValues] = useState({ label: '', textarea: '' });
    const [modalMessage, setModalMessage] = useState('');
    const [editLabel,setEditLabel] =  useState(null);
    const [editModelStatus,setEditModelStatus] =  useState(false);
    
    const [formData, setFormData] = useState({
        clientStatus: '',
        stage: '',
        typeOfOpportunity: '',
        currentBilling: '',
        overallOpportunity: '',
        clientCategory: '',
        billingEstimate: '',
        clientFrequency: '',
        opportunityDescription: '',
        modalFormData: [], 
      });

    const openModal = (e) => {
        e.preventDefault();
      setIsModalOpen(true);
      document.body.classList.add('modal-open');
    };
  
    const closeModal = (e) => {
        e.preventDefault();
      setIsModalOpen(false);
      document.body.classList.remove('modal-open');
      setModalFormValues({ label: '', textarea: '' });
      setModalMessage('');

    };

    const handleModalFormSubmit = (e) => {
        e.preventDefault();

        if (modalFormValues.label.trim() === "") {
         setModalMessage('Label input cannot be empty');
            return;
        }


        setFormData(prevFormData => ({
            ...prevFormData,
            modalFormData: [...prevFormData.modalFormData, modalFormValues],
        }));

          
        closeModal(e);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const EditLabel = (index) => {
        setEditLabel(index);
        setEditModelStatus(!editModelStatus);
    }

    const UpdateLabel = (index) => {
        const labelupdate = document.getElementById(`labelupdate${index}`);
        const textupdate = document.getElementById(`textupdate${index}`);
        const errmsglabelinput = document.getElementById(`errmsglabelinput${index}`);

        if (labelupdate.value.trim() === "") {
            labelupdate.style.borderColor = 'red';
            errmsglabelinput.textContent = 'Label Field Are Required'
            return;
        }

        const updatedData = [...formData.modalFormData]; 
        updatedData[index] = { ...updatedData[index], label: labelupdate.value,textarea: textupdate.value  };
        setFormData({
            ...formData,
            modalFormData: updatedData,
          });
        setEditLabel(!index);
        setEditModelStatus(!editModelStatus);
    }
    const CloseLabel = () => {
        setEditLabel(null);
        setEditModelStatus(!editModelStatus);
    }

    const handleOtherDetailChange = (e) => {
        const { id, value } = e.target;
        // setFormData({ ...formData, [id]: value });
          setEditModelStatus(true);
          setEditLabel(id);

    }

    const FormDataSave = (id) => {
        const selectedElement = document.getElementById(id);
        const selectedValue = selectedElement.value;

        setFormData({
            ...formData,
            [id] : selectedValue
        })
        setEditLabel(null);
        setEditModelStatus(!editModelStatus);
    }

  return (
       <div onMouseLeave={() => {setEditLabel(null);setEditModelStatus(false);} }>
                <h2 className="font-Vietnam text-2xl text-537596 font-normal mb-5">Other Detail</h2>

                        <form>
                                <div className="flex flex-wrap md:justify-between mb-4">
                                    <div className="w-[45%] mb-6 md:mb-0 ">
                                            <label
                                                className="block tracking-wide text-535252 mb-2"
                                                htmlFor="grid-client-status"
                                            >
                                                Client Status
                                            </label>
                                        

                                            <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="grid-client-status"
                                                  disabled={editModelStatus && editLabel !== "grid-client-status"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>Group 1</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                            </select>

                                            {editLabel === "grid-client-status"  &&

                                                           <div className='relative top-2/3'>
                                                                   <SaveEdit UpdateLabel={() => FormDataSave('grid-client-status')} CloseLabel={() => CloseLabel()}/>

                                                             </div>
                                            
                                            }
                                

                                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                    </div>
                                    <div className="w-[45%] ">
                                    <label
                                        className="block tracking-wide text-535252 mb-2"
                                        htmlFor="grid-stage"
                                    >
                                        Stage
                                    </label>
                                        <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="grid-stage"
                                                  disabled={editModelStatus && editLabel !== "grid-stage"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>Won-No Action</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                        </select>

                                        {editLabel === "grid-stage"  &&

                                            <div className='relative top-2/3'>
                                                    <SaveEdit UpdateLabel={() => FormDataSave('grid-stage')} CloseLabel={() => CloseLabel()}/>

                                            </div>

                                        }
                                        
                                    </div>
                                </div>
                                <div className="flex flex-wrap md:justify-between mb-4">
                                    <div className="w-[45%] mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-535252 mb-2"
                                                htmlFor="typeofopport"
                                            >
                                                Type of Opportunity
                                            </label>
                                            <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="typeofopport"
                                                  disabled={editModelStatus && editLabel !== "typeofopport"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>Bookkeeping</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                            </select>
                                           
                                            {editLabel === "typeofopport"  &&

                                                <div className='relative top-2/3'>
                                                        <SaveEdit UpdateLabel={() => FormDataSave('typeofopport')} CloseLabel={() => CloseLabel()}/>

                                                </div>

                                            }

                                    </div>
                                    <div className="w-[45%]">
                                    <label
                                        className="block tracking-wide text-535252 mb-2"
                                        htmlFor="currentbill"
                                    >
                                        Current Billing
                                    </label>
                                        <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="currentbill"
                                                  disabled={editModelStatus && editLabel !== "currentbill"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>None</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                        </select>

                                        {editLabel === "currentbill"  &&

                                                <div className='relative top-2/3'>
                                                        <SaveEdit UpdateLabel={() => FormDataSave('currentbill')} CloseLabel={() => CloseLabel()}/>

                                                </div>

                                            }
                                    </div>
                                </div>
                                <div className="flex flex-wrap md:justify-between mb-4">
                                    <div className="w-[45%] mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-535252 mb-2"
                                                htmlFor="overallopport"
                                            >
                                                Overall Opportunity
                                            </label>
                                            <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="grid-client-status"
                                                  disabled={editModelStatus && editLabel !== "overallopport"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>Yes-Signed/ Closed</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                            </select>
                                            
                                            {editLabel === "overallopport"  &&

                                                <div className='relative top-2/3'>
                                                        <SaveEdit UpdateLabel={() => FormDataSave('overallopport')} CloseLabel={() => CloseLabel()}/>

                                                </div>

                                            }

                                    </div>
                                    <div className="w-[45%]">
                                    <label
                                        className="block tracking-wide text-535252 mb-2"
                                        htmlFor="clientcategory"
                                    >
                                        Client Category
                                    </label>
                                        <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="clientcategory"
                                                  disabled={editModelStatus && editLabel !== "clientcategory"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>Retail- Small Business</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                        </select>

                                        {editLabel === "clientcategory"  &&

                                            <div className='relative top-2/3'>
                                                    <SaveEdit UpdateLabel={() => FormDataSave('clientcategory')} CloseLabel={() => CloseLabel()}/>

                                            </div>

                                        }

                                    </div>
                                </div>
                                <div className="flex flex-wrap md:justify-between mb-4">
                                    <div className="w-[45%] mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-535252 mb-2"
                                                htmlFor="billestimate"
                                            >
                                                Billing Estimate
                                            </label>
                                            <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="billestimate"
                                                  disabled={editModelStatus && editLabel !== "billestimate"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>None</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                            </select>
                                            
                                            {editLabel === "billestimate"  &&

                                                <div className='relative top-2/3'>
                                                        <SaveEdit UpdateLabel={() => FormDataSave('billestimate')} CloseLabel={() => CloseLabel()}/>

                                                </div>

                                            }

                                    </div>
                                    <div className="w-[45%]">
                                    <label
                                        className="block tracking-wide text-535252 mb-2"
                                        htmlFor="clientfreq"
                                    >
                                        Client Frequency
                                    </label>
                                        <select
                                                  className="form-select block appearance-none w-full border border-BFBFBF text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                  id="clientfreq"
                                                  disabled={editModelStatus && editLabel !== "clientfreq"}
                                                  onChange={handleOtherDetailChange}
                                            >
                                                  <option>None</option>
                                                  <option>Group 2</option>
                                                  <option>Group 3</option>
                                        </select>

                                                
                                        {editLabel === "clientfreq"  &&

                                            <div className='relative top-2/3'>
                                                    <SaveEdit UpdateLabel={() => FormDataSave('clientfreq')} CloseLabel={() => CloseLabel()}/>

                                            </div>

                                        }
                                    </div>
                                </div>

                                <div>
                                <label
                                        className="block tracking-wide text-535252 mb-2"
                                        htmlFor="opportdesc"
                                    >
                                        Opportunity Description
                                    </label>
                                    <textarea id="opportdesc"  rows="3" className="resize-y border border-BFBFBF w-full text-383838 text-sm p-1 px-3"   
                                    disabled={editModelStatus && editLabel !== "opportdesc"}
                                    onChange={handleOtherDetailChange}>

                                    </textarea>

                                    {editLabel === "opportdesc"  &&

                                        <div className='relative top-2/3'>
                                                <SaveEdit UpdateLabel={() => FormDataSave('opportdesc')} CloseLabel={() => CloseLabel()}/>

                                        </div>

                                    }

                                </div>

                                <div className='flex flex-wrap md:justify-between my-4 gap-y-4' >
                                    {formData.modalFormData.map((data, index) => (
                                       
                                            <div  className="w-[45%] mb-6 md:mb-0 relative contentsdiv" key={index}>
                                                                                        {
                                                                                            editLabel !== index ? 
                                                                                            (
                                                                                            <>
                                                                                            <label className={`block tracking-wide text-535252 mb-2 `} htmlFor="modalformdata"> 
                                                                                                <span>{data.label} <button type='button' className={`ms-2 focus:outline-none formeditbtn`} onClick={() => EditLabel(index)} disabled={editModelStatus}><i className="bi bi-pencil hover:text-FBB244"></i></button> </span>
                                                                                            </label>
                                                                                            <label className={`block tracking-wide text-535252 border border-BFBFBF p-2`} htmlFor="modalformdata"> 
                                                                                                <span className={`${data.textarea === '' && 'p-4'}`}>{data.textarea}</span>
                                                                                            </label>
                                                                                            </>
                                                                                            )  :
                                                                                            (
                                                                                                <Fragment>
                                                                                                    <div className='text-F16136 text-center' id={`errmsglabelinput${index}`}></div>
                                                                                                     <input id={`labelupdate${index}`} type="text" defaultValue={data.label}  className='block w-full text-434852 border border-BFBFBF py-3 px-4 focus:outline-none mb-2'/>
                                                                                                     <input  id={`textupdate${index}`} type="text" defaultValue={data.textarea}  className='block w-full text-434852 border border-BFBFBF py-3 px-4 focus:outline-none ' />
                                                                                                    <SaveEdit UpdateLabel={() => UpdateLabel(index)} CloseLabel={() => CloseLabel()}/>
                                                                                                </Fragment>
                                                                                                   
                                                                                        
                                                                                             )
                                                                                        }
                                                                                        

                                                                                            

                                            </div>

                                    ))}
                                </div>



                            
                              
                            
                        </form>


                        <div className='flex justify-end border-t border-F0F0F0 mt-8 '>
                                      <button className='text-B0B0B0 text-sm' onClick={openModal} disabled={editModelStatus}> <i className="bi bi-plus text-B0B0B0"></i> Add Column</button>
                                    
                                    
                                      <div className={` ${isModalOpen ? 'firstmodal' : 'hidden'}`}>
                                               <div className="bg-white p-4 w-[447px] rounded-md shadow-3">
                                                    <h2 className='text-dark flex justify-between'>
                                                        Add Detail
                                                        <button onClick={closeModal}><i class="bi bi-x-circle"></i></button>
                                                    </h2>
                                                    <form onSubmit={handleModalFormSubmit}>

                                                    {modalMessage && <div className='text-F16136 text-center' id="modalmessage"> {modalMessage} </div> }

                                                    <div>
                                                       <input name='label' className='w-full my-2 px-2 text-383838 ' type='text' placeholder='Label *' 
                                                         value={modalFormValues.label}
                                                         onChange={handleInputChange}
                                                         />
                                                       <input name="textarea"  className='w-full my-2 px-2 text-383838' type='text' placeholder='Text Area' 
                                                         value={modalFormValues.textarea}
                                                         onChange={handleInputChange}
                                                         />
                                                       
                                                    </div>
                                                    <div className='flex justify-end'>
                                                         <button type="submit" className="bg-1D4469 text-white text-18 py-2 px-4 w-[100px]">Add</button>
                                                    </div>
                                                    </form>
                                               </div>
                                      </div>

                                 </div>


       </div>
  )
}

export default CustomerOtherDetail