// Import necessary modules and components
'use client';
import React, { createContext, useState, useEffect } from 'react';
import verifyToken from '../helpers/verifyToken';
import peslacLogOut from '../helpers/peslacLogOut';
import Cookies from 'universal-cookie';
import { usePathname, useRouter } from 'next/navigation';

// Create a new context called 'PeslacContext'
const PeslacContext = createContext({
  access_token: null,
  opened: false,
  setOpened: () => {},
  user: null,
  isLoading: true,
  setIsLoading: () => {},
  login: () => {},
  logout: () => {},
  active: '/',
  setActivePage: () => {},
  navStyle: 'slim',
  setNavStyle: () => {},
});

// Create a provider component named 'PeslacProvider'
const PeslacProvider = ({ children }) => {
  // Access the 'next/navigation' router and pathname hook
  const router = useRouter();
  const pathname = usePathname();

  // Create a new instance of 'Cookies' to manage cookies
  const cookies = new Cookies();

  // Retrieve the 'accessToken' from cookies
  const wareflow_access_token = cookies.get('accessToken');

  // State variables managed by 'useState' hooks
  const [token, setToken] = useState(wareflow_access_token);
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('/');
  const [isLoading, setIsLoading] = useState(true);
  const [navStyle, setNavStyle] = useState('slim');

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    setIsLoading(true);

    // Set the default color scheme value in local storage
    localStorage.setItem('mantine-color-scheme-value', 'light');

    const fetchUserData = async () => {
      try {
        // Verify the token and get user data
        const verifiedUser = await verifyToken(token);

        if (verifiedUser) {
          setUser(verifiedUser);
          setIsLoading(false);
        } else {
          setUser(null);
          router.refresh();
        }
      } catch (err) {
        setIsLoading(false);
        setUser(null);
        router.refresh();
      } finally {
        setIsLoading(false);
      }
    };

    // Call the 'fetchUserData' function
    fetchUserData();
  }, [token]);

  // Function to handle user login
  const login = (user) => {
    cookies.set('accessToken', user.accessToken);
    router.push('/');
    setUser(user);
    setIsLoading(false);
  };

  // Function to handle user logout
  const logout = async () => {
    setUser(null);
    cookies.remove('accessToken');
    router.push('/login');
    // Here, you might also want to handle the cleanup like removing tokens or cookies
  };

  // Function to set the active page
  const setActivePage = (page) => {
    setActive(page);
  };

  // Function to set the navigation style
  const setNav = (style) => {
    setNavStyle(style);
  };

  // Provide the context value to the wrapped components
  return (
    <PeslacContext.Provider
      value={{
        opened,
        setOpened,
        user,
        isLoading,
        setIsLoading,
        login,
        logout,
        active,
        setActivePage,
        navStyle,
        setNav,
      }}
    >
      {children}
    </PeslacContext.Provider>
  );
};

// Export 'PeslacContext' and 'PeslacProvider' for use in other components
export { PeslacContext };
export default PeslacProvider;
