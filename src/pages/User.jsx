import { useState } from "react";
import "./User.css";
import { Link } from "react-router-dom"

export default function Fiokom(onLogout) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">

      <div className="login-container">

        {/* BAL OLDAL */}
        <div className="login-left">
          <div className="brand">

            <div className="logo">👤</div>

            <h2>FIÓKOM</h2>

            <p>
              A fiókod adatai és biztonsági beállításai egy helyen.
            </p>

            <img
              src="baro_logo.png"
              alt="profile"
            />

          </div>
        </div>

        {/* JOBB OLDAL */}
        <div className="login-right">

          <div className="form-wrapper">

            <h1>Bejelentkezési adatok</h1>

            <div className="form-group">
              <input
                type="text"
                value="demo_user"
                placeholder=" "
                readOnly
              />
              <label>Felhasználónév</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                value="demo@email.com"
                placeholder=" "
                readOnly
              />
              <label>Email cím</label>
            </div>

            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                value="TitkosJelszo123"
                placeholder=" "
                readOnly
              />
              <label>Jelszó</label>
            </div>

            <div
              className="forgotPsw"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword
                ? "Jelszó elrejtése"
                : "Jelszó megjelenítése"}
            </div>

            <button type="button" className="submit-btn" content="Adatok szerkesztése'>">
              <Link to='/'>Adatok szerkesztése</Link>
            </button>

            <div className="register-link">
              <Link to='/' onClick={onLogout}>Kijelentkezés a fiókból</Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}