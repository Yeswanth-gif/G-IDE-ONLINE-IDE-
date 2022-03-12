import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import classes from './edit-sections.module.css';

 export default function Font_size (props) {
     return (
         <div className={classes.font_size} >
             <div className={classes.form_container}>
                 <span>Language: </span>
                <Form.Select onClick ={(e) => props.onLanguageclick(e.target.value)} className={classes.form_select}>
                    <option  value = 'cpp'>cpp</option>
                    <option  value = 'python'>python</option>
                    <option  value = 'java'>java</option>
                </Form.Select>
            </div>
            <div className={classes.form_container}>
                <span>FontSize:</span>
                <Form.Select onClick={(e) => props.onfont_size(parseInt(e.target.value))} className={classes.form_select}>
                    <option>10px</option>
                    <option value = '12'>12px</option>
                    <option value = '15'>15px</option>
                    <option value = '20'>20px</option>
                </Form.Select>
            </div>
            <div className={classes.form_container}>
                <span>Theme:</span>
                <Form.Select onClick={(e) => props.onthemeclick(e.target.value)}  className={classes.form_select}>
                    <option  value = 'solarized_light'>solarized_light</option>
                    <option value = 'monokai'>monokai</option>
                    <option value = 'solarized_dark'>solarized_dark</option>
                    <option value = 'github'>github</option>
                </Form.Select>
            </div>
            
        </div>
     )
}