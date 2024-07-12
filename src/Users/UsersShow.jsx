export function UsersShow(props) {

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
      <h1>{props.user.name}</h1>
      {/* <img src={props.user.image_url} /> */}
      <p>Location: {props.user.location}</p>
      <p>Handicap: {props.user.handicap}</p>
      <p>Greens in regulation: {props.user.gir}</p>
      <p>Fairways hit: {props.user.fairways_hit}</p>
      <p>Putts per round: {props.user.putts_per_round}</p>
      <form onSubmit={handleSubmit}> 
        <div>
          Name: <input defaultValue={props.user.name} name="name" type="text" />
        </div>
        <div>
          Location: <input defaultValue={props.user.location} name="location" type="text" />
        </div>
        <div>
          Handicap: <input defaultValue={props.user.handicap} name="handicap" type="text" />
        </div>
        <div>
          Greens in regulation: <input defaultValue={props.user.gir} name="gir" type="text" />
        </div>
        <div>
          Fairways hit: <input defaultValue={props.user.fairways_hit} name="fairways_hit" type="text" />
        </div>
        <div>
          Putts per round: <input defaultValue={props.user.putts_per_round} name="putts_per_round" type="text" />
        </div>
        <button type="submit">Update user</button>
      </form>
      <button onClick={handleClick} >Delete user</button>
    </div>
  );
}