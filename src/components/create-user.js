import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  const user = { username: username };
  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    setUsername("");
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={handleChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
