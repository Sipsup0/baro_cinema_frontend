import { useState } from "react"
import { useParams } from "react-router-dom"
import "./Seats.css"

export default function Seats() {

  const { id } = useParams() // 🎬 melyik filmre foglalunk

  const rows = 5
  const cols = 5

  const [selectedSeats, setSelectedSeats] = useState([])

  // később backendből jön
  const reservedSeats = ["1-1", "2-3"]

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
    <div className="seats-container">

      <h2>Foglalás (Film ID: {id})</h2>

      <div className="screen">VÁSZON</div>

      <div className="seats-grid">

        {[...Array(rows)].map((_, row) => (
          <div key={row} className="seat-row">

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
        <p>Kiválasztott helyek: {selectedSeats.join(", ")}</p>
        <p>Összeg: {selectedSeats.length * 2500} Ft</p>

        <button onClick={() => console.log({
          movieId: id,
          seats: selectedSeats
        })}>
          Foglalás
        </button>
      </div>

    </div>
  )
}