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

    // Button-pressed will override for the current color
    function buttonClasses(color) {
        const holdButtonDown = props.currentColor === color ? " button-pressed" : ""
        return `button-52 ${holdButtonDown}`
    }

    const rgbElements = rgbColors.map(color => (
        <button
        key={color.id}
        className={buttonClasses(color.color)}
        id={`button--${color.color}`}
        onClick={() => props.changePaintColor(color.color)}
        >
            {color.color.charAt(0).toUpperCase() + color.color.slice(1)}
        </button>
    ))

    const greyWhiteElements = greyWhiteColors.map(color => (
        <button
        key={color.id}
        className={buttonClasses(color.color)}
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