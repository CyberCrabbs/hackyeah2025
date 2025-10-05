import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg,#f6f8fc 0%,#e7eaf3 100%)'
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 8px 40px 0 rgba(60,72,99,.13)',
          padding: '48px 32px',
          minWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center'
        }}
      >
        <img 
          src={logo} 
          alt="Logo" 
          style={{
            width: '450px',
            height: '250px',
            objectFit: 'contain',
            marginBottom: '16px'
          }}
        />
        <h2 style={{ fontWeight: 700, fontSize: '1.6em', letterSpacing: '-1px', margin: 0 }}>
          Zaloguj się
        </h2>
        <button
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: '12px',
            background: 'linear-gradient(90deg,#3e7bfa 0%,#2954bc 100%)',
            border: 'none',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1em',
            cursor: 'pointer',
            transition: 'background 0.2s',
            marginBottom: '10px'
          }}
          onClick={() => navigate('/volunteer')}
        >
          Zaloguj się jako wolontariusz
        </button>
        <button
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: '12px',
            background: 'linear-gradient(90deg,#27bfa3 0%,#196c60 100%)',
            border: 'none',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1em',
            cursor: 'pointer',
            transition: 'background 0.2s',
            marginBottom: '10px'
          }}
          onClick={() => navigate('/organization')}
        >
          Zaloguj się jako organizacja
        </button>
        <button
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: '12px',
            background: 'linear-gradient(90deg,#fbbf24 0%,#f59e42 100%)',
            border: 'none',
            color: '#222',
            fontWeight: 600,
            fontSize: '1.1em',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => navigate('/coordinator')}
        >
          Zaloguj się jako koordynator
        </button>
      </div>
    </div>
  );
}