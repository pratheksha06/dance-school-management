import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync login status from sessionStorage
  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem("userLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate('/login');
  };

  const checkRegistrationLogin = () => {
    if (isLoggedIn) {
      navigate('/registration'); // Redirects to registration form if logged in
    } else {
      alert("Please login first");
      navigate('/login');
    }
  };

  return (
    <div style={styles.homeContainer}>
      <style>{hoverStyles}</style>

      {/* --- NAVIGATION BAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Rhythm</div>
        
        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#about" style={styles.navLink}>About Us</a>
          <a href="#programs" style={styles.navLink}>Programs</a>
          <a href="#faq" style={styles.navLink}>FAQ</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </div>

        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="action-btn" style={styles.loginBtn}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="action-btn" style={styles.loginBtn}>
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Feel The <span style={{ color: '#ff3c78' }}>Rhythm</span> Of Dance
          </h1>
          <p style={styles.heroSubtitle}>
            Learn from professional instructors, explore multiple dance styles, and 
            join the most energetic dance community. From beginners to advanced 
            dancers — we have something for everyone.
          </p>
          
          <div style={styles.btnGroup}>
            <button onClick={checkRegistrationLogin} className="action-btn" style={styles.getStartedBtn}>
              Get Started
            </button>
            <button className="action-btn" style={styles.exploreBtn}>
              Explore Classes
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

// Interactive styles for hover animations
const hoverStyles = `
  .action-btn:hover { transform: scale(1.05); cursor: pointer; }
  a:hover { color: #ff3c78 !important; }
`;

const styles = {
  homeContainer: {
    width: '100%',
    minHeight: '100vh',
    background: '#0d0d0d',
    color: 'white',
    fontFamily: "'Poppins', sans-serif"
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 8%',
    background: 'rgba(13, 13, 13, 0.95)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000
  },
  logo: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ff3c78',
    letterSpacing: '1px'
  },
  navLinks: {
    display: 'flex',
    gap: '30px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '400',
    transition: '0.3s'
  },
  loginBtn: {
    background: '#ff3c78',
    color: 'white',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'inline-block',
    transition: '0.3s'
  },
  heroSection: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '80px'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    padding: '0 20px'
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.2',
    letterSpacing: '1px'
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#ccc',
    marginBottom: '40px',
    lineHeight: '1.6'
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  getStartedBtn: {
    background: '#ff3c78',
    color: 'white',
    border: 'none',
    padding: '14px 35px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '500',
    transition: '0.3s'
  },
  exploreBtn: {
    background: 'transparent',
    color: 'white',
    border: '2px solid #ff3c78',
    padding: '12px 35px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '500',
    transition: '0.3s'
  }
};