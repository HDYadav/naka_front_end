import React, { useState } from 'react';

function AccordianTable() {
  // Define state to manage accordion visibility and table data
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Function to fetch table data (you need to implement this)
  const fetchTableData = () => {
    // Fetch data from API or other source
    // For demonstration, I'm just setting sample data
    const data = [
      { id: 1, name: 'Item 1', quantity: 10 },
      { id: 2, name: 'Item 2', quantity: 5 },
      { id: 3, name: 'Item 3', quantity: 8 }
    ];
    setTableData(data);
  };

  // Function to toggle accordion visibility and fetch data
  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
    if (!accordionOpen) {
      fetchTableData();
    }
  };

  return (
    <div>
      <button onClick={toggleAccordion}>
        {accordionOpen ? 'Hide Table' : 'Show Table'}
      </button>
      {accordionOpen && (
        <div className="accordion-content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AccordianTable;
