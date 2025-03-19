import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from './Components/Top-Bar/top-bar';
import Footer from './Components/Footer/footer';
import Editor from './Components/Main-section/editor';
import React, { Component } from 'react';
import { loadLanguage, loadTheme, loadFontSize } from './services/storageService';

class App extends Component {
  constructor(props) {
    super(props);
    
    // Initialize state with saved preferences
    this.state = {
      Theme: loadTheme(),
      font_size: loadFontSize(),
      language: loadLanguage(),
    };
  }

  onthemeclick = (theme) => {
    this.setState({ Theme: theme });
  }

  onfont_size = (font) => {
    this.setState({ font_size: font });
  }

  onlanguageclick = (lang) => {
    this.setState({ language: lang });
  }

  render() {
    return (
      <div className="App">
        <TopBar />
        <div className="editor_style">
          <Editor 
            theme={this.state.Theme} 
            font_size={this.state.font_size} 
            language={this.state.language} 
            onthemeclick={this.onthemeclick} 
            onfont_size={this.onfont_size} 
            onlanguageclick={this.onlanguageclick}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;