"use client"
// components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 201) {
        // Registration successful, you can redirect the user to the login page
        router.push('/login');
      }
    } catch (error) {
      // Handle registration error
      if (error.response && error.response.data) {
        // If the server returns an error message, use that
        setError(error.response.data.message);
      } else {
        // Otherwise, use a generic error message
        setError('Registration failed. Please check your information.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Your form fields go here */}
        {/* Example: */}
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
        />

        <label>First Name:</label>
        <input
          type='text'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
        />

        {/* Add other form fields as needed */}
        {/* ... */}

        <button type='submit' disabled={loading}>
          Sign up
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Please ensure that your registration information is accurate.</p>
    </div>
  );
};

export default Register;
