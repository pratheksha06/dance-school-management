import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FAQ from './pages/FAQ';

// --- MAIN HERO & DASHBOARD COMPONENT ---
function MainDashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDance, setSelectedDance] = useState(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
      navigate('/registration');
    } else {
      alert("Please login first");
      navigate('/login');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been routed to our team.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const dancePrograms = [
    { id: "hiphop", title: "Hip Hop", shortDesc: "High-energy street dance driven by rhythm and self-expression.", img: "https://i.pinimg.com/originals/cd/aa/33/cdaa339e4560890c3edb80d6cab595fb.jpg", details: "Our Hip Hop program covers foundational movements like popping, locking, breaking, and social dances. Classes focus on rhythm, musicality, groove development, and complex choreography combinations ideal for music videos and stage work." },
    { id: "ballet", title: "Ballet", shortDesc: "The elegant foundation of technical precision and artistic poise.", img: "https://i.pinimg.com/736x/9e/08/f0/9e08f041b3687b7f893fc9981a51bfee.jpg", details: "Ballet is the cornerstone of all structured dance styles. Students learn standard barre work, center floor combinations, technique alignment, core stability, and grace, building strength and long muscle tone." },
    { id: "contemporary", title: "Contemporary", shortDesc: "Expressive fluid motion combining classical and modern elements.", img: "https://static.vecteezy.com/system/resources/thumbnails/072/708/964/small/a-young-woman-in-a-purple-dress-is-jumping-photo.jpg", details: "This style connects the body and mind through fluid, raw emotional sequences. Combining elements of lyrical ballet, modern style floor work, fall-and-recovery mechanics, and creative freedom of expression." },
    { id: "salsa", title: "Salsa", shortDesc: "Energetic, passionate, and fast-paced Latin partner dancing.", img: "https://i.pinimg.com/736x/e8/af/e0/e8afe0ac5d2338514ab893b4c26cb9f1.jpg", details: "Bring high heat to the dance floor! Learn authentic timing, complex partner hand turn patterns, footwork combinations (shines), body isolations, and standard club-style routines suitable for competitive dancing or social nights." },
    { id: "jazz", title: "Jazz", shortDesc: "Dynamic leaps, sharp turns, and explosive Broadway stylized energy.", img: "https://i.pinimg.com/474x/10/c1/15/10c115164f3d4e8909921e7e67fab638.jpg", details: "Jazz focuses on technical versatility featuring high-velocity kicks, sharp precision lines, isolation techniques, turns, and jumps, all executed to contemporary pop tracks and theatrical show tunes." },
    { id: "popping", title: "Popping", shortDesc: "The illusions of robotic control, waving, and rapid muscle flexing.", img: "https://i.pinimg.com/736x/bb/49/78/bb4978de525bd3e6359746d6e08ce425.jpg", details: "Master the art of illusion! This class breaks down the precision of contraction and relaxation techniques (pops), animation textures, complex arm and body waving, gliding footwork, and freestyle control." },
    { id: "kpop", title: "K-Pop", shortDesc: "Learn synchronized icon-level routines from major Korean pop bands.", img: "https://i.pinimg.com/736x/e0/31/4f/e0314fcbd5a0eaa44a983de0acbcb817.jpg", details: "Step right into the spotlight of the Hallyu wave! We teach the exact global hit performance tracks and synchronized routines seen in modern music releases, prioritizing group presentation, clean stage formations, and idol-ready charisma." },
    { id: "breakdance", title: "Break Dance (Breaking)", shortDesc: "Acrobatic power moves, complex freezes, and top-rock styling.", img: "https://i.pinimg.com/1200x/29/40/ad/2940adf5da4c370844bb5692a4cf065a.jpg", details: "Push physical limits! This high-octane program details the core building pillars of breaking: Toprock entries, intricate Downrock footwork patterns, structural freezes, and explosive power moves (headspins, windmills)." }
  ];

  return (
    <div style={styles.homeContainer}>
      <style>{hoverStyles}</style>

      {/* --- NAVIGATION BAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Rhythm</div>
        
        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#about" style={styles.navLink}>Why Us</a>
          <a href="#programs" style={styles.navLink}>Programs</a>
          <Link to="/faq" style={styles.navLink}>FAQ</Link>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </div>

        {/* Buttons Group: Locked to Single Line Flex Alignment */}
        <div style={styles.authGroup}>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="action-btn" style={styles.loginBtn}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="action-btn" style={styles.loginBtn}>Login</Link>
              <Link to="/signup" className="action-btn" style={styles.signupBtn}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" style={styles.heroSection}>
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
            <a href="#programs" style={{ textDecoration: 'none' }}>
              <button className="action-btn" style={styles.exploreBtn}>Explore Classes</button>
            </a>
          </div>
        </div>
      </header>

      {/* --- PROGRAMS SECTION --- */}
      <section id="programs" style={styles.programsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Elite Programs</h2>
          <p style={styles.sectionSubtitle}>Select a dance discipline to discover curriculum and scheduling structure</p>
        </div>

        <div style={styles.gridContainer}>
          {dancePrograms.map((dance) => (
            <div key={dance.id} className="dance-card" style={styles.card} onClick={() => setSelectedDance(dance)}>
              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                <img src={dance.img} alt={dance.title} style={styles.cardImage} />
                <div style={styles.cardOverlay}>Click to explore layout details</div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{dance.title}</h3>
                <p style={styles.cardDesc}>{dance.shortDesc}</p>
                <span style={styles.viewMoreText}>Learn More →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- UNIQUE FEATURE: WHY CHOOSE US --- */}
      <section id="about" style={styles.whySection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>The Rhythm Experience</h2>
          <p style={styles.sectionSubtitle}>Why our academy stands out as a leading global movement community</p>
        </div>
        <div style={styles.whyGrid}>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>🏆</div>
            <h4 style={{ fontSize: '20px', marginBottom: '10px', color: '#ff3c78' }}>Certified Instructors</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>Train under verified award-winning performers and international choreographers.</p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>✨</div>
            <h4 style={{ fontSize: '20px', marginBottom: '10px', color: '#ff3c78' }}>Premium Facilities</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>State-of-the-art acoustic setups, specialized timber shock absorption floors, and full-length mirrors.</p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>🎭</div>
            <h4 style={{ fontSize: '20px', marginBottom: '10px', color: '#ff3c78' }}>Stage Exposure</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>Regular annual showcase opportunities, regional competitions, and professional portfolio development.</p>
          </div>
        </div>
        
        {/* Dynamic Metric Counter Blocks */}
        <div style={styles.metricRow}>
          <div style={styles.metricItem}><h2>15+</h2><p>Dance Disciplines</p></div>
          <div style={styles.metricItem}><h2>500+</h2><p>Active Students</p></div>
          <div style={styles.metricItem}><h2>25+</h2><p>National Awards</p></div>
        </div>
      </section>

      {/* --- CONTACT US SECTION --- */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Get In Touch</h2>
          <p style={styles.sectionSubtitle}>Have questions? Drop us a message or visit our studios directly</p>
        </div>

        <div style={styles.contactWrapper}>
          {/* Left Form Panel */}
          <form onSubmit={handleContactSubmit} style={styles.contactForm}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: '600' }}>Send A Message</h3>
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={styles.formInput} 
            />
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.formInput} 
            />
            <textarea 
              placeholder="Tell us about your goals or questions..." 
              rows="5" 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={styles.formTextarea}
            ></textarea>
            <button type="submit" className="action-btn" style={styles.formSubmitBtn}>Send Message Now</button>
          </form>

          {/* Right Info Panel */}
          <div style={styles.contactInfo}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: '600', color: '#ff3c78' }}>Studio Headquarters</h3>
            <p style={styles.infoLine}>📍 <strong>Address:</strong> 104 Dynamic Beats Ave, Performance District, NY 10001</p>
            <p style={styles.infoLine}>📞 <strong>Phone Support:</strong> +1 (555) 343-9831</p>
            <p style={styles.infoLine}>✉️ <strong>Email Admissions:</strong> hello@rhythmdance.com</p>
            
            <div style={styles.mapMock}>
              <div style={{ color: '#ff3c78', fontWeight: '600', marginBottom: '5px' }}>📍 Rhythm Main Center</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Open Mon-Sat: 6:00 AM - 9:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BEAUTIFUL & CINEMATIC FOOTER --- */}
      <footer style={styles.footerContainer}>
        <div style={styles.footerMainGrid}>
          {/* Col 1: Branding and Manifesto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#ff3c78', margin: 0 }}>Rhythm</h3>
            <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Empowering dancers of all backgrounds to unleash their potential since 2018. Movement is our language; rhythm is our pulse.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <span className="social-icon" style={styles.socialBubble}>🌐</span>
              <span className="social-icon" style={styles.socialBubble}>📷</span>
              <span className="social-icon" style={styles.socialBubble}>🎥</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <a href="#home" style={styles.footerLink}>Home Dashboard</a>
            <a href="#programs" style={styles.footerLink}>Dance Curriculums</a>
            <Link to="/faq" style={styles.footerLink}>Frequently Asked Questions</Link>
            <a href="#contact" style={styles.footerLink}>Location & Admissions</a>
          </div>

          {/* Col 3: Class Timings Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={styles.footerTitle}>Operating Batches</h4>
            <p style={styles.footerText}>🌅 Morning: 6:00 AM — 11:00 AM</p>
            <p style={styles.footerText}>🌆 Evening: 4:00 PM — 9:00 PM</p>
            <p style={styles.footerText}>🗓️ Sundays: Closed for masterclasses</p>
          </div>

          {/* Col 4: Premium Newsletter Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={styles.footerTitle}>Stay In Rhythm</h4>
            <p style={styles.footerText}>Subscribe to get notified about upcoming seasonal workshops and early trial discounts.</p>
            <div style={styles.newsletterRow}>
              <input type="email" placeholder="Your email..." style={styles.newsletterInput} />
              <button onClick={() => alert('Subscribed!')} style={styles.newsletterBtn}>Join</button>
            </div>
          </div>
        </div>
        <div style={styles.footerBottomBar}>
          <p style={{ margin: 0 }}>© 2026 Rhythm Dance Academy | Designed for Immersive Performance. All Rights Reserved.</p>
        </div>
      </footer>

      {/* --- MODAL POPUP FOR PROGRAM DETAILS --- */}
      {selectedDance && (
        <div style={styles.modalOverlay} onClick={() => setSelectedDance(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedDance(null)}>×</button>
            <img src={selectedDance.img} alt={selectedDance.title} style={styles.modalImage} />
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>{selectedDance.title}</h2>
              <span style={styles.tagLabel}>Ages 6+ & Adults Welcome</span>
              <p style={styles.modalDetailsText}>{selectedDance.details}</p>
              <div style={styles.modalInfoGrid}>
                <div><strong>📅 Batches:</strong> Mon / Wed / Fri</div>
                <div><strong>🕒 Session:</strong> 60 Minutes</div>
              </div>
              <button onClick={() => { setSelectedDance(null); checkRegistrationLogin(); }} className="action-btn" style={styles.modalRegisterBtn}>
                Enroll In This Style Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- CENTRAL ROUTER HUB ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

// Global CSS Injection
const hoverStyles = `
  html { scroll-behavior: smooth; }
  .action-btn:hover { transform: scale(1.04); cursor: pointer; }
  .dance-card { transition: all 0.35s ease; cursor: pointer; }
  .dance-card:hover { transform: translateY(-10px); box-shadow: 0 12px 30px rgba(255, 60, 120, 0.25); border-color: #ff3c78 !important; }
  .dance-card:hover img { transform: scale(1.06); }
  .social-icon:hover { background: #ff3c78 !important; color: white !important; transform: translateY(-3px); cursor: pointer; }
`;

const styles = {
  homeContainer: { width: '100%', minHeight: '100vh', background: '#0a0a0a', color: 'white', fontFamily: "'Poppins', sans-serif" },
  
  // FIX: Navbar layout locked down strictly so elements sit cleanly in 3 columns
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%', background: 'rgba(10, 10, 10, 0.95)', position: 'fixed', top: 0, left: 0, width: '100%', height: '80px', zIndex: 1000, borderBottom: '1px solid #1a1a1a', backdropFilter: 'blur(10px)' },
  logo: { fontSize: '26px', fontWeight: '700', color: '#ff3c78', letterSpacing: '1px' },
  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  navLink: { color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: '400', transition: '0.3s' },
  authGroup: { display: 'flex', gap: '12px', alignItems: 'center', minWidth: '200px', justifyContent: 'flex-end' },
  
  // FIXED BUTTON PAIRS: Outline variant for Login vs Filled variant for Sign Up
  loginBtn: { background: 'transparent', color: 'white', border: '2px solid #ff3c78', padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '500', textDecoration: 'none', display: 'inline-block', transition: '0.3s', whiteSpace: 'nowrap' },
  signupBtn: { background: '#ff3c78', color: 'white', border: '2px solid #ff3c78', padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '500', textDecoration: 'none', display: 'inline-block', transition: '0.3s', whiteSpace: 'nowrap' },
  
  heroSection: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' },
  heroContent: { textAlign: 'center', maxWidth: '800px', padding: '0 20px' },
  heroTitle: { fontSize: '64px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2', letterSpacing: '1px' },
  heroSubtitle: { fontSize: '18px', color: '#ccc', marginBottom: '40px', lineHeight: '1.6' },
  btnGroup: { display: 'flex', justifyContent: 'center', gap: '20px' },
  getStartedBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px 35px', borderRadius: '30px', fontSize: '16px', fontWeight: '500', transition: '0.3s' },
  exploreBtn: { background: 'transparent', color: 'white', border: '2px solid #ff3c78', padding: '12px 35px', borderRadius: '30px', fontSize: '16px', fontWeight: '500', transition: '0.3s' },
  
  // PROGRAMS DESIGN
  programsSection: { padding: '100px 8%', background: '#0d0d0d' },
  sectionHeader: { textAlign: 'center', marginBottom: '60px' },
  sectionTitle: { fontSize: '46px', fontWeight: '700', color: 'white', marginBottom: '15px' },
  sectionSubtitle: { fontSize: '18px', color: '#aaa', maxWidth: '600px', margin: '0 auto' },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { background: '#141414', borderRadius: '15px', overflow: 'hidden', border: '1px solid #222', display: 'flex', flexDirection: 'column' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '10px', background: 'rgba(255, 60, 120, 0.85)', color: 'white', textAlign: 'center', fontSize: '13px', fontWeight: '500' },
  cardContent: { padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  cardTitle: { fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#ff3c78' },
  cardDesc: { fontSize: '14px', color: '#bbb', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 },
  viewMoreText: { fontSize: '14px', color: '#ff3c78', fontWeight: '500' },
  
  // WHY CHOOSE US
  whySection: { padding: '100px 8%', background: '#0a0a0a', borderTop: '1px solid #141414' },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' },
  whyCard: { background: '#111', padding: '40px 30px', borderRadius: '15px', border: '1px solid #1e1e1e', textAlign: 'center' },
  whyIcon: { fontSize: '40px', marginBottom: '20px' },
  metricRow: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', background: 'linear-gradient(135deg, #141414, #080808)', padding: '40px 20px', borderRadius: '20px', border: '1px solid #222' },
  metricItem: { textAlign: 'center', minWidth: '150px' },

  // CONTACT SECTION DESIGN
  contactSection: { padding: '100px 8%', background: '#0d0d0d', borderTop: '1px solid #1c1c1c' },
  contactWrapper: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', maxWidth: '1200px', margin: '0 auto' },
  contactForm: { background: '#141414', padding: '40px', borderRadius: '20px', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '15px' },
  formInput: { background: '#202020', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: 'white', fontSize: '15px', fontFamily: "'Poppins', sans-serif", outline: 'none' },
  formTextarea: { background: '#202020', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: 'white', fontSize: '15px', fontFamily: "'Poppins', sans-serif", resize: 'none', outline: 'none' },
  formSubmitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: '0.3s' },
  contactInfo: { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' },
  infoLine: { fontSize: '16px', color: '#ccc', margin: 0, lineHeight: '1.6' },
  mapMock: { marginTop: '20px', background: '#141414', height: '180px', borderRadius: '15px', border: '1px solid #252525', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: 'radial-gradient(#222 20%, transparent 20%)', backgroundSize: '15px 15px' },

  // ENHANCED FOOTER DESIGN
  footerContainer: { background: '#050505', borderTop: '1px solid #1a1a1a', padding: '80px 8% 30px' },
  footerMainGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '60px' },
  footerTitle: { fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '10px', borderLeft: '3px solid #ff3c78', paddingLeft: '10px' },
  footerLink: { color: '#999', textDecoration: 'none', fontSize: '14px', transition: '0.3s' },
  footerText: { color: '#999', fontSize: '14px', margin: 0, lineHeight: '1.5' },
  socialBubble: { background: '#141414', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', border: '1px solid #222', fontSize: '16px', transition: '0.3s' },
  newsletterRow: { display: 'flex', borderRadius: '25px', overflow: 'hidden', border: '1px solid #333', background: '#111', padding: '4px' },
  newsletterInput: { background: 'transparent', border: 'none', color: 'white', padding: '8px 15px', width: '100%', outline: 'none', fontSize: '13px' },
  newsletterBtn: { background: '#ff3c78', border: 'none', color: 'white', padding: '0 20px', borderRadius: '20px', fontWeight: '500', cursor: 'pointer' },
  footerBottomBar: { borderTop: '1px solid #111', paddingTop: '30px', textAlign: 'center', color: '#666', fontSize: '13px' },

  // PROGRAM DETAIL MODAL OVERLAYS
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' },
  modalContent: { background: '#161616', maxWidth: '600px', width: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative', border: '1px solid #333' },
  closeBtn: { position: 'absolute', top: '15px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  modalImage: { width: '100%', height: '280px', objectFit: 'contain', background: '#141414' },
  modalBody: { padding: '35px' },
  modalTitle: { fontSize: '32px', fontWeight: '700', marginBottom: '10px', color: 'white' },
  tagLabel: { display: 'inline-block', background: 'rgba(255, 60, 120, 0.15)', color: '#ff3c78', padding: '5px 15px', borderRadius: '15px', fontSize: '12px', fontWeight: '600', marginBottom: '20px' },
  modalDetailsText: { fontSize: '15px', color: '#ccc', lineHeight: '1.7', marginBottom: '25px' },
  modalInfoGrid: { display: 'flex', gap: '30px', background: '#202020', padding: '15px 20px', borderRadius: '10px', fontSize: '14px', color: '#aaa', marginBottom: '30px' },
  modalRegisterBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px 0', width: '100%', borderRadius: '25px', fontSize: '16px', fontWeight: '600', transition: '0.3s', cursor: 'pointer' }
};