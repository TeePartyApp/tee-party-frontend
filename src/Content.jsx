import { useEffect, useState } from "react"
import { UsersIndex } from "./Users/UsersIndex"
import { UsersNew } from "./Users/UsersNew";
import { Modal } from "./Modal/Modal";
import { UsersShow } from "./Users/UsersShow";
import axios from "axios"

export function Content() {
  const [users, setUsers] = useState([]);
  const [isUsersShowVisible, setIsUsersShowVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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
    axios.patch(`http://localhost:3000/users/${id}.json`, params).then((response) => {
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
    axios.delete(`http://localhost:3000/users/${id}.json`).then((response) => {
      setUsers(users.filter((filter) => user.id !== id));
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsUsersShowVisible(false);
  }

  useEffect(handleIndexUsers, []);
  
  return (
    <main>
      <UsersNew onCreateUser={handleCreateUser}/>
      <h1>Welcome to the Tee Party</h1>
      <UsersIndex users={users} onShowUser={handleShowUser} />
      <Modal show={isUsersShowVisible} onClose={handleClose}>
        <UsersShow user={currentUser} onUpdateUser={handleUpdateUser} onDestroyUser={handleDestroyUser} />
      </Modal>
    </main>
  );
}