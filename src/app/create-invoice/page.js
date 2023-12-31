"use client"
import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import { PeslacContext } from '@/contexts/PeslacContext';
import DocumentForm from '@/components/documents/DocumentForm'; // Import your DocumentForm component

const DocumentCreatePage = () => {
  const ctx = useContext(PeslacContext);
  const cookies = new Cookies();
  const wareflow_access_token = cookies.get('accessToken');
  const [documentData, setDocumentData] = useState({
    // Initial state for the document fields
    // You may customize this based on your document schema
    field1: '',
    field2: '',
    // ... add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateDocument = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/document/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${wareflow_access_token}`,
          },
          credentials: 'include',
          body: JSON.stringify(documentData),
        }
      );
      const data = await response.json();

      // Handle success or display an error message
      if (data.success) {
        // Optionally, you can redirect the user to the created document or another page
        console.log('Document created:', data.newDocument);
      } else {
        console.error('Error creating document:', data.message);
      }
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4">Create a New Document</h2>
      <DocumentForm
        documentData={documentData}
        onInputChange={handleInputChange}
        onCreateDocument={handleCreateDocument}
      />
    </div>
  );
};

export default DocumentCreatePage;
