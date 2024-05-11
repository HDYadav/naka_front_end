import React, { useState, useEffect, Fragment } from "react";  
import LayoutHOC from "../LayoutHOC";
import { Link } from 'react-router-dom';

const Customer = () =>{


    return <Fragment>
            <main id="maincontent">
                <div className="p-4 mt-14">

                            <div className="flex flex-col bg-white p-4">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-203C50 font-Vietnam text-[28px] font-medium">Customer List</h5>
                                    <div className="flex items-center">


                                        <Link to="/add_customer" className="bg-1D4469 rounded-sm text-white rounded p-2 px-5 text-[14px]" type="button">+ Add Customer</Link>
                                        <i className="bi bi-three-dots-vertical text-2xl text-535252"></i>


                                    </div>
                                </div>
                            </div> 

                    <div className="mb-4 border-gray-200">
                        <ul className="flex flex-wrap text-md font-poppins text-base font-normal text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-2C495D hover:text-2C495D border-b" data-tabs-inactive-classes="border-transparent text-2C495D hover:text-gray-600 hover:border-gray-300" role="tablist">
                            <li className="me-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 border-2C495D rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Active Customer </button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 border-2C495D rounded-t-lg hover:text-gray-600 hover:border-gray-300 " id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Business</button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 border-2C495D rounded-t-lg hover:text-gray-600 hover:border-gray-300 " id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Individual</button>
                            </li>
                            <li role="presentation">
                                <button className="inline-block p-4 border-b-2 border-2C495D rounded-t-lg hover:text-gray-600 hover:border-gray-300 " id="contacts-styled-tab" data-tabs-target="#styled-contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Prospect</button>
                            </li>
                        </ul>
                    </div>
                    <div id="default-styled-tab-content">
                        <div className="" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                            <table className="bg-white min-w-full border border-neutral-200 text-center text-sm text-surface text-2C495D font-poppins">
                                <thead className="border-neutral-200 border">
                                    <tr>
                                        <th scope="col" className="font-normal px-6 py-3 text-left border">
                                            <div className="flex justify-between">
                                                customer name
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="font-normal px-6 py-3 text-left border">
                                            <div className="flex justify-between">
                                                customer display name
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="font-normal px-6 py-3 text-left border">
                                            <div className="flex justify-between">
                                                currency
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="font-normal px-6 py-3 text-left border">
                                            <div className="flex justify-between">
                                                status
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="font-normal px-6 py-3 text-left border">
                                            <div className="flex justify-between">
                                                industry
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg></a>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border">
                                    <tr className="border border-neutral-200 ">
                                        <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 text-2999BC px-6 py-2 font-medium text-left">Shashi</td>
                                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">Raj </td>
                                        <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">Shashi</td>
                                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">Raj </td>
                                        <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">0 123 456 7890</td>
                                    </tr>
                                    {/* More rows here */}
                                </tbody>
                            </table>

                        </div>
                        <div className="hidden p-4 rounded-lg" id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                            {/* Content for dashboard tab */}
                        </div>
                        <div className="hidden p-4 rounded-lg" id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
                            {/* Content for settings tab */}
                        </div>
                        <div className="hidden p-4 rounded-lg" id="styled-contacts" role="tabpanel" aria-labelledby="contacts-tab">
                            {/* Content for contacts tab */}
                        </div>
                    </div> 

                </div> 
            </main>
        </Fragment>
}


export default LayoutHOC(Customer);

 