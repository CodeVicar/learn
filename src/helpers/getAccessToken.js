// Import the necessary dependencies
'use client';
import Cookies from 'universal-cookie';

// Define a function to retrieve the access token from cookies
export default function getAccessToken() {
  // Create an instance of the Cookies class
  const cookies = new Cookies();
  
  // Get the 'peslac_access_token' from cookies
  const peslac_access_token = cookies.get('peslac_access_token');
  
  // Return the retrieved access token (or null if not found)
  return peslac_access_token;
}
