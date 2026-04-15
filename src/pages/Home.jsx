import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../pages/NavBar.css"
import "../pages/Home.css"
import { whoami, logout } from "../users"
const BACKEND_URL = '/user'

export default function Home() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    /* betoltes backendbol */
    const [movies, setMovies] = useState([])

    const [startIndex, setStartIndex] = useState(0)
    const [visibleCount, setVisibleCount] = useState(3)

    /* responsive */
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 600) setVisibleCount(1)
            else if (window.innerWidth < 900) setVisibleCount(2)
            else setVisibleCount(5)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    /* user */
    useEffect(() => {
        async function loadUser() {
            const data = await whoami()
            if (!data?.error) setUser(data)
            setUserError(data.error)
        }
        loadUser()
    }, [])

    /*  filmek betoltese */
    useEffect(() => {
        async function loadMovies() {
            try {
                const res = await fetch("http://192.168.9.110:4500/movies/all")
                const data = await res.json()

                // ha {movies: []}
                setMovies(data.movies || data)

            } catch (err) {
                console.error(err)
            }
        }

        loadMovies()
    }, [])

    function nextSlide() {
        if (startIndex + visibleCount < movies.length) {
            setStartIndex(startIndex + 1)
        }
    }

    function prevSlide() {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1)
        }
    }

    async function onLogout() {
        const data = await logout()
        if (data.error) return setUserError(data.error)
        setUser(null)
        navigate('/')
    }

    return (
        <div>

            <NavBar user={user} onLogout={onLogout} />

            {userError && (
                <div className='alert alert-danger text-center my-2'>
                    {userError}
                </div>
            )}

            <div className="title">
                <h1>Most műsoron</h1>
            </div>

            <div className="carousel">

                <button onClick={prevSlide}>❮</button>

                <div  className="wrapper ">
                    <div className="images ">

                        {movies
                            .slice(startIndex, startIndex + visibleCount)
                            .map((movie, i) => (

                                <div className=""
                                    key={movie.id || movie._id || i}
                                    onClick={() => navigate("/movie/" + (movie.id || movie._id))}
                                >

                                    <img
                                        src={movie.image || movie.picture}
                                        className="movie-img"
                                        alt={movie.title}
                                    />

                                    <div className="movie-title">
                                        {movie.title || movie.name} | {movie.genre} | {movie.length || movie.duration} perc
                                    </div>

                                </div>

                            ))}

                    </div>
                </div>

                <button onClick={nextSlide}>❯</button>

            </div>

        </div>
    )
}
