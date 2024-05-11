import React, { useState } from 'react';

const AddressType = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='px-10'>
      <select className='rounded-2xl p-1' value={selectedValue} onChange={handleDropdownChange}>
        <option value="Default">Default</option>
        <option value="Primary">Primary</option>
        <option value="Legal Address">Legal Address</option>
      </select>
    </div>
  );
}

export default AddressType;
