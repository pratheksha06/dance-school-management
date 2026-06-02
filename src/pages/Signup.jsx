import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const nameClean = fullName.trim();
    const emailClean = email.trim().toLowerCase();

    const namePattern = /^[A-Za-z ]{3,30}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (nameClean === "") {
      alert("Please enter your name");
      return;
    }
    if (!namePattern.test(nameClean)) {
      alert("Name should contain only letters and be 3 to 30 characters long");
      return;
    }
    if (emailClean === "") {
      alert("Please enter your email");
      return;
    }
    if (!emailPattern.test(emailClean)) {
      alert("Enter a valid email.\nExample: user@gmail.com");
      return;
    }
    if (password === "") {
      alert("Please enter a password");
      return;
    }
    if (!passwordPattern.test(password)) {
      alert(
        "Strong Password Required!\n\n" +
        "✓ 8+ characters\n" +
        "✓ One uppercase letter\n" +
        "✓ One lowercase letter\n" +
        "✓ One number\n" +
        "✓ One special character\n\n" +
        "Example: Dance@123"
      );
      return;
    }
    if (confirmPassword === "") {
      alert("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    localStorage.setItem("userEmail", emailClean);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userLoggedIn", "true");

    alert("Account Created Successfully!");
    navigate('/'); 
  };

  return (
    <div style={styles.bodyStyles}>
      <style>{`
        .form-btn:hover { transform: scale(1.03); }
        input:focus { outline: none; border: 2px solid #ff3c78 !important; }
      `}</style>
      
      <div style={styles.signupBox}>
        <h1 style={styles.h1}>Create Account</h1>
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '35px' }}>Join Rhythm Dance Academy</p>

        <form onSubmit={handleSignup}>
          <div style={styles.inputBox}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Email Address</label>
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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" className="form-btn" style={styles.button}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#ccc' }}>
          Already have an account? <Link to="/login" style={styles.a}>Login</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  bodyStyles: { 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', // Fix: camelCase
    backgroundImage: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974&auto=format&fit=crop')", 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  },
  signupBox: { 
    width: '420px', 
    background: 'rgba(0,0,0,0.7)', 
    padding: '40px', 
    borderRadius: '20px', 
    backdropFilter: 'blur(10px)', 
    boxShadow: '0 0 20px rgba(255,60,120,0.4)' 
  },
  h1: { textAlign: 'center', color: 'white', marginBottom: '10px', fontSize: '32px', fontWeight: 'bold' },
  inputBox: { marginBottom: '22px' },
  label: { color: 'white', display: 'block', marginBottom: '8px' },
  input: { width: '100%', padding: '14px', border: '2px solid transparent', borderRadius: '10px', background: '#2a2a2a', color: 'white', fontSize: '15px' },
  button: { width: '100%', padding: '14px', border: 'none', borderRadius: '30px', background: '#ff3c78', color: 'white', fontSize: '16px', cursor: 'pointer', marginTop: '10px', transition: '0.3s' },
  a: { color: '#ff3c78', textDecoration: 'none' }
};