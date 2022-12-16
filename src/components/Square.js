import React from 'react';
import './Square.css';


export default function Square(props) {

    const styles = {backgroundColor: props.color}

    /*
    function handleHover() {
        console.log(props.row, props.col)
    }
    */

    return(
        <div className="square" onClick={props.changeColor} style={styles}>
        </div>
    )
}
