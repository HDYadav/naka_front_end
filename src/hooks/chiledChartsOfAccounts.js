import React from 'react';

function chiledChartsOfAccounts({ value, onResponse }) {
  // Function to handle some action and return a response
  const handleAction = () => {
    // Do something with the value passed from the parent component
    const response = `Received value: ${value}`;
    
    // Call the callback function with the response
    onResponse(response);
  };

  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={handleAction}>Click me</button>
    </div>
  );
}

export default chiledChartsOfAccounts;
