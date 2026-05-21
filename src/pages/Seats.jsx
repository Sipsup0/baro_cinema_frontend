import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import "../pages/Seats.css"
import { Link } from "react-router-dom"
import { whoami, logout } from "../users"

export default function Seats() {

  const { id } = useParams() // URL: /seats/:id
  const navigate = useNavigate()

  // user
  const [user, setUser] = useState(null)
  const [userError, setUserError] = useState(null)

  // movie
  const [movie, setMovie] = useState(null)

  // seats
  const [selectedSeats, setSelectedSeats] = useState([])

  const rows = 5
  const cols = 5

  // user betoltes
  useEffect(() => {
    async function loadUser() {
      const data = await whoami()
      if (!data?.error) setUser(data)
      else setUserError(data.error)
    }
    loadUser()
  }, [])

  // film betoltes backendbol
  useEffect(() => {
    async function loadMovie() {
      try {
        const res = await fetch("/movies/all")
        const data = await res.json()

        const found = data.find(m => m.movieId == id)
        setMovie(found)

      } catch (err) {
        console.error(err)
      }
    }

    loadMovie()
  }, [id])

  // logout
  async function onLogout() {
    const data = await logout()
    if (data.error) return setUserError(data.error)
    setUser(null)
    navigate("/")
  }

  // szek valasztas
  function toggleSeat(index) {
    if (selectedSeats.includes(index)) {
      setSelectedSeats(selectedSeats.filter(s => s !== index))
    } else {
      setSelectedSeats([...selectedSeats, index])
    }
  }

  // foglalas
  function handleBooking() {
    console.log("Film:", movie)
    console.log("Székek:", selectedSeats)
  }

  return (
    <div>

      <NavBar user={user} onLogout={onLogout} />

      {userError && (
        <div style={{ textAlign: "center", color: "red" }}>
          {userError}
        </div>
      )}

      <div className="seats-page">

        <h2>
          Foglalás: {movie ? movie.title : "Betöltés..."}
        </h2>

        <div className="screen">VÁSZON</div>

        <div className="seats-grid">
          {Array.from({ length: rows * cols }).map((_, i) => (
            <div
              key={i}
              className={`seat ${selectedSeats.includes(i) ? "selected" : ""}`}
              onClick={() => toggleSeat(i)}
            />
          ))}
        </div>

        <div className="info">
          <p>Kiválasztott helyek: {selectedSeats.length}</p>
          <p>Összeg: {selectedSeats.length * 2000} Ft</p>
        </div>

        <button type="button" className="booking-btn" content="Foglalás" onClick={handleBooking}>
          <Link to='/'><p className='home-link'>Foglalás</p></Link>
        </button>

      </div>
    </div>
  )
}