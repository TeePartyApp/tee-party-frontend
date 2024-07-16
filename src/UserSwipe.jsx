
import { useState, useEffect } from "react";
import axios from "axios";
import './UserSwipe.css';


export function RandomUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomUser = () => {
    setLoading(true);
    axios.get("http://localhost:3000/random_users.json")
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching random user:", error);
        setLoading(false);
      });
  };

  const handleLike = () => {
    axios.post("http://localhost:3000/matches.json", { matched_user_id: user.id })
      .then(response => {
        console.log("Liked user:", response.data);
        fetchRandomUser();  // Fetch a new random user
      })
      .catch(error => {
        console.error("Error liking user:", error);
      });
  };

  const handleDislike = () => {
    axios.post("http://localhost:3000/matches.json", { matched_user_id: user.id, status: "rejected" })
      .then(response => {
        console.log("Disliked user:", response.data);
        fetchRandomUser();  // Fetch a new random user
      })
      .catch(error => {
        console.error("Error liking user:", error);
      });
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <h1 className="text-name">Tee Party</h1>
      <div className="container">
        <div className="card">
          <img src={user.image_url} alt={user.name} className="card-img-top" />
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p className="card-text">{user.location}</p>
            <p className="card-text">Handicap: {user.handicap}</p>
            <p className="card-text">Greens in Regulation: {user.gir}</p>
            <p className="card-text">Fairways Hit: {user.fairways_hit}</p>
            <p className="card-text">Putts per Round: {user.putts_per_round}</p>
            <div className="card-buttons">
              <button className="btn btn-danger" onClick={handleDislike}>Dislike</button>
              <button className="btn btn-primary" onClick={handleLike}>Like</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
