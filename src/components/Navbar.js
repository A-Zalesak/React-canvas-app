import React from "react"
import './Navbar.css'
import './Button.css'

export default function Navbar(props) {

    const rgbColors = [
        {id: 1, color: "cyan"},
        {id: 2, color: "magenta"},
        {id: 3, color: "yellow"}
    ]

    const greyWhiteColors = [
        {id: 1, color: "grey"},
        {id: 2, color: "white"}
    ]

    const rgbElements = rgbColors.map(color => (
        <button
        key={color.id}
        className="button-52"
        id={`button--${color.color}`}
        onClick={() => props.changePaintColor(color.color)}
        >
            {color.color.charAt(0).toUpperCase() + color.color.slice(1)}
        </button>
    ))

    const greyWhiteElements = greyWhiteColors.map(color => (
        <button
        key={color.id}
        className="button-52"
        id={`button--${color.color}`}
        onClick={() => props.changePaintColor(color.color)}
        >
            {color.color.charAt(0).toUpperCase() + color.color.slice(1)}
        </button>
    ))

    return(
        <nav>
            <h1>Let's Be Creative!</h1>
            <div>
                {rgbElements}
            </div>
            <div>
                {greyWhiteElements}
            </div>
        </nav>
    )
}