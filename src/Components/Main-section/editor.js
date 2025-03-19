import React, { useState, useEffect, useCallback } from "react";
import AceEditor from "react-ace";

import classes from './editor.module.css';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Font_size from "../Font size and theme selectors/edit-sections";
import Text_area from "../Text-area/text-area";
import { executeCode, formatExecutionResult } from "../../services/codeExecutionService";
import { formatCodeWithFallback } from "../../services/codeFormatterService";
import { initKeyboardShortcuts } from "../../services/keyboardShortcutsService";
import { saveCode, loadCode, saveLanguage, loadLanguage, saveTheme, loadTheme, saveFontSize } from "../../services/storageService";

// Language mapping for file extensions
const languageExtensions = {
  'python': 'py',
  'cpp': 'cpp',
  'java': 'java'
};

export default function Editor(props) {
    // State variables
    const [code, setCode] = useState('');
    const [stdin, setInput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionOutput, setExecutionOutput] = useState('');
    const [executionError, setExecutionError] = useState('');
    const [isFormatting, setIsFormatting] = useState(false);
    
    // Load saved code on component mount
    useEffect(() => {
        const savedCode = loadCode();
        if (savedCode) {
            setCode(savedCode);
        }
    }, []);
    
    // Save code when it changes
    useEffect(() => {
        saveCode(code);
    }, [code]);
    
    // Save language when it changes
    useEffect(() => {
        saveLanguage(props.language);
    }, [props.language]);
    
    // Save theme when it changes
    useEffect(() => {
        saveTheme(props.theme);
    }, [props.theme]);
    
    // Save font size when it changes
    useEffect(() => {
        saveFontSize(props.font_size);
    }, [props.font_size]);
    
    // Handle code execution
    const handleClickOnRun = useCallback(async () => {
        try {
            setIsExecuting(true);
            setExecutionOutput('');
            setExecutionError('');
            
            // Execute the code
            const result = await executeCode(code, props.language, stdin);
            
            // Format the result
            const formattedResult = formatExecutionResult(result);
            
            // Update the output
            if (formattedResult.error) {
                setExecutionError(formattedResult.error);
            } else {
                setExecutionOutput(formattedResult.output);
            }
        } catch (error) {
            setExecutionError(`Error executing code: ${error.message}`);
        } finally {
            setIsExecuting(false);
        }
    }, [code, props.language, stdin]);
    
    // Handle code formatting
    const handleFormatCode = useCallback(async () => {
        try {
            setIsFormatting(true);
            
            // Format the code
            let mode = props.language;
            if (mode === 'cpp') {
                mode = 'c_cpp';
            }
            
            const formattedCode = await formatCodeWithFallback(code, mode);
            
            // Update the code
            setCode(formattedCode);
        } catch (error) {
            console.error('Error formatting code:', error);
            // We don't show an error to the user here, just log it
        } finally {
            setIsFormatting(false);
        }
    }, [code, props.language]);
    
    // Initialize keyboard shortcuts
    useEffect(() => {
        const cleanup = initKeyboardShortcuts({
            onRun: handleClickOnRun,
            onFormat: handleFormatCode,
            onIncreaseFontSize: () => props.onfont_size(props.font_size + 2),
            onDecreaseFontSize: () => props.onfont_size(Math.max(8, props.font_size - 2)),
            onToggleTheme: () => {
                const themes = ['solarized_light', 'solarized_dark', 'monokai'];
                const currentIndex = themes.indexOf(props.theme);
                const nextIndex = (currentIndex + 1) % themes.length;
                props.onthemeclick(themes[nextIndex]);
            }
        });
        
        return cleanup;
    }, [handleClickOnRun, handleFormatCode, props]);
    
    // Handle code changes
    function onChange(newValue) {
        setCode(newValue);
    }
    
    // Handle input changes
    function onChangeInput(e) {
        setInput(e.target.value);
    }
    
    // Determine the editor mode
    let mode = props.language;
    if (mode === 'cpp') {
        mode = 'c_cpp';
    }
    
    return (
        <div className={classes.head}>
            <div className={classes.editor_container}>
                <Font_size 
                    onthemeclick={props.onthemeclick} 
                    onLanguageclick={props.onlanguageclick} 
                    onfont_size={props.onfont_size} 
                />
                <span className={classes.editor}>
                    <AceEditor
                        fontSize={props.font_size}
                        width="100%"
                        height="75vh"
                        mode={mode}
                        theme={props.theme}
                        onChange={onChange}
                        value={code}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    /> 
                </span>
            </div>
            <div className={classes.inputandoutput}>
                <Text_area 
                    ONCHANGE={onChangeInput} 
                    onrunclick={handleClickOnRun}
                    onformatclick={handleFormatCode}
                    isExecuting={isExecuting}
                    executionOutput={executionOutput}
                    executionError={executionError}
                />
            </div>
        </div>
    );
}