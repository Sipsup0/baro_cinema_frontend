import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import "../pages/Seats.css"

navigate("/Seats/" + movie.id)

export default function Movie({ user, onLogout, }) {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovies() {
            try {

                const res = await fetch("http://192.168.9.110:4500")

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Hiba történt")
                }

                setMovies(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadMovies()

    }, [])

    if (loading) return <p style={{ textAlign: "center" }}>Betöltés...</p>

    if (error) return <p style={{ textAlign: "center" }}>{error}</p>

    return (
        <div>

            <NavBar />

            <div className="movies-container" style={{
                
            }}>
                {movies.map((movie, i) => (
                    <div
                        key={movie.id || i}
                        className="movie-card"
                        onClick={() => navigate("/movie/" + (movie.id || i))}
                    >

                        <img
                            src={movie.image || movie.poster || "/placeholder.jpg"}
                            alt={movie.title}
                        />

                        <div className="movie-info">
                            <h3>{movie.title || movie.name}</h3>
                            <p>{movie.genre || movie.category}</p>
                            <span>{movie.length || movie.duration} perc</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}