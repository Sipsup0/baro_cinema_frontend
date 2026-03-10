import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import '../pages/Registration.css'

import {register, login} from '../users'

function Registration() {
  const navigate = useNavigate()
  const [lastname,setLastname] = useState('')
  const [firstname,setFirstname] = useState('')
  const [email,setEmail] = useState('')
  const [psw,setPsw] = useState('')
  const [psw2,setPsw2] = useState('')

  const [regError, setRegError] = useState('')
  const [regMessage, setRegMessage] = useState('')

  async function onRegister() {
    setRegError('')
    setRegMessage('')
    console.log(lastname,firstname,email,psw,psw2);
    if (!lastname || !firstname || !email || !psw || !psw2) {
      return setRegError('Nem lehet üres adatokat tartalmazó mező!')
      }
  
      if (psw !== psw2) {
          return setRegError('A két jelszó nem egyezik!')
  
      }
  
  
      try {
          const data = await register(lastname,firstname,email,psw)
          //console.log(data);
          if (data.error) {
              setRegError(data.error)
          }
          setRegMessage(data.message)
          login(email,psw)
          setTimeout(() => navigate('/'), 1000);
      } catch (err) {
          setRegError('Nem sikerült kapcsolódni a backendhez!')
  
      }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        {/* BAL OLDAL – BRANDING */}
        <div className="register-left">
          <div className="brand">
            <div className="logo">
              <img src="./pictures/only_logo.png" alt="logo" />
            </div>
            <h2>BARO CINEMA</h2>
            <p>Éld át a filmek világát prémium élménnyel.</p>
          </div>
        </div>

        {/* JOBB OLDAL – FORM */}
        <div className="register-right">
          <div className="form-wrapper">
            <h1>LÉGY TE IS BARO CINEMA TAG!</h1>
            {regError && <div className='alert alert-danger text-center my-2'>{regError}</div>}
            {regMessage && <div className='alert alert-success text-center my-2'>{regMessage}</div>}

              <div className="form-row">
                <InputField label="Vezetéknév" type="text" placeholder="" value={lastname} setValue={setLastname}/>

                <InputField label="Keresztnév" type="text" placeholder="" value={firstname} setValue={setFirstname}/>
              </div>

              <InputField label="Email" type="email" placeholder="" value={email} setValue={setEmail}/>

              <InputField label="Jelszó" type="password" placeholder="" value={psw} setValue={setPsw}/>

              <InputField label="Jelszó megerősítése" type="password" placeholder="" value={psw2} setValue={setPsw2}/>
              
              <Button type="button"  buttonClass="submit-btn" content="FIÓK LÉTREHOZÁSA" onClick={onRegister}/>

              <p className="login-link">
                Már van fiókod? <Link to='/login'><span>Bejelentkezés</span></Link>
              </p>
              <Link to='/'><p className='home-link'>Vissza a főoldalra</p></Link>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Registration
