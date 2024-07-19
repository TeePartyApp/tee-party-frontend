import axios from "axios";
import { useState } from "react";
import './Login.css';

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/"; 
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1 className="header">Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form className="form" onSubmit={handleSubmit}>
        <div className="text">
          Email: <input className="input" placeholder="Enter Email" name="email" type="email" />
        </div>
        <div className="text">
          Password: <input className="input" placeholder="Enter Password" name="password" type="password" />
        </div>
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}