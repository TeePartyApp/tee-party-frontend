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
            <div className="body">
              <div className="card">
                <img className="card-img-top" src={selectedUser.image_url} alt={selectedUser.name} />
                <h2 className="card-title">{selectedUser.name}</h2>
                <p className="card-text">{selectedUser.info}</p>
                <div className="card-buttons">
                  <button className="btn btn-secondary">Message</button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
