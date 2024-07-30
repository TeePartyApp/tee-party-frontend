
import { useState, useEffect } from "react";
import axios from "axios";
import './UserSwipe.css';
import { Modal } from "./Modal/Modal";


export function RandomUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    handicap_min: "",
    handicap_max: "",
    gir_min: "",
    gir_max: "",
    fairways_hit_min: "",
    fairways_hit_max: "",
    putts_per_round_min: "",
    putts_per_round_max: ""
  });

  const fetchRandomUser = () => {
    setLoading(true);
  
    axios.get("http://localhost:3000/random_users.json", { params: filters })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("No users found");
        }
        setLoading(false);
        setIsFiltered(false);
        setShowModal(false);
      })
      .catch(error => {
        console.error("Error fetching random user:", error);
        setLoading(false);
      });
  };

  const fetchFilteredUser = () => {
    setLoading(true);
    axios.get("http://localhost:3000/filter_users.json", { params: filters })
      .then(response => {
        if (response.status == 200) {
          setUser(response.data);
        } else {
          console.error("No users found");
        }
        setLoading(false);
        setIsFiltered(true);
        setShowModal(false);
      })
      .catch(error => {
        console.error("Error fetching filtered user:", error);
        setLoading(false);
      });
  }

  const handleLike = () => {
    axios.post("http://localhost:3000/matches.json", { matched_user_id: user.id })
      .then(response => {
        console.log("Liked user:", response.data);
        if (response.data.message === "It's a match!") {
          alert("It's a match!");
        }
        if (isFiltered === true) {
          fetchFilteredUser();
        } else if (isFiltered === false) {
          fetchRandomUser();
        }
      })
      .catch(error => {
        console.error("Error liking user:", error);
      });
  };

  const handleDislike = () => {
    axios.post("http://localhost:3000/matches.json", { matched_user_id: user.id, status: "rejected" })
      .then(response => {
        console.log("Disliked user:", response.data);
        if (isFiltered === true) {
          fetchFilteredUser();
        } else if (isFiltered === false) {
          fetchRandomUser();
        }
      })
      .catch(error => {
        console.error("Error disliking user:", error);
      });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value}));
  };

  const openModal = () => {
    setShowModal(true);
  }

  useEffect(() => {
    fetchRandomUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <h1 className="text-name">Tee Party</h1>
            <div className="card-buttons">
              <button className="btn btn-secondary" onClick={openModal}>Advanced search</button>
            </div>
      <div className="body">
        <div className="card">
          <img src={user.image_url} alt={user.name} className="card-img-top" style={{
          width: '100%',
          height: '500px',
          objectFit: 'cover',
          borderBottom: '1px solid #ccc'
        }} />
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <form>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={filters.location} onChange={handleFilterChange} className="form-control" />
            <div className="form-group">
            <label>Handicap Min: {filters.handicap_min}</label>
            <input
              type="range"
              name="handicap_min"
              min="0"
              max="40"
              value={filters.handicap_min}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Handicap Max: {filters.handicap_max}</label>
            <input
              type="range"
              name="handicap_max"
              min="0"
              max="40"
              value={filters.handicap_max}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Greens in Regulation Min: {filters.gir_min}</label>
            <input
              type="range"
              name="gir_min"
              min="0"
              max="18"
              value={filters.gir_min}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Greens in Regulation Max: {filters.gir_max}</label>
            <input
              type="range"
              name="gir_max"
              min="0"
              max="18"
              value={filters.gir_max}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Fairways Hit Min: {filters.fairways_hit_min}</label>
            <input
              type="range"
              name="fairways_hit_min"
              min="0"
              max="18"
              value={filters.fairways_hit_min}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Fairways Hit Max: {filters.fairways_hit_max}</label>
            <input
              type="range"
              name="fairways_hit_max"
              min="0"
              max="18"
              value={filters.fairways_hit_max}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Putts per Round Min: {filters.putts_per_round_min}</label>
            <input
              type="range"
              name="putts_per_round_min"
              min="0"
              max="50"
              value={filters.putts_per_round_min}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Putts per Round Max: {filters.putts_per_round_max}</label>
            <input
              type="range"
              name="putts_per_round_max"
              min="0"
              max="50"
              value={filters.putts_per_round_max}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="search-button" onClick={fetchFilteredUser}>Search</button>
            <button type="button" className="reset-button" onClick={fetchRandomUser}>Reset</button>
          </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
