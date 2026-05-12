import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import "../pages/Seats.css"

const BASE_URL = "/movies"

export default function Movie({ user, onLogout }) {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovies() {
            try {
                const res = await fetch(BASE_URL + "/all")
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

            <div className="movies-container">
                {movies.map((movie) => (
                    <div
                        key={movie.movieId}
                        onClick={() => {
                            console.log("CLICK:", movie)
                            navigate("/movies/" + movie.movieId)
                        }}
                    >
                        <img
                            src={
                                movie.image
                                    ? BASE_URL + movie.image
                                    : "/placeholder.jpg"
                            }
                            alt={movie.title}
                        />

                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <p>{movie.genre}</p>
                            <span>{movie.length} perc</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}