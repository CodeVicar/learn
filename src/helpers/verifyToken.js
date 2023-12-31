// Define a function for verifying a user's access token
const verifyToken = async (wareflow_access_token) => {
  try {
    // Make a fetch request to the server's '/auth/verify' endpoint
    const verifyTokenRes = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/auth/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${wareflow_access_token}`,
        },
        credentials: 'include', // Include credentials (cookies) with the request
      }
    );

    // Check if the response status is not 200 (OK)
    if (verifyTokenRes.status !== 200) {
      // If not 200, return null indicating verification failure
      return null;
    }

    // Parse the JSON data from the response
    const data = await verifyTokenRes.json();

    // Return the parsed data, which may contain information about the verified user
    return data;
  } catch (error) {
    // Handle errors by returning null
    return null;
  }
};

// Export the verifyToken function for external use
export default verifyToken;
