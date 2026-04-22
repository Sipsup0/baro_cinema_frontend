import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import "./Admin.css"
import { whoami, logout } from "../users"

export default function Admin() {
    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)

    const [form, setForm] = useState({
        movieId: null,
        title: "",
        genre: "",
        duration: "",
        image: ""
    })

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    useEffect(() => {
        loadMovies()
        loadUser()
    }, [])

    async function loadUser() {
        const data = await whoami()
        if (!data?.error) setUser(data)
        else setUserError(data.error)
    }

    async function onLogout() {
        const data = await logout()
        if (data.error) return setUserError(data.error)
        setUser(null)
        navigate("/")
    }

    async function loadMovies() {
        try {
            const res = await fetch("/movies/all")
            const data = await res.json()
            setMovies(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDelete(movieId) {
        try {
            await fetch(`/movies/delete/${movieId}`, {
                method: "DELETE",
                credentials: "include"
            })

            setMovies(prev => prev.filter(m => m.movieId !== movieId))
        } catch (err) {
            console.error(err)
        }
    }

    function startEdit(movie, index) {
        setEditingIndex(index)
        setForm({
            movieId: movie.movieId,
            title: movie.title || "",
            genre: movie.genre || "",
            duration: movie.duration || "",
            image: movie.image || ""
        })
    }

    function cancelEdit() {
        setEditingIndex(null)
        setForm({
            movieId: null,
            title: "",
            genre: "",
            duration: "",
            image: ""
        })
    }

    async function handleUpdate() {
        try {
            await fetch("/movies/addmovie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
                credentials: "include"
            })

            setMovies(prev =>
                prev.map(movie =>
                    movie.movieId === form.movieId
                        ? {
                            ...movie,
                            title: form.title,
                            genre: form.genre,
                            duration: form.duration,
                            image: form.image
                        }
                        : movie
                )
            )

            cancelEdit()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="admin-page">
            <NavBar user={user} onLogout={onLogout} />

            {userError && <div className="error">{userError}</div>}

            <h1 className="admin-title">Admin Panel</h1>

            <div className="admin-container">
                {movies.map((movie, index) => (
                    <div key={movie.movieId || index} className="admin-card">
                        <img src={movie.image} alt={movie.title} />

                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={e =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    placeholder="Film címe"
                                />

                                <input
                                    type="text"
                                    value={form.genre}
                                    onChange={e =>
                                        setForm({ ...form, genre: e.target.value })
                                    }
                                    placeholder="Műfaj"
                                />

                                <input
                                    type="text"
                                    value={form.duration}
                                    onChange={e =>
                                        setForm({ ...form, duration: e.target.value })
                                    }
                                    placeholder="Időtartam"
                                />

                                <input
                                    type="text"
                                    value={form.image}
                                    onChange={e =>
                                        setForm({ ...form, image: e.target.value })
                                    }
                                    placeholder="Kép URL"
                                />

                                <div className="admin-buttons">
                                    <button className="save-btn" onClick={handleUpdate}>
                                        Mentés
                                    </button>
                                    <button className="cancel-btn" onClick={cancelEdit}>
                                        Mégse
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>{movie.title}</h3>
                                <p>{movie.genre}</p>
                                <span>{movie.duration}</span>

                                <div className="admin-buttons">
                                    <button onClick={() => startEdit(movie, index)}>✏️</button>
                                    <button onClick={() => handleDelete(movie.movieId)}>🗑️</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}