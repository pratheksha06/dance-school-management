import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Regex patterns from your original script
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (cleanEmail === "") {
      alert("Email is required");
      return;
    }

    if (!emailPattern.test(cleanEmail)) {
      alert("Enter a valid email address.\nExample: user@gmail.com");
      return;
    }

    if (cleanPassword === "") {
      alert("Password is required");
      return;
    }

    if (!passwordPattern.test(cleanPassword)) {
      alert(
        "Strong Password Required!\n\n" +
        "Password must contain:\n" +
        "• At least 8 characters\n" +
        "• One uppercase letter\n" +
        "• One lowercase letter\n" +
        "• One number\n" +
        "• One special character\n\n" +
        "Example: Dance@123"
      );
      return;
    }

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (cleanEmail === savedEmail?.toLowerCase() && cleanPassword === savedPassword) {
      sessionStorage.setItem("userLoggedIn", "true");
      alert("Login Successful!");
      navigate('/'); // Redirects to Home screen
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.bodyStyles}>
      <style>{hoverStyles}</style>
      <div style={styles.container}>
        <h1 style={styles.h1}>Login</h1>
        <form onSubmit={handleLogin}>
          <div style={styles.inputBox}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" className="form-btn" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.p}>
          Don't have an account? <Link to="/signup" style={styles.a}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

// Styling definitions shared between forms
const hoverStyles = `
  .form-btn:hover { transform: scale(1.03); }
  input:focus { outline: none; border: 2px solid #ff3c78 !important; }
`;

const styles = {
  bodyStyles: { 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', // <-- CamelCase fixed here
    backgroundImage: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974&auto=format&fit=crop')", 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  },
  container: { 
    width: '400px', 
    background: 'rgba(20,20,20,0.9)', 
    padding: '40px', 
    borderRadius: '20px', 
    boxShadow: '0 0 25px rgba(255,60,120,0.4)' 
  },
  h1: { textAlign: 'center', color: 'white', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' },
  inputBox: { marginBottom: '20px' },
  label: { display: 'block', color: 'white', marginBottom: '8px' },
  input: { width: '100%', padding: '14px', border: '2px solid transparent', borderRadius: '10px', background: '#2a2a2a', color: 'white', fontSize: '15px', transition: '0.2s' },
  button: { width: '100%', padding: '14px', border: 'none', borderRadius: '30px', background: '#ff3c78', color: 'white', fontSize: '16px', cursor: 'pointer', transition: '0.3s' },
  p: { textAlign: 'center', color: '#ccc', marginTop: '20px' },
  a: { color: '#ff3c78', textDecoration: 'none' }
};