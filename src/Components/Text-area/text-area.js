import React from "react";

import classes from './text-area.module.css'

export default function Text_area (props) {
    return (
        <div className={classes.text_container}>
            <h3>Input</h3>
            <textarea onChange={props.ONCHANGE} className={classes.text_area}>
            </textarea>
            <br></br>
            <button onClick={props.onrunclick} className={classes.btn}>Run</button>
            <h3>Output</h3>
            <textarea className={classes.text_area}>
            </textarea>
        </div>
    )
}