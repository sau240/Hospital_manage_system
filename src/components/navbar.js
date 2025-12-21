import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Inline Style Object
  const styles = {
    navbar: {
      backgroundColor: "#0f172a",
      color: "white",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      width: "100%",
      position: "relative",
      zIndex: 50,
      fontFamily: "sans-serif",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    navContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
    },
    logoLink: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textDecoration: "none",
      color: "white",
    },
    logoIcon: {
      backgroundColor: "#2563eb",
      padding: "6px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
    },
    logoText: {
      fontSize: "1.25rem",
      fontWeight: "700",
    },
    logoSync: {
      color: "#60a5fa",
    },
    desktopLinks: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    navItem: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "white",
      textDecoration: "none",
    },
    navButton: {
      backgroundColor: "#2563eb",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      fontWeight: "600",
      textDecoration: "none",
      color: "white",
    },
    mobileToggle: {
      background: "none",
      border: "none",
      color: "#94a3b8",
      cursor: "pointer",
      display: "none", // Will be toggled via CSS media query below
    },
    mobileMenu: {
      backgroundColor: "#1e293b",
      borderTop: "1px solid #334155",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }
  };

  return (
    <>
      {/* Global CSS for Media Queries & Hover Effects (since standard inline styles can't do media queries) */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-btn { display: block !important; }
          }
          .nav-hover:hover { color: #60a5fa !important; }
          .btn-hover:hover { background-color: #1d4ed8 !important; }
        `}
      </style>

      <nav style={styles.navbar}>
        <div style={styles.container}>
          <div style={styles.navContent}>
            
            {/* Logo Section */}
            <Link to="/" style={styles.logoLink}>
              <div style={styles.logoIcon}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span style={styles.logoText}>
                Med<span style={styles.logoSync}>Sync</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="desktop-nav" style={styles.desktopLinks}>
              <Link to="/" className="nav-hover" style={styles.navItem}>Dashboard</Link>
              <Link to="/assign-slot" className="nav-hover" style={styles.navItem}>Assign Slot</Link>
              <Link to="/patients" className="btn-hover" style={styles.navButton}>
                Patient List
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button 
              className="mobile-btn"
              style={styles.mobileToggle} 
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div style={styles.mobileMenu}>
            <Link to="/" onClick={() => setIsOpen(false)} style={styles.navItem} className="nav-hover">Dashboard</Link>
            <Link to="/assign-slot" onClick={() => setIsOpen(false)} style={styles.navItem} className="nav-hover">Assign Slot</Link>
            <Link to="/patients" onClick={() => setIsOpen(false)} style={styles.navButton} className="btn-hover">Patient List</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;