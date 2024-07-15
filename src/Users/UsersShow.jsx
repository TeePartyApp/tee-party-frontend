import { useState, useEffect } from "react";
import axios from "axios";

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
      <form onSubmit={handleSubmit}> 
        <div>
          Name: <input defaultValue={userData.name} name="name" type="text" />
        </div>
        <div>
          Location: <input defaultValue={userData.location} name="location" type="text" />
        </div>
        <div>
          Handicap: <input defaultValue={userData.handicap} name="handicap" type="text" />
        </div>
        <div>
          Greens in regulation: <input defaultValue={userData.gir} name="gir" type="text" />
        </div>
        <div>
          Fairways hit: <input defaultValue={userData.fairways_hit} name="fairways_hit" type="text" />
        </div>
        <div>
          Putts per round: <input defaultValue={userData.putts_per_round} name="putts_per_round" type="text" />
        </div>
        <button type="submit">Update user</button>
      </form>
      <button onClick={handleClick} >Delete user</button>
    </div>
  );
}