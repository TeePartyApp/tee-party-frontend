export function UsersIndex(props) {
  return (
    <div>
      <h1>All Users</h1>
      {props.users.map((user) => (
        <div key={user.id}>
          <img src={user.image_url} />
          <h2>{user.name}</h2>
          <p>{user.location}</p>
          <button onClick={() => props.onShowUser(user)}>Stats</button>
        </div>
      ))}
    </div>
  );
}