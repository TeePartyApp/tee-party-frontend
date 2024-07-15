import React, { useState, useEffect } from "react";
import axios from "axios";

export function MatchesIndex(props) {
  return (
    <div>
      <h1>{props.matches.map(match => (
        <div>
          <img src={match.matched_user.image_url} />
          {match.matched_user.name}
          <br/>
          <br/>
        </div>
      ))}</h1>
    </div>
  );
}
