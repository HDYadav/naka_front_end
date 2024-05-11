import React from 'react'
import LayoutHOC from '../LayoutHOC';
import CompanyProfile from './CompanyProfile';
import CompanyLeftHOC from '../CompanyLeftHOC'; 
import CompanyBilling from './CompanyBilling';
import AddContact from './AddContact';
import AddAddress from './AddAddress';

function AddCompany() {
  return (
    <main className="p-4 sm:ml-64">
      <div className="p-4 mt-14"> 
    <div className="bg-F1F6F9 font-poppins">
    <div className="flex flex-col bg-white p-4 ">
      <div className="ms-4 flex justify-between items-center">
        <h5 className=" text-203C50 font-Vietnam text-32 font-medium ">
         New Company
        </h5>
        <div className="relative">
          <div>
            <label className="switch">
              <input type="checkbox" defaultValue="" className="sr-only peer" defaultChecked=""
              />
              <div className="relative w-11 h-6  rounded-full  peer-focus:ring-2 peer-focus:ring-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white  after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600" />
            </label>
          </div>
        </div>
      </div>
    </div>

    
  <CompanyProfile />  
  <CompanyBilling />
  <AddAddress /> 
  <AddContact />  
    
    <div id="default-styled-tab-content">
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div className="bg-white p-5 h-screen m-10 overflow-x-scroll">
          <table className="min-w-full border border-neutral-200 text-center text-sm  text-surface text-2C495D font-poppins  ">
            <thead className="border-neutral-200 border ">
              <tr>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Client Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Display Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    First Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Last Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Phone Number
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Email
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th
                  scope="col"
                  className="font-normal px-6 py-3 text-left border"
                >
                  <div className="flex justify-between">
                    Tax Number
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="border">
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 text-2999BC px-6 py-2 font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
              <tr className="border border-neutral-200 ">
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 text-2999BC font-medium text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-s border-neutral-200 px-6 py-2 font-normal text-left">
                  Shashi
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  Raj{" "}
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  0 123 456 7890
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  shashi.r@globalfpo.com
                </td>
                <td className="whitespace-nowrap border-b border-e border-neutral-200 px-6 py-2 text-2C495D font-normal text-left">
                  5486548225
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      ></div>
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-settings"
        role="tabpanel"
        aria-labelledby="settings-tab"
      ></div>
      <div
        className="hidden p-4 rounded-lg bg-gray-50"
        id="styled-contacts"
        role="tabpanel"
        aria-labelledby="contacts-tab"
      ></div>
    </div>
  </div>
  </div>

  </main>
  )
}


//export default LayoutHOC(AddCompany);

export default CompanyLeftHOC(AddCompany);