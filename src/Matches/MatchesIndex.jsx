import React, { useState, useEffect } from "react";
import axios from "axios";

export function MatchesIndex(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const fetchJwtToken = () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        setJwtToken(token);
        decryptionToken(token); // Call decryption function here
      }
    };

    fetchJwtToken();
  }, []); // Only fetch token once on component mount

  const decryptionToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:3000/sessions/decrypt_jwt', { token });
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      console.error('Error decrypting token:', error);
      setError('Invalid token');
    }
  };

  const filterMatches = (user_id) => {
    if (user) {
      return props.matches.filter((match) => match.user_id === user.id && match.status === "accepted").map((match) => (
        <div key={match.id}>
          <h2>Matched User ID: {match.matched_user_id}</h2>
        </div>
      ));
    } else {
      return null;
    }
  }

  return (
    <div>
      {/* Render user information or handle errors */}
      {user ? (
        <div>
          <h1>{filterMatches()}</h1>
          {/* Display other user information */}
        </div>
      ) : (
        <p>{error ? `Error: ${error}` : 'Loading...'}</p>
      )}
    </div>
  );
}
