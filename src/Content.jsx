import { useEffect, useState } from "react"
import { UsersShow } from "./Users/UsersShow";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./Authentication/Signup";
import { Login } from "./Authentication/Login";
import { LogoutLink } from "./Authentication/LogoutLink";
import { MatchesIndex } from "./Matches/MatchesIndex";
import { RandomUser } from "./UserSwipe";


export function Content() {
  const [users, setUsers] = useState([]);
  const [isUsersShowVisible, setIsUsersShowVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});

  const handleIndexMatches = () => {
    console.log("handleIndexMatches");
    axios.get("http://localhost:3000/matches.json").then((response) => {
      console.log(response.data);
      setMatches(response.data);
    });
  };

  const handleShowMatch = (match) => {
    console.log("handleShowMatch", match);
    setCurrentMatch(...matches, response.data);
  };

  const handleIndexUsers = () => {
    console.log("handleIndexUsers");
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  const handleCreateUser = (params, successCallBack) => {
    console.log("handleCreateUser", params);
    axios.post("http://localhost:3000/users.json", params).then((response) =>{
      setUsers([...users, response.data]);
      successCallBack();
    });
  };

  const handleShowUser = (user) => {
    console.log("handleShowUser", user);
    setIsUsersShowVisible(true);
    setCurrentUser(user);
  };

  const handleUpdateUser = (id, params, successCallBack) => {
    console.log("handleUpdateUser", params);
    axios.patch(`http://localhost:3000/users/current_user.json`, params).then((response) => {
      setUsers(
        users.map((user) => {
          if (user.id ===response.data.id) {
            return response.data;
          } else {
            return user;
          }
        })
      );
      successCallBack();
      handleClose();
    });
  };

  const handleDestroyUser = (id) => {
    console.log("handleDestroyUser", id);
    axios.delete(`http://localhost:3000/users/current_user.json`).then((response) => {
      setUsers(users.filter((filter) => user.id !== id));
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsUsersShowVisible(false);
  };

  useEffect(handleIndexUsers, []);
  useEffect(handleIndexMatches, []);
  
  return (
    <main>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />} />
        <Route path="/matches" element={
          <MatchesIndex matches={matches} 
          onShowMatch={handleShowMatch}/>} />
      <Route path="/edit_profile" element={<UsersShow user={users} show={isUsersShowVisible} onUpdateUser={handleUpdateUser} onDestroyUser={handleDestroyUser} />} />
      <Route path="/" element={<RandomUser />} />
      </Routes>
    </main>
  );
}

