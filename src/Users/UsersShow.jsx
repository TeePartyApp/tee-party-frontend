import { useState, useEffect } from "react";
import axios from "axios";
import './UsersShow.css';

export function UsersShow(props) {
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    handicap: "",
    gir: "",
    fairways_hit: "",
    putts_per_round: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/users/current_user.json`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [props.user.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateUser(props.user.id, params, () => event.target.reset());
  };
  
  const handleClick = () => {
    props.onDestroyUser(props.user.id);
    window.location.href = "/";
  }

  return (
    <div>
      <h1 className="header">Edit Profile</h1>
      <div>
        <form className="form" onSubmit={handleSubmit}> 
          <div className="text">
            Name: <input className="input" defaultValue={userData.name} name="name" type="text" />
          </div>
          <div className="text">
            Location: <input className="input" defaultValue={userData.location} name="location" type="text" />
          </div>
          <div className="text">
            Handicap: <input className="input" defaultValue={userData.handicap} name="handicap" type="text" />
          </div>
          <div className="text">
            Greens in regulation: <input className="input" defaultValue={userData.gir} name="gir" type="text" />
          </div>
          <div className="text">
            Fairways hit: <input className="input" defaultValue={userData.fairways_hit} name="fairways_hit" type="text" />
          </div>
          <div className="text">
            Putts per round: <input className="input" defaultValue={userData.putts_per_round} name="putts_per_round" type="text" />
          </div>
          <button className="button-submit" type="submit">Update user</button>
          <button className="button-delete" onClick={handleClick} >Delete user</button>
        </form>
      </div>
    </div>
  );
}