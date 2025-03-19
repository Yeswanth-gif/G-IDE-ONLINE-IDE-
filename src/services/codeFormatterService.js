/**
 * Code formatting service using Prettier
 * This is a simple implementation that can be expanded with more options
 */

// Map of language modes to Prettier parsers
const LANGUAGE_PARSERS = {
  'c_cpp': 'babel', // Fallback to babel for C/C++
  'java': 'java',
  'python': 'python'
};

/**
 * Format code using Prettier
 * @param {string} code - The code to format
 * @param {string} language - The programming language
 * @returns {Promise<string>} - Formatted code
 */
export const formatCode = async (code, language) => {
  try {
    // Dynamically import prettier only when needed
    const prettier = await import('prettier/standalone');
    
    // Get the appropriate parser for the language
    const parser = LANGUAGE_PARSERS[language] || 'babel';
    
    // Import the required parser plugins
    let plugins = [];
    
    if (parser === 'babel') {
      const babylonPlugin = await import('prettier/parser-babel');
      plugins.push(babylonPlugin.default);
    } else if (parser === 'java') {
      const javaPlugin = await import('prettier/parser-java');
      plugins.push(javaPlugin.default);
    } else if (parser === 'python') {
      const pythonPlugin = await import('prettier/parser-python');
      plugins.push(pythonPlugin.default);
    }
    
    // Format the code
    const formattedCode = await prettier.default.format(code, {
      parser: parser,
      plugins: plugins,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      arrowParens: 'avoid'
    });
    
    return formattedCode;
  } catch (error) {
    console.error('Error formatting code:', error);
    throw new Error(`Failed to format code: ${error.message}`);
  }
};

/**
 * Simple indentation-based formatter as a fallback
 * @param {string} code - The code to format
 * @param {string} language - The programming language
 * @returns {string} - Formatted code
 */
export const simpleFormat = (code, language) => {
  try {
    // Split the code into lines
    const lines = code.split('\n');
    
    // Initialize variables
    let formattedLines = [];
    let indentLevel = 0;
    const indentSize = 2;
    
    // Process each line
    for (let line of lines) {
      // Trim the line
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (trimmedLine === '') {
        formattedLines.push('');
        continue;
      }
      
      // Check for closing brackets/braces to decrease indent
      if (trimmedLine.startsWith('}') || trimmedLine.startsWith(')') || trimmedLine.startsWith(']')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      // Add the line with proper indentation
      const indent = ' '.repeat(indentLevel * indentSize);
      formattedLines.push(indent + trimmedLine);
      
      // Check for opening brackets/braces to increase indent
      if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || trimmedLine.endsWith('[') ||
          trimmedLine.endsWith(':')) {
        indentLevel++;
      }
    }
    
    // Join the lines and return
    return formattedLines.join('\n');
  } catch (error) {
    console.error('Error in simple formatting:', error);
    return code; // Return the original code if formatting fails
  }
};

/**
 * Format code with fallback to simple formatter
 * @param {string} code - The code to format
 * @param {string} language - The programming language
 * @returns {Promise<string>} - Formatted code
 */
export const formatCodeWithFallback = async (code, language) => {
  try {
    // Try to format with Prettier
    return await formatCode(code, language);
  } catch (error) {
    console.warn('Prettier formatting failed, using simple formatter:', error);
    // Fall back to simple formatter
    return simpleFormat(code, language);
  }
};