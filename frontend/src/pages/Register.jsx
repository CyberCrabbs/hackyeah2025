import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [refferal, setRefferal] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
        email, 
        password,
        repeat_password: repeatPassword,
        refferal
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/account/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error('Request failed');
      return res.json();
    }).then((result) => {
    localStorage.setItem("token", result.token);
  })
  .catch((error) => console.error(error));
  }

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><div style={{ marginTop: '10px' }}>
          <label>Repeat password:</label><br />
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div><div style={{ marginTop: '10px' }}>
          <label>Refferal (invite code):</label><br />
          <input
            type="text"
            value={refferal}
            onChange={(e) => setRefferal(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Register</button>
      </form>
    </div>
  );
}
