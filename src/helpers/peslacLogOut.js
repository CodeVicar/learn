// Import the necessary dependencies
'use client';
import Cookies from 'universal-cookie';
import { usePathname } from 'next/navigation';

// Define a function for logging out a user
const peslacLogOut = async () => {
  // Get the current pathname using the usePathname hook from next/navigation
  const pathname = usePathname();

  // Create an instance of the Cookies class
  const cookies = new Cookies();

  // Remove the 'peslac_access_token' cookie
  cookies.remove('peslac_access_token');
};

// Export the peslacLogOut function for external use
export default peslacLogOut;
