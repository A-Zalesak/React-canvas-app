import React from 'react';
import './Square.css';


export default function Square(props) {

    const styles = {backgroundColor: props.color}

    return(
        <div
        className="square"
        onMouseOver={props.changeColorHover}
        onClick={props.changeColorClick}
        style={styles}>
        </div>
    )
}
