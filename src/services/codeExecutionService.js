import axios from 'axios';

// Language IDs for Judge0 API
const LANGUAGE_IDS = {
  'cpp': 54,   // C++ (GCC 9.2.0)
  'java': 62,  // Java (OpenJDK 13.0.1)
  'python': 71 // Python (3.8.1)
};

// Judge0 API endpoints
const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const SUBMISSION_ENDPOINT = `${JUDGE0_API}/submissions`;

// RapidAPI headers - you'll need to sign up for a free API key
const HEADERS = {
  'content-type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Replace with your actual API key
};

/**
 * Submit code for execution
 * @param {string} sourceCode - The code to execute
 * @param {string} language - The programming language (cpp, java, python)
 * @param {string} stdin - Standard input for the program
 * @returns {Promise} - Promise with submission token
 */
export const submitCode = async (sourceCode, language, stdin) => {
  try {
    const languageId = LANGUAGE_IDS[language];
    
    if (!languageId) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const response = await axios.post(SUBMISSION_ENDPOINT, {
      source_code: sourceCode,
      language_id: languageId,
      stdin: stdin
    }, {
      headers: HEADERS,
      params: {
        base64_encoded: 'false',
        fields: '*'
      }
    });

    return response.data.token;
  } catch (error) {
    console.error('Error submitting code:', error);
    throw error;
  }
};

/**
 * Get the result of a code execution
 * @param {string} token - The submission token
 * @returns {Promise} - Promise with execution result
 */
export const getSubmissionResult = async (token) => {
  try {
    const response = await axios.get(`${SUBMISSION_ENDPOINT}/${token}`, {
      headers: HEADERS,
      params: {
        base64_encoded: 'false',
        fields: '*'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error getting submission result:', error);
    throw error;
  }
};

/**
 * Execute code and wait for the result
 * @param {string} sourceCode - The code to execute
 * @param {string} language - The programming language (cpp, java, python)
 * @param {string} stdin - Standard input for the program
 * @returns {Promise} - Promise with execution result
 */
export const executeCode = async (sourceCode, language, stdin) => {
  try {
    // Submit the code
    const token = await submitCode(sourceCode, language, stdin);
    
    // Poll for the result
    let result;
    let status;
    
    do {
      // Wait for 1 second before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the current status
      result = await getSubmissionResult(token);
      status = result.status?.id;
      
      // Continue polling until the execution is finished
    } while (status === 1 || status === 2); // 1: In Queue, 2: Processing
    
    return result;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
};

/**
 * Format the execution result for display
 * @param {Object} result - The execution result from Judge0
 * @returns {Object} - Formatted result with stdout, stderr, and error
 */
export const formatExecutionResult = (result) => {
  if (!result) {
    return { error: 'No result received' };
  }

  const { stdout, stderr, compile_output, status } = result;
  
  // Check for compilation error
  if (status?.id === 6) {
    return { error: compile_output || 'Compilation error' };
  }
  
  // Check for runtime error
  if (status?.id > 3) {
    return { error: stderr || status?.description || 'Runtime error' };
  }
  
  // Return successful output
  return {
    output: stdout || 'Program executed successfully with no output',
    error: stderr || null
  };
};