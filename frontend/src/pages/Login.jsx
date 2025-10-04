import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
        email, 
        password,
        rememberMe,
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/account/login`, {
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
      <h2>Login</h2>
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
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            {' '}Remember me
          </label>
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Login</button>
      </form>
    </div>
  );
}
