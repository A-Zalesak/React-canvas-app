import React from "react"
import './Navbar.css'

export default function Navbar(props) {
    return(
        <nav>
            <h1>Let's Be Creative!</h1>
            <button className="button--cyan" onClick={() => props.changePaintColor("cyan")}>Cyan</button>
            <button className="button--magenta" onClick={() => props.changePaintColor("magenta")}>Magenta</button>
            <button className="button--yellow" onClick={() => props.changePaintColor("yellow")}>Yellow</button>
            <button className="button--grey" onClick={() => props.changePaintColor("grey")}>Grey</button>
            <button className="button--white" onClick={() => props.changePaintColor("white")}>White</button>
        </nav>
    )
}