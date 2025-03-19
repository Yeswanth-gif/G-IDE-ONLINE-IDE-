/**
 * Keyboard shortcuts service for the IDE
 */

// Define keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  // Editor shortcuts
  'Ctrl+S': 'Save',
  'Ctrl+R': 'Run',
  'Ctrl+Shift+F': 'Format',
  'Ctrl+/': 'Toggle Comment',
  'Ctrl+F': 'Find',
  'Ctrl+H': 'Replace',
  'Ctrl+Z': 'Undo',
  'Ctrl+Y': 'Redo',
  'Ctrl+A': 'Select All',
  'Ctrl+]': 'Indent',
  'Ctrl+[': 'Outdent',
  
  // Theme shortcuts
  'Ctrl+Shift+L': 'Toggle Light/Dark Theme',
  
  // Font size shortcuts
  'Ctrl+=': 'Increase Font Size',
  'Ctrl+-': 'Decrease Font Size',
};

/**
 * Initialize keyboard shortcuts
 * @param {Object} handlers - Object containing handler functions for shortcuts
 * @param {Function} handlers.onRun - Handler for Run shortcut
 * @param {Function} handlers.onFormat - Handler for Format shortcut
 * @param {Function} handlers.onSave - Handler for Save shortcut
 * @param {Function} handlers.onToggleTheme - Handler for Toggle Theme shortcut
 * @param {Function} handlers.onIncreaseFontSize - Handler for Increase Font Size shortcut
 * @param {Function} handlers.onDecreaseFontSize - Handler for Decrease Font Size shortcut
 */
export const initKeyboardShortcuts = (handlers = {}) => {
  const handleKeyDown = (event) => {
    // Check for modifier keys
    const ctrlKey = event.ctrlKey || event.metaKey; // metaKey for Mac
    const shiftKey = event.shiftKey;
    const key = event.key.toLowerCase();
    
    // Handle Ctrl+S (Save)
    if (ctrlKey && key === 's' && handlers.onSave) {
      event.preventDefault();
      handlers.onSave();
    }
    
    // Handle Ctrl+R (Run)
    if (ctrlKey && key === 'r' && handlers.onRun) {
      event.preventDefault();
      handlers.onRun();
    }
    
    // Handle Ctrl+Shift+F (Format)
    if (ctrlKey && shiftKey && key === 'f' && handlers.onFormat) {
      event.preventDefault();
      handlers.onFormat();
    }
    
    // Handle Ctrl+Shift+L (Toggle Theme)
    if (ctrlKey && shiftKey && key === 'l' && handlers.onToggleTheme) {
      event.preventDefault();
      handlers.onToggleTheme();
    }
    
    // Handle Ctrl+= (Increase Font Size)
    if (ctrlKey && (key === '=' || key === '+') && handlers.onIncreaseFontSize) {
      event.preventDefault();
      handlers.onIncreaseFontSize();
    }
    
    // Handle Ctrl+- (Decrease Font Size)
    if (ctrlKey && key === '-' && handlers.onDecreaseFontSize) {
      event.preventDefault();
      handlers.onDecreaseFontSize();
    }
  };
  
  // Add event listener
  document.addEventListener('keydown', handleKeyDown);
  
  // Return a cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Generate a help modal content with keyboard shortcuts
 * @returns {JSX.Element} - JSX element with keyboard shortcuts
 */
export const getKeyboardShortcutsHelp = () => {
  return Object.entries(KEYBOARD_SHORTCUTS).map(([shortcut, description]) => {
    return `${shortcut}: ${description}`;
  }).join('\n');
};