// DocumentForm.js

import React from 'react';

const DocumentForm = ({ documentData, onInputChange, onCreateDocument }) => {
  return (
    <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Document Type
        </label>
        <select
          name="documentType"
          value={documentData.documentType}
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Invoice">Invoice</option>
          <option value="Receipt">Receipt</option>
          <option value="Quotation">Quotation</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={documentData.dueDate}
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Add more fields as needed */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCreateDocument}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Document
        </button>
      </div>
    </form>
  );
};

export default DocumentForm;
