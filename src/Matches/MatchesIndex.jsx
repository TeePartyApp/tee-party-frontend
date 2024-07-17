import React, { useState, useEffect } from "react";
import './Matches.css';

export function MatchesIndex(props) {
  const [selectedUser, seSelectedUser] = useState(null);

  

  const handleClick = (user) => {
    seSelectedUser(user);
  }
  
  return (
    <div className="matches-container">
      <div className="profiles">
        {props.matches.map(match => (
          <div key={match.id} className="profile" onClick={() => handleClick(user)}>
            <img src={match.matched_user.image_url} alt={match.matched_user.name} className="profile-image" />
            <p className="profile-name">{match.matched_user.name}</p>
          </div>
        ))}
      </div>
      {/* <div className="info-card">
        <img src={match.matched_user.image_url} alt={match.matched_user.name} className="info-image" />
        <h2 className="info-name">{match.matched_user.name}</h2>
        <p className="info-details">{match.matched_user.info}</p>
      </div> */}
    </div>
  );
}
