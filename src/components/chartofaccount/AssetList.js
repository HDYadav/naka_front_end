import React, { useState, useEffect  } from 'react';
import { CHARTS_OF_ACCOUNTS } from "../../utils/constants";
import useRequireAuth from "../../utils/useRequireAuth";
import LayoutHOC from "../LayoutHOC";
import Accordion from "./Accordion";
import AddAccount from './AddAccount';


const AssetList = ()=> {
    const auth = useRequireAuth();  
    const [data_chatofacc, setChardata] = useState(null);
    const [accordions, setAccordion] = useState([]);

    const fetchcoaData = async () => {
        try {
            const Authtoken = auth.token;
            const response = await fetch(CHARTS_OF_ACCOUNTS, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Authtoken}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            setChardata(data);
            createaccord(data); // Call createaccord function with fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
            setChardata(null);
        }
    };

    useEffect(() => {
        if (auth.token) {
            fetchcoaData();
        }
    }, [auth.token]);

    /* function generateData(data){
        console.log(data);
    } */
    const generateData = (children) => {
        if (Array.isArray(children)) {
            return (
                <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="bg-E6ECF1 px-6 py-4 text-2C495D text-left font-normal text-base">Code</th>
                            <th scope="col" className="bg-E6ECF1 px-6 py-4 text-2C495D text-left font-normal text-base">Name</th>
                            <th scope="col" className="bg-E6ECF1 px-6 py-4 text-2C495D text-left font-normal text-base">Detail Type</th>
                            <th scope="col" className="bg-E6ECF1 px-6 py-4 text-2C495D text-left font-normal text-base">Balance</th>
                            <th scope="col" className="bg-E6ECF1 px-6 py-4 text-2C495D text-left font-normal text-base text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children.map(child => (
                            <tr key={child.id} className="border-neutral-200">
                                <td className="whitespace-nowrap border-b border-e border-s text-cyan-600 border-neutral-200 px-6 py-2 font-normal text-left">{child.code}</td>
                                <td className="whitespace-nowrap border-b border-e border-s text-cyan-600 border-neutral-200 px-6 py-2 font-normal text-left">{child.name}</td>
                                <td className="whitespace-nowrap border-b border-e border-s text-cyan-600 border-neutral-200 px-6 py-2 font-normal text-left">{child.detailType}</td>
                                <td className="whitespace-nowrap border-b border-e border-s text-cyan-600 border-neutral-200 px-6 py-2 font-normal text-left">{child.balance}</td>
                                <td className="whitespace-nowrap border-b border-e border-s text-cyan-600 border-neutral-200 px-6 py-2 font-normal text-center"><button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F16136" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F16136" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            );
        }
        // Handle case where children is not an array
        return null;
    };
    

    const createaccord = (data_chatofacc) => { // Accept data_chatofacc as parameter
        if (data_chatofacc) {
            const updatedAccordions = data_chatofacc.map(item => ({
                key: item.id,
                title: item.name,
                data: generateData(item.children),
                isOpen: item.id === 1 // Set isOpen based on item.id
            }));
            setAccordion(updatedAccordions);
        }
    };

    const toggleAccordion = (accordionKey) => {
        const updatedAccordions = accordions.map((accord) => ({
            ...accord,
            isOpen: accord.key === accordionKey ? !accord.isOpen : false
        }));
        setAccordion(updatedAccordions);
    };


    // const [isOpen, setIsOpen] = useState(false);

    // const openPopup = () => { 
    //     setIsOpen(true);
    // };

    // const closePopup = () => {
    //     setIsOpen(false);
    // };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <main id="maincontent">
        <div className="flex-1 bg-F1F6F9 mt-16">
            <div className='bg-White pl-3'>
                <h5 className=" font-Vietnam text-2xl font-medium p-4">Chart Of Accountants</h5>
            </div>
            <div className="flex p-4 justify-between text-2C495D font-poppins text-base font-normal">
                <div className="flex p-4 gap-x-10">
                    <p className="cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D">Bank Transaction</p>
                    <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>App Transaction</p>
                    <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>Reciepts</p>
                    <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>Reconcil</p>
                    <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>Rules</p>
                    <p className='border-b-2 border-2C495D cursor-pointer hover:cursor-wai'>Chartered Accountants</p>
                </div>
            </div>
            <section>
                <div className="flex">
                    <div className="flex bg-white py-3 w-2/3  px-5 ms-7">
                        <button type="button" className="px-5">All</button>
                        <button onClick={() => toggleAccordion(1)} type="button" className="px-5 text-F16136">Assets</button>
                        <button onClick={() => toggleAccordion(2)} type="button" className="px-5">Lability/Credit Card</button>
                        <button onClick={() => toggleAccordion(3)} type="button" className="px-5">Income</button>
                        <button onClick={() => toggleAccordion(4)} type="button" className="px-5">Expenses</button>
                        <button onClick={() => toggleAccordion(5)} type="button" className="px-5">Equity</button>
                        <button onClick={() => toggleAccordion(6)} type="button" className="px-5">Archive</button>
                    </div>
                    <div className="box-content flex flex-col justify-center w-14 h-[50px] border-1 border-solid bg-white border-BECBD3 ml-4">
                        <button onClick={openPopup} className="text-center text-288FB2 text-32" type="button">+</button>
                    </div>
                     
                </div>
            </section>
            <>
            {isPopupOpen && (
                <AddAccount isOpen={isPopupOpen}  onClose={closePopup} />
            )}
            </>
            <div className="m-5">
                {accordions.map((accordion) => (
                    <Accordion
                        key={accordion.key}
                        title={accordion.title}
                        data={accordion.data}
                        isOpen={accordion.isOpen}
                        toggleAccordion={() => toggleAccordion(accordion.key)} />
                ))}
            </div>
        </div>

        </main>
    );
}

export default LayoutHOC(AssetList);