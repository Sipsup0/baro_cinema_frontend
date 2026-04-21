import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"
import "../pages/NavBar.css"

export default function NavBar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const isLoggedIn = !!user
  const isAdmin = user?.role === "admin"

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" onClick={closeMenu}>
          <img src="/pictures/logo.png" alt="logo" className="logoPicture" />
        </Link>
      </div>

      <div className="nav-center">
        <img src="/pictures/gps.png" className="gpsImage" alt="gps" />
        <span>Debrecen</span>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </div>

      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        {!isLoggedIn && (
          <>
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              <img src="/pictures/user.png" className="userImage" alt="user" />
              Bejelentkezés
            </Link>

            <Link to="/register" className="nav-link" onClick={closeMenu}>
              Regisztráció
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Fiókom
            </Link>

            {isAdmin && (
              <Link to="/admin" className="nav-link admin-link" onClick={closeMenu}>
                Admin panel
              </Link>
            )}

            <Button
              buttonClass="logout-btn"
              content="Kijelentkezés"
              onClick={() => {
                closeMenu()
                onLogout()
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}