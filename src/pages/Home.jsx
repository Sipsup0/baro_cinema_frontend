import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../pages/NavBar.css"
import "../pages/Home.css"
import { whoami, logout } from "../users"

import Pic1 from '../../pictures/BoneLake.jpg'
import Pic2 from '../../pictures/Sikoly_7.jpg'
import Pic3 from '../../pictures/Zootropolis_2.jpg'
import Pic4 from '../../pictures/Avatarfireandash.jpg'
import Pic5 from '../../pictures/Thehousemaid.jpg'
import Pic6 from '../../pictures/Scarymovie_6.jfif'

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    const data = [{title: "A csontok tava | Horror | 94 perc", picture: Pic1}, {title: "Sikoly 7 | Horror | 114 perc", picture: Pic2}, {title: "Zootropolisz 2 | Animáció | 110 perc", picture: Pic3}, {title: "Avatar: Tűz és hamu | Sci-fi | 197 perc", picture: Pic4}, {title: "The Housemaid | Thriller | 133 perc", picture: Pic5}, {title: "Horrorra akadva 6 | Vígjáték | HAMAROSAN", picture: Pic6}]
    const [startIndex, setStartIndex] = useState(0)

    const [visibleCount, setVisibleCount] = useState(3)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 600) {
                setVisibleCount(1)
            } else if (window.innerWidth < 900) {
                setVisibleCount(2)
            } else {
                setVisibleCount(5)
            }
        }
    
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        async function load() {
            const data = await whoami()
            if (!data?.error) setUser(data)
            setUserError(data.error)
        }
        load()
    }, [])

    function nextSlide() {
        if (startIndex + visibleCount < data.length) {
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

            {userError && <div className='alert alert-danger text-center my-2'>{userError}</div>}

            <div className="title">
                <h1>Most műsoron</h1>
            </div>

            <div className="carousel">
                <button onClick={prevSlide}>❮</button>

                <div className="images">
                    {data.slice(startIndex, startIndex + visibleCount).map((d, i) => (
                        <div>
                            <img key={i} src={d.picture} className="movie-img" />
                            <div className="movie-title">{d.title}</div>
                        </div>
                        
                    ))}
                </div>

                <button onClick={nextSlide}>❯</button>
            </div>
        </div>
    )
}