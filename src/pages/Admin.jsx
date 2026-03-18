import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import "./Admin.css"

export default function Admin() {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [editingMovie, setEditingMovie] = useState(null)
    const [form, setForm] = useState({
        title: "",
        genre: "",
        length: "",
        image: ""
    })

    useEffect(() => {
        loadMovies()
    }, [])

    async function loadMovies() {
        const res = await fetch("http://192.168.9.110:4500/movies/all")
        const data = await res.json()
        setMovies(data)
    }

    /* -------- DELETE -------- */

    async function handleDelete(id) {
        await fetch(`http://192.168.9.110:4500/movies/delete/${id}`, {
            method: "DELETE",
            credentials: "include" // auth miatt!
        })

        setMovies(movies.filter(m => m.id !== id))
    }

    /* -------- EDIT -------- */

    function startEdit(movie) {
        setEditingMovie(movie.id)
        setForm({
            title: movie.title,
            genre: movie.genre,
            length: movie.length
        })
    }

    async function handleUpdate() {
        await fetch("http://192.168.9.110:4500/movies/addmovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        setEditingId(null)
        loadMovies()
    }

    return (
        <div>

            <NavBar />

            <h1 className="admin-title">Admin Panel</h1>

            <div className="admin-container">

                {movies.map(movie => (

                    <div key={movie.id} className="admin-card">

                        <img src={movie.image} />

                        {editingMovie === movie.id ? (
                            <>
                                <input
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                />

                                <input
                                    value={form.genre}
                                    onChange={e => setForm({ ...form, genre: e.target.value })}
                                />

                                <input
                                    value={form.length}
                                    onChange={e => setForm({ ...form, length: e.target.value })}
                                />

                                <button onClick={() => handleUpdate(movie.id)}>Mentés</button>
                            </>
                        ) : (
                            <>
                                <h3>{movie.title}</h3>
                                <p>{movie.genre}</p>
                                <span>{movie.length} perc</span>

                                <div className="admin-buttons">
                                    <button onClick={() => startEdit(movie)}>✏️</button>
                                    <button onClick={() => handleDelete(movie.id)}>🗑</button>
                                </div>
                            </>
                        )}

                    </div>

                ))}

            </div>

        </div>
    )
}