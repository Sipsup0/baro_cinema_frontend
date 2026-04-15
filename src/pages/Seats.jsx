import { useState } from "react"
import "../pages/Seats.css"

export default function Seats() {

    const rows = 6
    const cols = 8

    const [selectedSeats, setSelectedSeats] = useState([])

    // fake foglalt helyek (backend később)
    const reservedSeats = ["1-2", "2-5", "3-4"]

    function toggleSeat(row, col) {
        const seatId = `${row}-${col}`

        if (reservedSeats.includes(seatId)) return

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId))
        } else {
            setSelectedSeats([...selectedSeats, seatId])
        }
    }

    return (
        <div className="booking-container">

            <h2>Válassz helyet</h2>

            <div className="screen">VÁSZON</div>

            <div className="seats">
                {[...Array(rows)].map((_, row) => (
                    <div key={row} className="row">
                        {[...Array(cols)].map((_, col) => {
                            const seatId = `${row}-${col}`

                            const isReserved = reservedSeats.includes(seatId)
                            const isSelected = selectedSeats.includes(seatId)

                            return (
                                <div
                                    key={col}
                                    className={`seat 
                                        ${isReserved ? "reserved" : ""} 
                                        ${isSelected ? "selected" : ""}`}
                                    onClick={() => toggleSeat(row, col)}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className="summary">
                <p>Kiválasztott helyek: {selectedSeats.length}</p>
                <p>Összeg: {selectedSeats.length * 2500} Ft</p>
                <button>Foglalás</button>
            </div>

        </div>
    )
}