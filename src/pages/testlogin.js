import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("5dawdA5dw5_z5w4564fw");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { uid, username };

    const user = await axios.post("/api/auth/login", credentials);

    console.log(user);
  };

  const handleGetUser = async () => {
    const user = await axios.get("/api/user");

    console.log(user.data.uid);
  };

  const handleLogOut = async () => {
    const user = await axios.get("/api/auth/logout");

    console.log(user);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password"> Pass </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button> Log in </button>
      </form>

      <button onClick={() => handleGetUser()}> User </button>

      <button onClick={() => handleLogOut()}> Logout </button>
    </div>
  );
}
