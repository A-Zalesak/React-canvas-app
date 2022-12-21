import React from 'react';


export default function Square(props) {

    const styles = {
        backgroundColor: props.color,
        borderWidth: props.showGridlines ? "1px" : "0px",
        padding: props.showGridlines ? "10px" : "11px",
        borderStyle: "solid",
        borderColor: "black"
    }

    return(
        <div
        className="square"
        onMouseOver={props.changeColorHover}
        onClick={props.changeColorClick}
        style={styles}>
        </div>
    )
}
