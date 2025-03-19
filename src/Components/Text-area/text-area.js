import React from "react";
import classes from './text-area.module.css';

export default function Text_area(props) {
    return (
        <div className={classes.text_container}>
            <h3>Input</h3>
            <textarea 
                onChange={props.ONCHANGE} 
                className={classes.text_area}
                placeholder="Enter input for your program here..."
            >
            </textarea>
            <br></br>
            <div className={classes.button_container}>
                <button 
                    onClick={props.onrunclick} 
                    className={`${classes.btn} ${classes.run_btn}`}
                    disabled={props.isExecuting}
                >
                    {props.isExecuting ? 'Running...' : 'Run'}
                </button>
                {props.onformatclick && (
                    <button 
                        onClick={props.onformatclick} 
                        className={`${classes.btn} ${classes.format_btn}`}
                    >
                        Format Code
                    </button>
                )}
            </div>
            <h3>Output</h3>
            <textarea 
                className={`${classes.text_area} ${props.executionError ? classes.error_output : ''}`}
                readOnly
                value={props.executionOutput || ''}
                placeholder="Output will appear here after running your code..."
            >
            </textarea>
            {props.executionError && (
                <div className={classes.error_message}>
                    {props.executionError}
                </div>
            )}
        </div>
    );
}