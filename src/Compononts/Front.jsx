import React from "react"

export default function Front(props) {
    return(
        <div className="front">
            <h1>Quizzical</h1>
            <p>Can you get them all right?</p>
            <button className="btn start" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}