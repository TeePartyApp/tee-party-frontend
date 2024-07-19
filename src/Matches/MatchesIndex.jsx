import React, { useState, useEffect } from "react";
import './Matches.css';

export function MatchesIndex(props) {
  const [selectedUser, seSelectedUser] = useState(null);

  

  const handleClick = (match) => {
    seSelectedUser(match.matched_user);
  }
  
  return (
    <div>
      <h1 className="header">Matches</h1>
        <div className="matches-container">
          <div className="profiles">
            {props.matches.map(match => (
              <div key={match.id} className="profile" onClick={() => handleClick(match)}>
                <img src={match.matched_user.image_url} alt={match.matched_user.name} className="profile-image" />
                <p className="profile-name">{match.matched_user.name}</p>
              </div>
            ))}
          </div>
          {selectedUser && (
          <div className="info-card">
            <img src={selectedUser.image_url} alt={selectedUser.name} className="info-image" />
            <h2 className="info-name">{selectedUser.name}</h2>
            <p className="info-details">{selectedUser.info}</p>
          </div>
          )}
        </div>
    </div>
  );
}
