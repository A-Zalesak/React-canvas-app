import React from "react"

export default function Navbar(props) {
    return(
        <div>
            <h1>I'm a new navbar! Let's be friends!</h1>
            <button onClick={() => props.changePaintColor("cyan")}>Click for cyan!</button>
            <button onClick={() => props.changePaintColor("magenta")}>Click for magenta!</button>
            <button onClick={() => props.changePaintColor("yellow")}>Click for yellow!</button>
            <button onClick={() => props.changePaintColor("all")}>Click for grey!</button>
            <button onClick={() => props.changePaintColor("white")}>Click for white!</button>
        </div>
    )
}