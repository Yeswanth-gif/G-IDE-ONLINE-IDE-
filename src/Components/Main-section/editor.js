import React, {useState} from "react";
import AceEditor from "react-ace";

import classes from './editor.module.css'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/theme-solarized_dark"
import Font_size from "../Font size and theme selectors/edit-sections";
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-solarized_light'
import Text_area from "../Text-area/text-area";
import { require } from "ace-builds";


const m = new Map();
m['python'] = 'py'
m['cpp'] = 'cpp'
m['java'] = 'java'

export default function Editor (props) {
    const [code, setcode] = useState('')
    const [stdin, setinput] = useState('')
    
    function handleClickonRun(){
        console.log("clicked")
        // console.log(fetch(config))
    }
    

    function onChange (newValue) {
        setcode(newValue)
    }
    
    function onchangeinput (e){
        setinput(e.target.value);
        console.log(typeof(input))
    }
    let mode1 = props.language
    if(mode1 === 'cpp'){
        mode1 = 'c_' + mode1
    }
    
    return(
    <div className={classes.head}>
        <div className={classes.editor_container}>
            <Font_size  onthemeclick = {props.onthemeclick} onLanguageclick = {props.onlanguageclick} onfont_size = {props.onfont_size} />
            <span className={classes.editor}>
                <AceEditor
                fontSize = {props.font_size}
                width = '100%'
                height = '75vh'
                mode={mode1}
                theme={props.theme}
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}/> 
            </span>
        </div>
        <div className={classes.inputandoutput}>
            <Text_area ONCHANGE = {onchangeinput} onrunclick = {handleClickonRun}/>
        </div>
    </div>
    )
}