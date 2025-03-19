# G-IDE Online IDE

A modern, feature-rich online code editor and IDE built with React.

## Features

- **Code Execution**: Execute code in multiple languages (C++, Java, Python) using the Judge0 API
- **Syntax Highlighting**: Powered by Ace Editor with support for multiple languages
- **Code Formatting**: Format your code with a single click
- **Theme Selection**: Choose from multiple editor themes (Solarized Light, Solarized Dark, Monokai)
- **Font Size Adjustment**: Customize the editor font size
- **Keyboard Shortcuts**: Boost productivity with common IDE shortcuts
- **Local Storage**: Automatically saves your code, language, theme, and font size preferences
- **Error Handling**: Clear display of compilation and runtime errors
- **Responsive Design**: Works on desktop and mobile devices

## Keyboard Shortcuts

- `Ctrl+S`: Save code
- `Ctrl+R`: Run code
- `Ctrl+Shift+F`: Format code
- `Ctrl+Shift+L`: Toggle light/dark theme
- `Ctrl+=`: Increase font size
- `Ctrl+-`: Decrease font size

## Technologies Used

- React
- Ace Editor
- Judge0 API (for code execution)
- Prettier (for code formatting)
- Bootstrap (for UI components)
- Local Storage API (for saving preferences)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A RapidAPI key for the Judge0 API (for code execution)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Yeswanth-gif/G-IDE-ONLINE-IDE-.git
   cd G-IDE-ONLINE-IDE-
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the Judge0 API:
   - Sign up for a free API key at [RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce)
   - Open `src/services/codeExecutionService.js` and replace `'YOUR_RAPIDAPI_KEY'` with your actual API key

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

To deploy the application to GitHub Pages:

```
npm run deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Judge0](https://judge0.com/) for the code execution API
- [Ace Editor](https://ace.c9.io/) for the code editor
- [React](https://reactjs.org/) for the UI framework