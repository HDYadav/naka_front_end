import React, { useState, useEffect,useRef, Fragment } from "react"; 

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { flushSync } from 'react-dom';

import LayoutHOC from "../LayoutHOC";
import { Link } from "react-router-dom";
import CustomerOtherDetail from "./CustomerOtherDetail";
import CustomerReportingTeam from "./CustomerReportingTeam";
import CustomerSocialLink from "./CustomerSocialLink";
import CustomerAddress from "./CustomerAddress";
import CustomerContactPerson from "./CustomerContactPerson";
import CustomerArtifact from "./CustomerArtifact";
import CustomerServices from "./CustomerServices";
import AddIcon from "../Icons/AddIcon";
import DownCircleArrow from "../Icons/DownCircleArrow";
import MonthCalendar from "../Calendar/MonthCalendar";
import WeekCalendar from "../Calendar/WeekCalendar";
import AllNotesShow from "./AllNotesShow";
import ViewNotesData from "./ViewNotesData";
import NotesEditor from "../TextEditor/NotesEditor";
import NotesDropdown from "./NotesDropdown";


function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;  
  const formattedDate = date < 10 ? `0${date}` : date;

  return `${formattedMonth}/${formattedDate}/${year}`;
}


const AddCustomer1 = () =>{

    const [openTab, setOpenTab] = React.useState(1);
    const [isFixed, setIsFixed] = useState(false);
    const [currentDate, setCurrentDate] = useState(getDate());

    const [calendarDate, setCalendarDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);

    const [taskExpand, setTaskExpand] = useState(true);

    const [activeCalendarTab, setActiveCalendarTab] = useState(1);

    const [viewNotes,setViewNotes] = useState({allnotes:false,addnotes:false});

    const textareaRef = useRef(null);
    const [initialContent, setInitialContent] = useState('');
    const [notesSetting,setNotesSetting] = useState(false);

    
    const handleClick = (index) => (event) => {
      event.preventDefault(); 
      setOpenTab(index);
   
      if (index != 0) {
        const contentElement = document.getElementById(`link${index + 1}`);
        
        flushSync(() => {
          contentElement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        });
      }
     
    };


    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    }, []);

    const myTabs = [
        { label: 'Home', content: 'Welcome to the home page!' },
        { label: 'Other Detail', content: <CustomerOtherDetail /> },
        { label: 'Reporting Team', content: <CustomerReportingTeam /> },
        { label: 'Social Links', content: <CustomerSocialLink /> },
        { label: 'Address', content: <CustomerAddress /> },
        { label: 'Contact Person', content: <CustomerContactPerson /> },
        { label: 'Artifact', content: <CustomerArtifact /> },
        { label: 'Services', content: <CustomerServices /> },

      ];


      function TaskExpand(){
             setTaskExpand(!taskExpand)
             setCalendarDate(new Date())
      }

      function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
      
        const year = date.getFullYear();
      
        return `${day} ${month} ${year}`;
      }
      const goToPreviousDate = () => {
        const previousDate = new Date(calendarDate);
        previousDate.setDate(previousDate.getDate() - 1);
        setCalendarDate(previousDate);
      };
      const goToNextDate = () => {
        const nextDate = new Date(calendarDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCalendarDate(nextDate);
      };
      const goToPreMonth = () => {
        const newDate = new Date(calendarDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCalendarDate(newDate);
      };
    
      const goToNextMonth = () => {
        const newDate = new Date(calendarDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCalendarDate(newDate);
      };
      const changeTab = (tabIndex) => {
        setActiveCalendarTab(tabIndex);
      };

      const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0;
      };

      const calendarDateChange = (e) => {
        // setCalendarOpen(!calendarOpen);
        setCalendarDate(e);
      };
      const calendarClick = (e) => {
        e.preventDefault();
        setCalendarOpen(!calendarOpen);
      };


      const handleNotesClick = (key) => {
        setViewNotes((prevState) => {
          const newState = Object.keys(prevState).reduce((acc, currKey) => {
            acc[currKey] = false;
            return acc;
          }, {});
          newState[key] = true;
          return newState;
        });
      };
      
      let expandbtn = (
        
        <div className={`flex justify-end mb-4 `}>
                <button className="bg-white border border-E1E1E1 py-2 px-3" onClick={TaskExpand}>
                      <i className="bi bi-arrows-fullscreen"></i>
                </button>
        </div>
      );

         return (
            <main id="maincontent">
                    <div className={`p-4 mt-14`}>
                   
                        <div className={`flex flex-col bg-white p-2 mb-3`}>
                            <div className={`flex justify-between items-center px-2`}>
                                <h5 className={`text-203C50 font-Vietnam text-[28px] font-medium`}>New Customer</h5>
                                <div className={`flex items-center`}>


                                    
                                        <label className={`inline-flex items-center cursor-pointer`}>
                                              <input type={`checkbox`} value={``} className={`sr-only peer`} />
                                               <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
                                        </label>


                                </div>
                            </div>
                        </div> 



                        <ul
                                                  className={`flex w-full mb-0 list-none flex-wrap px-3 flex items-center flex-row bg-white border border-1d446933 ${
                                                      isFixed ? 'shadow fixed top-[60px] z-50 w-full' : ''
                                                    }  `}
                                                  role="tablist"
                                              >
                                                  {myTabs.map((item, index) => (
                                                  <li
                                                      key={index}
                                                      className="-mb-px mr-2 last:mr-0 text-center"
                                                  >
                                                      <Link
                                                      className={
                                                          "p-3 block leading-normal " +
                                                          (openTab === index
                                                              ? "font-medium text-2C495D border-b-2 border-BFBFBF"
                                                              : "text-848687")
                                                      }
                                                      onClick={handleClick(index)}
                                                      role="tab"
                                                      >
                                                      {item.label}
                                                      </Link>
                                                  </li>
                                                  ))}
                                              </ul>
                        
                                <div className={`flex flex-wrap`}>
                                          
                                    <div className={` ${taskExpand ? 'hidden' : 'w-[70%]' }  mt-6`}>
                                   
                                    {myTabs.map((item, index) => (
                                             
                                    <div  key={index} className={`relative flex flex-col mb-6 min-w-0 break-words bg-white shadow-2 rounded ${
                                        openTab === index ? "block" : (openTab === 0 || index === 0 ? "hidden" : "block")

                                      }`}  id={`link${index + 1}`}>
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="tab-content tab-space">
                                                        {item.content}
                                            </div>
                                        </div>
                                    </div>

                                    ))}



                                       
                                    </div>

                                    <div className={` ${taskExpand ? 'w-3/12' : 'hidden' } mt-6`}>
                                                    {taskExpand && expandbtn}
                                               
                                               <div className="bg-white border border-1D446933 p-3 mb-4">
                                                        <div className="flex justify-between mx-2">
                                                              <h4 className="text-2C495D font-normal">Client Info</h4>
                                                              <i className="bi bi-pencil"></i>
                                                        </div>

                                                        <hr className="border-b border-1D446933 my-3"/>

                                                        <div className="mx-2">
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Display Name</div>
                                                              <div className="text-xs font-normal text-2C495D">Shashi Raj</div>
                                                          </div>
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Business Category</div>
                                                              <div className="text-xs font-normal text-2C495D">Insurance / Utility / Food</div>
                                                          </div>
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Type</div>
                                                              <div className="text-xs font-normal text-2C495D">Business</div>
                                                          </div>
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Tax Number</div>
                                                              <div className="text-xs font-normal text-2C495D">245 5559 25595</div>
                                                          </div>
                                                              
                                                        </div>

                                               </div>

                                               <div className="bg-white border border-1D446933 p-3 mb-4">
                                                        <div className="flex justify-between mx-2">
                                                              <h4 className="text-2C495D font-normal">About</h4>
                                                              <i className="bi bi-pencil"></i>
                                                        </div>

                                                        <hr className="border-b border-1D446933 my-3"/>

                                                        <div className="mx-2">
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Phone</div>
                                                              <div className="text-xs font-normal text-2C495D">+1 365 548 9856</div>
                                                          </div>
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Email</div>
                                                              <div className="text-xs font-normal text-2C495D">John@gmail.com</div>
                                                          </div>
                                                          <div className="my-3">
                                                              <div className="text-xs font-light text-2C495D">Address</div>
                                                              <div className="text-xs font-normal text-2C495D" >
                                                                       124 A , Block C, Sector -2 <br />
                                                                       Noida, Uttar Pradesh - 201301
                                                              </div>
                                                          </div>
                                                              
                                                        </div>

                                               </div>

                                               <div className="bg-white border border-1D446933 p-3 mb-4">
                                                        <div className="flex justify-between mx-2">
                                                              <h4 className="text-2C495D font-normal">Artifact</h4>
                                                              <i className="bi bi-pencil"></i>
                                                        </div>
                                               </div>

                                               <div className="bg-white border border-1D446933 p-3 mb-4">
                                                        <div className="flex justify-between mx-2">
                                                              <h4 className="text-2C495D font-normal">Contact Person</h4>
                                                              <i className="bi bi-pencil"></i>
                                                        </div>
                                                </div>
                                                    
                                    </div>

                                    
                                    <div className={`${taskExpand ? 'w-[75%]' : 'w-[30%]' } mt-6 ps-4`}>

                                                {!taskExpand && expandbtn}

                                                <div className={`bg-white border border-1d446933 px-4 mb-4`}>
                                                          <div className="flex justify-between py-4">

                                                                 {taskExpand ? (
                                                                  <Fragment>
                                                                        <h3 className="text-2C495D font-semibold text-xl">Task</h3>

                                                                        <div className="flex justify-between w-4/12">
                                                                          <button className="p-1 px-3 border border-E1E1E1 rounded-md text-2999BC text-sm font-500">View All Task</button>
                                                                          <button className="p-1 px-3 border border-E1E1E1 rounded-md text-2999BC text-sm font-500">+ Add Task</button>
                                                                          <DownCircleArrow />
                                                                        </div>
                                                                          
                                                                  </Fragment>
                                                                  
                                                                 ) : (
                                                                  <Fragment>
                                                                      <h3 className="text-2C495D text-base font-normal">Task</h3>
                                                                     <AddIcon />

                                                                  </Fragment>
                                                                 ) }
                                                          </div>

                                                          <div className={`py-4 h-48 ${taskExpand && 'border-b-0'}  border-y-2 border-1d446933`}>
                                                            
                                                                <div className={`grid ${taskExpand ? 'grid-cols-3' : 'grid-cols-2'} mb-2`}>
                                                                      <div className="rounded-md border border-1D446933 p-2">
                                                                                <i className="bi bi-circle-fill text-D9D9D9"></i>
                                                                                <span className="m-6">No Status</span>
                                                                      </div>

                                                                      <span className={`flex items-center justify-end  ${taskExpand && 'order-last'}`}>{currentDate}</span>
                                                                      <div className={`${taskExpand && 'ms-8 flex items-center'}`}>
                                                                            <button type="button" className={`bg-transparent text-2999BC text-sm`}>Design</button>

                                                                      </div>
                                                                </div>

                                                                

                                                          </div>

                                                          <p className={`p-3 text-2C495D text-sm ${taskExpand && 'hidden'} `}>Hello World - Description test</p>
                                                </div>

                                                <div className="bg-white border border-1d446933 px-4 mb-4">
                                                          <div className="flex justify-between py-4">
                                                                 {taskExpand ? (
                                                                  <Fragment>
                                                                       <h3 className="text-2C495D font-semibold text-xl">Over Due</h3>
                                                                        <div className="flex justify-between w-[20%]">
                                                                            <button className="p-1 px-3 border border-E1E1E1 rounded-md text-2999BC text-sm font-500">View Over Due</button>
                                                                            <DownCircleArrow />
                                                                        </div>
                                                                  </Fragment>
                                                                
                                                                 ) : (
                                                                  <Fragment>
                                                                    <h3 className="text-2C495D font-normal text-base">Over Due</h3>
                                                                     <AddIcon />

                                                                  </Fragment>
                                                                 ) }
                                                          </div>

                                                          <div className={`py-4 h-48 ${taskExpand && 'border-b-0 mb-0'} border-y-2 border-1d446933 mb-9`}>
                                                           
                                                                <div className={`grid ${taskExpand ? 'grid-cols-3' : 'grid-cols-2'} mb-2`}>
                                                                      <div className="rounded-md border border-1D446933 p-2">
                                                                                <i className="bi bi-circle-fill text-D9D9D9"></i>
                                                                                <span className="m-6">No Status</span>
                                                                      </div>

                                                                      <span className={`flex items-center justify-end  ${taskExpand && 'order-last'}`}>{currentDate}</span>
                                                                      <div className={`${taskExpand && 'ms-8 flex items-center'}`}>
                                                                            <button type="button" className={`bg-transparent text-2999BC text-sm`}>Design</button>

                                                                      </div>
                                                                </div>

                                                                <p className="pt-3 text-2C495D text-sm">Hello World - Description test</p>

                                                          </div>

                                                </div>
                                                {/* h-[600px] overflow-auto */}
                                                <div className="bg-white border border-1d446933 px-4 mb-4 max-h-[600px] overflow-auto">
                                                          <div className="flex justify-between py-4">
                                                                 {taskExpand ? (
                                                                  <Fragment>
                                                                 <h3 className="text-2C495D font-semibold text-xl">Notes</h3>

                                                                  <div className="flex justify-between w-4/12">
                                                                    <button type="button" className="p-1 px-3 border border-E1E1E1 rounded-md text-2999BC text-sm font-500" onClick={() => handleNotesClick('allnotes')}>View All Notes</button>
                                                                    <button className="p-1 px-3 border border-E1E1E1 rounded-md text-2999BC text-sm font-500" onClick={() => handleNotesClick('addnotes')}>+ Add Notes</button>
                                                                    <DownCircleArrow />
                                                                  </div>
                                                                    
                                                                  </Fragment>
                                                                 ) : (
                                                                  <Fragment>
                                                                      <h3 className="text-2C495D font-normal text-base">Notes</h3>
                                                                      <AddIcon />

                                                                  </Fragment>
                                                                 ) }
                                                          </div>

                                                          {taskExpand ? (
                                                                        <Fragment>  

<div>
                                                                          <div className={`notes ${Object.values(viewNotes).some(value => value) ? 'show' : ''}`}>
                                                                                <ViewNotesData setNotesSetting={setNotesSetting} notesSetting={notesSetting} handleNotesClick={handleNotesClick}>

                                                                                  <div className={`grid ${viewNotes.addnotes ? 'show' : 'hidden'}`}>


                                                                                     <NotesEditor textareaRef={textareaRef} initialContent={initialContent} setInitialContent={setInitialContent} notesSetting={notesSetting} />
                                                                                              
                                                                                  </div>

                                                                                      
                                                                                </ViewNotesData >
                                                                                
                                                                                <NotesDropdown />


                                                                                {/* <Editor /> */}
                                                                               
                                                                          </div>
                                                                                      

                                                                               <AllNotesShow />      
                                                                               </div> 

                                                                        </Fragment>
                                                          ) : 
                                                          (
                                                            <Fragment>
                                                                  <div className="py-4 border-t-2 border-1d446933">


                                                                        <div className="flex justify-between rounded-md border border-1D446933 p-2 px-4">

                                                                                        <span className="ms-14">Risk</span>
                                                                                        <i className="bi bi-circle-fill text-FBB244"></i>

                                                                        </div>

                                                                        <div className="font-medium text-sm text-2C495D mt-3">Note 1 Hello World</div>

                                                                        <p className="mt-3 text-2C495D text-sm">Hello World - Description test</p>

                                                                  </div>

                                                                  <div className="py-4 border-t-2 border-1d446933">


                                                                          <div className="flex justify-between rounded-md border border-1D446933 p-2 px-4">

                                                                                          <span className="ms-14">Attention</span>
                                                                                          <i className="bi bi-circle-fill text-FBB244"></i>

                                                                          </div>

                                                                            <div className="font-medium text-sm text-2C495D mt-3">Note 2 Lorem Ipsum</div>

                                                                          <p className="mt-3 text-2C495D text-sm">Hello World - Description test</p>

                                                                  </div>
                                                            </Fragment>
                                                          )}

                                                </div>


                                                <div className="bg-white border border-1d446933 px-4 mb-4">
                                                          <div className="flex justify-between py-4">
                                                                
                                                               
                                                                 
                                                                 {taskExpand ? (
                                                                  <Fragment>
                                                                     <h3 className={`text-2C495D text-xl font-semibold`}>Upcoming Event</h3>
                                                                     <DownCircleArrow />

                                                                  </Fragment>
                                                                 ) : (
                                                                  <Fragment>
                                                                       <h3 className={`text-2C495D text-base font-normal`}>Upcoming Event</h3>
                                                                          <AddIcon />
                                                                  </Fragment>
                                                            
                                                                 ) }
                                                                 
                                                          </div>

                                                          {
                                                            taskExpand ?
                                                             (
                                                              <div className={`py-2`}>
                                                                   

                                                                      <div className="p-2 px-4">

                                                                            <div className="flex">
                                                                                    <div className="flex-1 flex">

                                                                                      <div className="border border-E8E9EA rounded-3xl w-[210px] flex justify-between items-center">
                                                                                          <button className="border-r border-E8E9EA p-2 px-4" onClick={goToPreMonth}><i className="bi bi-chevron-left text-8997A0"></i></button>
                                                                                            <span className="text-sm text-848687">
                                                                                            {calendarDate.toLocaleString('default', { month: 'long' })}
                                                                                              </span> 
                                                                                          <button className="border-l border-E8E9EA rounded-tr-3xl rounded-br-3xl p-2 px-4" onClick={goToNextMonth}><i className="bi bi-chevron-right text-8997A0"></i></button>
                                                                                      </div>

                                                                                      <div  className="h-full ms-3 relative">
                                                                                                  <button type="button" className="text-2999BC hover:text-F16136 focus:outline-none ms-3" onClick={calendarClick}>
                                                                                                    <span className="relative">
                                                                                                        <i className="bi bi-calendar text-2xl"></i>
                                                                                                        <div className="absolute right-0 top-0 left-0 text-[10px] ">{formatDate(calendarDate).slice(3,6)}</div>
                                                                                                    </span>
                                                                                                  </button>

                                                                                                  {
                                                                                                          calendarOpen  && (
                                                                                                          <Fragment>
                                                                                                          <DatePicker 
                                                                                                            selected={calendarDate} 
                                                                                                            onChange={calendarDateChange}  
                                                                                                            holidays={[
                                                                                                              { date: "2024-01-26", holidayName: "Republic Day" },
                                                                                                              { date: "2024-08-15", holidayName: "Independence Day" },
                                                                                                              { date: "2024-10-02", holidayName: "Mahatma Gandhi" },
                                                                                                              { date: "2024-10-31", holidayName: "Diwali" },
                                                                                                              { date: "2024-12-25", holidayName: "Christmas Day" },
                                                                                                              { date: "2024-12-31", holidayName: "New Year Eve" },
                                                                                                            ]}
                                                                                                            inline  
                                                                                                            filterDate={isWeekday}
                                                                                                            dayClassName={(date) => {
                                                                                                              const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Saturday or Sunday
                                                                                                              return isWeekend ? 'satsunweek' : 'montofriweek';
                                                                                                            }}
                                                                                                            closeOnScroll={true}
                                                                                                            onClickOutside={() => {
                                                                                                                setCalendarOpen(false);
                                                                                                            }}
                                                                                                            calendarClassName="customercalendar left-12"
                                                                                                            calendarStartDay={1}
                                                                                                             >
                                                                                                                    <div>
                                                                                                                      <button className="bg-1D4469 text-white font-500 text-18 py-2 px-4 mx-5" onClick={() => {setCalendarDate(new Date());} }>Today</button>
                                                                                                                      <button className="bg-F4F4F4 text-535252 border border-EAE2E2 font-500 text-18 py-2 px-4 ms-6" onClick={() => setCalendarOpen(false)}>Close</button>
                                                                                                                    </div>
                                                                                                              </DatePicker>
                                                                                                                    
                                                                                                             </Fragment>
                                                                                                             )
                                                                                                      

                                                                                                        }
                                                                                      </div>

                                                                                    </div>

                                                                                      <div>
                                                                                                <button
                                                                                                  className={`${
                                                                                                    activeCalendarTab === 1 ? 'shadow-5 border-E8E9EA text-2C495D' : 'border-F8F8F8 text-848687'
                                                                                                  } border  px-4 py-1 mx-1 text-sm font-normal focus:outline-none`}
                                                                                                  onClick={() => changeTab(1)}
                                                                                                >
                                                                                                  WEEKS
                                                                                                </button>
                                                                                                <button
                                                                                                  className={`${
                                                                                                    activeCalendarTab === 2 ? 'shadow-5 border-E8E9EA text-2C495D' : 'border-F8F8F8 text-848687'
                                                                                                  } border  px-4 py-1 mx-1 text-sm font-normal focus:outline-none`}
                                                                                                  onClick={() => changeTab(2)}
                                                                                                >
                                                                                                  MONTH
                                                                                                </button>
                                                                                      </div>
                                                                            </div>

                                                                      </div>

                                                                      {activeCalendarTab === 2 ? 
                                                                           <MonthCalendar value={calendarDate}/>
                                                                      :
                                                                           <WeekCalendar  value={calendarDate}/>
                                                                      }
                                                                      

                                                                   

                                                              </div>
                                                             
                                                             ) :
                                                             (
                                                              <div className={`py-2 border-t-2 border-1d446933`}>


                                                                      <div className="border border-1D446933 p-2 px-4">

                                                                            <div className="flex flex-wrap">
                                                                                      <div className="">
                                                                                          <button className="bg-F2F2F2 rounded-sm p-1" onClick={goToPreviousDate}><i className="bi bi-chevron-left"></i></button>
                                                                                            <span className="text-sm text-848687 px-12">
                                                                                              {formatDate(calendarDate)}
                                                                                            </span> 
                                                                                          <button className="bg-F2F2F2 rounded-sm p-1" onClick={goToNextDate}><i className="bi bi-chevron-right"></i></button>
                                                                                      </div>

                                                                                      <div  className="h-full border-s border-1D446933 ms-3 relative">
                                                                                                  <button type="button" className="text-2999BC hover:text-F16136 focus:outline-none ms-3" onClick={calendarClick}>
                                                                                                    <span className="relative">
                                                                                                        <i className="bi bi-calendar text-2xl"></i>
                                                                                                        <div className="absolute right-0 top-0 left-0 text-xs ">{formatDate(calendarDate).slice(3,6)}</div>
                                                                                                    </span>
                                                                                                  </button>
                                                                                                        {
                                                                                                          calendarOpen  && (
                                                                                                          <Fragment>
                                                                                                          <DatePicker 
                                                                                                            selected={calendarDate} 
                                                                                                            onChange={calendarDateChange}  
                                                                                                            holidays={[
                                                                                                              { date: "2024-01-26", holidayName: "Republic Day" },
                                                                                                              { date: "2024-08-15", holidayName: "Independence Day" },
                                                                                                              { date: "2024-10-02", holidayName: "Mahatma Gandhi" },
                                                                                                              { date: "2024-10-31", holidayName: "Diwali" },
                                                                                                              { date: "2024-12-25", holidayName: "Christmas Day" },
                                                                                                              { date: "2024-12-31", holidayName: "New Year Eve" },
                                                                                                            ]}
                                                                                                            inline  
                                                                                                            filterDate={isWeekday}
                                                                                                            dayClassName={(date) => {
                                                                                                              const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Saturday or Sunday
                                                                                                              return isWeekend ? 'satsunweek' : 'montofriweek';
                                                                                                            }}
                                                                                                            closeOnScroll={true}
                                                                                                            onClickOutside={() => {
                                                                                                                setCalendarOpen(false);
                                                                                                            }}
                                                                                                            calendarClassName="customercalendar top-full right-0"
                                                                                                            calendarStartDay={1}
                                                                                                             >
                                                                                                                    <div>
                                                                                                                      <button className="bg-1D4469 text-white font-500 text-18 py-2 px-4 mx-5" onClick={() => {setCalendarDate(new Date());} }>Today</button>
                                                                                                                      <button className="bg-F4F4F4 text-535252 border border-EAE2E2 font-500 text-18 py-2 px-4 ms-6" onClick={() => setCalendarOpen(false)}>Close</button>
                                                                                                                    </div>
                                                                                                              </DatePicker>
                                                                                                                    
                                                                                                             </Fragment>
                                                                                                             )
                                                                                                      

                                                                                                        }
                                                                                                  

                                                                                      </div>
                                                                            </div>

                                                                      </div>
                                                                                    
                                                                  <div className="border border-E8E9EA my-5 p-4 relative">
                                                                                    
                                                                      <i className="border-y-[25px] border-transparent border-r-[25px] border-r-2999BC w-0 h-0 rotate-45 absolute top-[-16px] left-[-4px] text-2999BC"></i>
                                                                                    
                                                                                    
                                                                      <div className="flex justify-between mb-3">
                                                                        <span>{formatDate(calendarDate).slice(0,2)}</span>
                                                                        <span><i className="bi bi-plus-circle text-606061"></i></span>
                                                                      </div>
                                                                      {/* <div > */}
                                                                          {/* Design */}
                                                                          <textarea rows={6} className="text-2C495D bg-F5F0E9 border border-2c495d33 text-sm w-full p-3">
                                                                                    
                                                                          </textarea>
                                                                      {/* </div> */}
                                                                  </div>
                                                                                    
                                                              </div>
                                                             )
                                                          }

                                                         

                                                </div>
                                           
                                    </div>

                                    {/* <div>hfgjhkj</div> */}


                                </div>
                                
                       
                    </div>
            </main>
         );
}

export default LayoutHOC(AddCustomer1);