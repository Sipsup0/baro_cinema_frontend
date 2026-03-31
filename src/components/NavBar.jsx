import { Link } from 'react-router-dom'
import Button from './Button'
import "../pages/NavBar.css"

export default function NavBar({ user, onLogout, }) {
  //console.log(user);
  const isLoggedIn = !!user
  //console.log(isLoggedIn);
  const isAdmin = user?.role === 'admin'
  console.log(isAdmin);

  return (
    <div className="navbar">

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* BAL OLDAL */}
      <div className="nav-left">
        <img src="/pictures/logo.png" alt="logo" className="logoPicture" />
      </div>

      {/* KÖZÉP */}
      <div className="nav-center">
        <img src="/pictures/gps.png" className="gpsImage" alt="gps" />
        <span>Debrecen</span>
      </div>

      {/* JOBB OLDAL */}
      <div className="nav-right">

        {!isLoggedIn && (
          <>
            <Link to="/" className="nav-link">
              Vissza a főoldalra
            </Link>

            <Link to="/login" className="nav-link">
              <img src="/pictures/user.png" className="userImage" alt="user" />
              Bejelentkezés
            </Link>

            <Link to="/register" className="nav-link">
              Regisztráció
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/" className="nav-link">Fiókom</Link>

            {(
              <Link to="/admin" className="admin-link">
                Admin panel
              </Link>
            )}

            <Button
              buttonClass="logout-btn"
              content="Kijelentkezés"
              onClick={onLogout}
            />
          </>
        )}
      </div>

    </div>
  )
}