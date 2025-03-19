/**
 * Storage service for saving and loading code
 */

const STORAGE_KEY_PREFIX = 'g-ide-';
const CODE_STORAGE_KEY = `${STORAGE_KEY_PREFIX}code`;
const LANGUAGE_STORAGE_KEY = `${STORAGE_KEY_PREFIX}language`;
const THEME_STORAGE_KEY = `${STORAGE_KEY_PREFIX}theme`;
const FONT_SIZE_STORAGE_KEY = `${STORAGE_KEY_PREFIX}font-size`;
const SAVED_SNIPPETS_KEY = `${STORAGE_KEY_PREFIX}saved-snippets`;

/**
 * Save code to local storage
 * @param {string} code - The code to save
 */
export const saveCode = (code) => {
  try {
    localStorage.setItem(CODE_STORAGE_KEY, code);
  } catch (error) {
    console.error('Error saving code to local storage:', error);
  }
};

/**
 * Load code from local storage
 * @returns {string} - The saved code or empty string if not found
 */
export const loadCode = () => {
  try {
    return localStorage.getItem(CODE_STORAGE_KEY) || '';
  } catch (error) {
    console.error('Error loading code from local storage:', error);
    return '';
  }
};

/**
 * Save language preference to local storage
 * @param {string} language - The language to save
 */
export const saveLanguage = (language) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language to local storage:', error);
  }
};

/**
 * Load language preference from local storage
 * @returns {string} - The saved language or default ('cpp')
 */
export const loadLanguage = () => {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'cpp';
  } catch (error) {
    console.error('Error loading language from local storage:', error);
    return 'cpp';
  }
};

/**
 * Save theme preference to local storage
 * @param {string} theme - The theme to save
 */
export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to local storage:', error);
  }
};

/**
 * Load theme preference from local storage
 * @returns {string} - The saved theme or default ('solarized_light')
 */
export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'solarized_light';
  } catch (error) {
    console.error('Error loading theme from local storage:', error);
    return 'solarized_light';
  }
};

/**
 * Save font size preference to local storage
 * @param {number} fontSize - The font size to save
 */
export const saveFontSize = (fontSize) => {
  try {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize.toString());
  } catch (error) {
    console.error('Error saving font size to local storage:', error);
  }
};

/**
 * Load font size preference from local storage
 * @returns {number} - The saved font size or default (14)
 */
export const loadFontSize = () => {
  try {
    return parseInt(localStorage.getItem(FONT_SIZE_STORAGE_KEY) || '14', 10);
  } catch (error) {
    console.error('Error loading font size from local storage:', error);
    return 14;
  }
};

/**
 * Save a named code snippet
 * @param {string} name - Name of the snippet
 * @param {Object} snippet - Snippet object with code, language, etc.
 */
export const saveSnippet = (name, snippet) => {
  try {
    const snippets = loadSnippets();
    snippets[name] = {
      ...snippet,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(SAVED_SNIPPETS_KEY, JSON.stringify(snippets));
    return true;
  } catch (error) {
    console.error('Error saving snippet:', error);
    return false;
  }
};

/**
 * Load all saved snippets
 * @returns {Object} - Object with all saved snippets
 */
export const loadSnippets = () => {
  try {
    const snippets = localStorage.getItem(SAVED_SNIPPETS_KEY);
    return snippets ? JSON.parse(snippets) : {};
  } catch (error) {
    console.error('Error loading snippets:', error);
    return {};
  }
};

/**
 * Delete a saved snippet
 * @param {string} name - Name of the snippet to delete
 * @returns {boolean} - True if successful, false otherwise
 */
export const deleteSnippet = (name) => {
  try {
    const snippets = loadSnippets();
    if (snippets[name]) {
      delete snippets[name];
      localStorage.setItem(SAVED_SNIPPETS_KEY, JSON.stringify(snippets));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting snippet:', error);
    return false;
  }
};