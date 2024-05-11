import React, { useState } from 'react';

import LayoutHOC from "../LayoutHOC";
import { CHARTS_OF_ACCOUNTS } from '../../utils/constants';
import { Link } from 'react-router-dom';

const Importcha = () => {
    

    const [isOpen, setIsOpen] = useState(true);

    const openPopup = () => {
        setIsOpen(true);
    };

    /* const closePopup = () => {
        setIsOpen(false);
    }; */
  
    return (
        <main id="maincontent">
           <div className="flex-1 bg-F1F6F9 mt-16">
                <div>
                    <div className='bg-White pl-3'><h5 className="font-Vietnam text-2xl font-medium p-4">Chartered Accountants</h5></div>
                    <div className="flex p-4 justify-between text-2C495D font-poppins text-base font-normal">
                        <div className="flex p-4 gap-x-10">
                            <p className="cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D">Bank Transaction</p>
                            <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>App Transaction</p>
                            <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>Reciepts</p>
                            <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>Reconcil</p>
                            <p className='cursor-pointer hover:cursor-wai hover:border-b-2 border-2C495D'>Rules</p>
                            <p onClick={openPopup} className='border-b-2 border-2C495D cursor-pointer hover:cursor-wai'>Chartered Accountants</p>
                        </div>
                        <div className="box-content flex flex-col justify-center w-[150px] h-[50px] gap-[16px] border-[1.5px] mr-16 border-solid bg-white border-BECBD3">
                            <button className="text-center text-6C94A1 text-base">Generate</button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="fixed inset-y-0 inset-x-150 z-[999] grid h-screen w-5/6 place-items-center bg-opacity-0 transition-opacity duration-300 mt-20">
                        <div className="relative p-4 mt-10 w-1/2 min-w-[50%] max-w-[50%] bg-white border border-E5ECF0 font-poppins leading-relaxed antialiased shadow-1">
                            <div className="py-2 px-8 mb-2 bg-EDF3F7">
                                <div className="flex justify-between">
                                    <div className="font-500 text-2C495D">Import Chartered Accountants</div>

                                    <div className="text-F16136 font-500 border-l-2 border-CFCFCF">
                                        <button className="ml-5">Set Default</button>
                                    </div>
                                </div>
                            </div>
                            <form className="py-4 space-x-6">
                                <div className="flex justify-between">
                                    <label className="block">
                                        <input type="file" className="block w-full text-md text-slate-500 border border-BFBFBF
                                            file:mr-4 file:py-2 file:px-4
                                            file:border-0
                                            file:text-sm 
                                            file:bg-EFEFEF file:text-535252
                                            hover:file:bg-violet-100
                                        " />
                                    </label>
                                    <button className="bg-1D4469 text-white hover:bg-1D4469 hover:text-F16136 text-1D4469 border-2 border-DCDCDC text-xl py-1 px-8">
                                        Import
                                    </button>
                                </div>
                            </form>
                            <div className="text-xl py-3 border-t border-t-E6EFF3">Select Industry</div>                   
                            <div className="pb-4 flex flex-wrap gap-6 justify-center text-center text-xl text-1D4469">
                                <Link to="/asset_chart_of_account" className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Real Estate</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Manufacturing</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Restaurants</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Construction</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Healthcare and Medical</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">E commerce</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Legal and Law</Link>
                                <Link to="/asset_chart_of_account"  className="bg-E6ECF1 h-[72px] w-44 flex justify-center items-center text-lg cursor-pointer hover:cursor-wai">Non-Profit Organizations</Link>  
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </main>
            )
};

export default LayoutHOC(Importcha);