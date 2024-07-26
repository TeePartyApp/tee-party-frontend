import React, { useState, useEffect } from "react";
import './Matches.css';
import axios from "axios";

export function MatchesIndex(props) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  

  const handleClick = (match) => {
    setSelectedMatch(match);
  }

  const handleUnmatch = () => {
    if (selectedMatch) {
      axios.delete(`http://localhost:3000/matches/${selectedMatch.id}.json`)
        .then((response) => {
          console.log("You have been unmatched from:", response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error("Error unmatching user:", error);
        });
    }
  };
  
  return (
    <div>
      <h1 className="header">Matches</h1>
      <div className="matches-container">
        {props.matches.length > 0 ? (
          <>
            <div className="profiles">
              {props.matches.map(match => (
                <div key={match.id} className="profile" onClick={() => handleClick(match)}>
                  <img src={match.matched_user.image_url} alt={match.matched_user.name} className="profile-image" />
                  <p className="profile-name">{match.matched_user.name}</p>
                </div>
              ))}
            </div>
            {selectedMatch ? (
              <div className="body">
                <div className="card">
                  <img className="card-img-top" src={selectedMatch.matched_user.image_url} alt={selectedMatch.matched_user.name} />
                  <h2 className="card-title">{selectedMatch.matched_user.name}</h2>
                  <p className="card-text">{selectedMatch.matched_user.info}</p>
                  <div className="card-buttons">
                    <button className="btn btn-secondary">Message</button>
                    <button className="btn btn-secondary" onClick={handleUnmatch}>Unmatch</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="blank-page-message">
                Select a user to start chatting!
              </div>
            )}
          </>
        ) : (
          <div className="blank-page-message">
            You do not have any matches, go back to the home page and start liking!
          </div>
        )}
      </div>
    </div>
  );
}
