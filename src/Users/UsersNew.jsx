export function UsersNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateUser(params, () => event.target.reset());
  };
  
  return (
    <div>
      <h1>New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Email: <input name="email" type="text" />
        </div>
        <div>
          Location: <input name="location" type="text" />
        </div>
        <div>
          Handicap: <input name="handicap" type="text" />
        </div>
        <div>
          Greens in regulation: <input name="gir" type="text" />
        </div>
        <div>
          Fairways Hit: <input name="fairways_hit" type="text" />
        </div>
        <div>
          Putts per round: <input name="putts_per_round" type="text" />
        </div>
        <div>
          Password: <input name="password" type="text" />
        </div>
        <div>
          Password confirmation: <input name="password_confirmation" type="text" />
        </div>
        <div>
          Profile picture: <input name="image_url" type="text" />
        </div>
        <button type="submit">Create user</button>
      </form>
    </div>
  );
}