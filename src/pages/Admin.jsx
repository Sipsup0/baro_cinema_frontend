import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../pages/NavBar.css"
import "../pages/Admin.css"
import { whoami, logout, admin } from "../users"

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
    console.log(userError);

    const movies = [
        {
            id: 1,
            title: "A csontok tava",
            image: {Pic1},
            genre: "Horror",
            time: "94 perc"
        },
        {
            id: 2,
            title: "Sikoly 7",
            image: {Pic2},
            genre: "Horror",
            time: "115 perc"
        },
        {
            id: 3,
            title: "Zootropolis 2",
            image: {Pic3},
            genre: "Animációs film",
            time: "111 perc"
        },
        {
            id: 4,
            title: "AVATAR: Tűz és Hamu",
            image: {Pic4},
            genre: "Horror",
            time: "197 perc"
        },
        {
            id: 5,
            title: "The Housemaid - A téboly otthona",
            image: {Pic5},
            genre: "Thriller",
            time: "131 perc"
        },
        {
            id: 6,
            title: "Horrorra Akadva 6 (HAMAROSAN)",
            image: {Pic6},
            genre: "Horror, Vígjáték",
            time: "- perc"
        },
    ]

    //console.log(user);
    useEffect(() => {
        async function load() {
            const data = await whoami()
            console.log(data);
            if (!data?.error) {
                setUser(data)
            }
            setUserError(data.error)

        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        navigate('/')
    }

    async function isAdmin() {
        const data = await admin()
        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        navigate('/')
    }
    return (

        <div>
            <div>

                <NavBar user={user} onLogout={onLogout}></NavBar>
                {userError && <div className='alert alert-danger text-center my-2'>{userError}</div>}
                <NavBar user={user} onLogout={isAdmin}></NavBar>
                {userError && <div className='alert alert-danger text-center my-2'>{userError}</div>}
                <div className="title">
                    <h1>Most műsoron</h1>
                </div>
                <div className="container">

                    <div className="mySlides">
                        <div className="numbertext">1 / 6</div>
                        <img src={Pic1} style={{width:100}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">2 / 6</div>
                        <img src={Pic2} style={{width:100}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">3 / 6</div>
                        <img src={Pic3} style={{width:100}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">4 / 6</div>
                        <img src={Pic4} style={{width:100}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">5 / 6</div>
                        <img src={Pic5} style={{width:100}} />
                    </div>

                    <div className="mySlides">
                        <div className="numbertext">6 / 6</div>
                        <img src={Pic6} style={{width:100}} />
                    </div>

                    <a className="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a className="next" onclick="plusSlides(1)">&#10095;</a>

                    <div className="caption-container">
                        <p id="caption"></p>
                    </div>

                    <div className="row">
                        <div className="column">
                            <img className="demo cursor" src={Pic1} style={{width:200}} onclick="currentSlide(1)" alt="A csontok tava" />
                        </div>
                        <div className="column">
                            <img className="demo cursor" src={Pic2} style={{width:190}} onclick="currentSlide(2)" alt="Sikoly 7" />
                        </div>
                        <div className="column">
                            <img className="demo cursor" src={Pic3} style={{width:240}} onclick="currentSlide(3)" alt="Zootropolis 2" />
                        </div>
                        <div className="column">
                            <img className="demo cursor" src={Pic4} style={{width:200}} onclick="currentSlide(4)" alt="AVATAR: Tűz és Hamu" />
                        </div>
                        <div className="column">
                            <img className="demo cursor" src={Pic5} style={{width:200}} onclick="currentSlide(5)" alt="The Housemaid - A téboly otthona" />
                        </div>
                        <div className="column">
                            <img className="demo cursor" src={Pic6} style={{width:200}} onclick="currentSlide(6)" alt="Horrorra Akadva 6 (HAMAROSAN)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}