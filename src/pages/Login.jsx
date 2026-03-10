import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

import Button from '../components/Button'
import InputField from '../components/InputField'
import '../pages/Login.css'
import {login} from '../users'

function Login() {
    const navigate = useNavigate()
    const [email,setEmail]= useState('')
    const [psw,setPsw]= useState('')

    
    const [loginError, setLoginError] = useState('')
    const [message, setMessage] = useState('')

    async function onLogin() {
        setLoginError('')
        setMessage('')
        console.log(email,psw);
        if (!email || !psw) {
            return setLoginError('Nem lehet üres adatokat tartalmazó mező!')
        }

        try {
            const data = await login(email,psw)
            console.log(data);
            if (data.error) {
               return setLoginError(data.error)
            }
            setMessage(data.message)
            setTimeout(()=> navigate('/'),600)
        } catch (err) {
            setLoginError('Nem sikerült kapcsolódni a backendhez!')

        }
    }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* BAL OLDAL – BRANDING */}
        <div className="login-left">
          <div className="brand">
            <div className="logo">
              <img src="../pictures/only_logo.png" alt="logo" />
            </div>
            <h2>BARO CINEMA</h2>
            <p>Éld át a filmek világát prémium élménnyel.</p>
          </div>
        </div>

        {/* JOBB OLDAL – FORM */}
        <div className="login-right">
          <div className="form-wrapper">
            <h1>ÜDVÖZLÜNK! JÓ, HOGY ÚRJA ITT VAGY!</h1>
            {loginError && <div className='alert alert-danger text-center my-2'>{loginError}</div>}
            {message && <div className='alert alert-success text-center my-2'>{message}</div>}

              <InputField label="Email" type="email" placeholder="" value={email} setValue={setEmail}/>

              <InputField label="Jelszó" type="password" placeholder="" value={psw} setValue={setPsw}/>

              <div className="forgotPsw">
                Elfelejtetted a jelszavad?
              </div>


              <Button type="button"  buttonClass="submit-btn" content="BEJELENTKEZÉS" onClick={onLogin}/>

              <p className="register-link">
                Még nincs fiókod? <Link to='/register'><span>Regisztráció</span></Link>
              </p>
              
              <Link to='/'><p className='home-link'>Vissza a főoldalra</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
