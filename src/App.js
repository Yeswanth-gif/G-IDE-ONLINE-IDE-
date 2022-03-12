
import classes from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from './Components/Top-Bar/top-bar';
import Footer from './Components/Footer/footer';
import Editor from './Components/Main-section/editor';
import React , {Component} from 'react';
import Text_area from './Components/Text-area/text-area';



class  App extends Component {

  state = {
    Theme : 'solarized_light',
    font_size : 10,
    language : 'cpp', 
  }

  onthemeclick = (theme) => {
    this.setState({Theme : theme});
  }

  onfont_size = (font) => {
    this.setState({font_size : font});
  }

  onlanguageclick = (lang) => {
    this.setState({language : lang});
  }

  render (){
    return (
      <div className="App">
        <TopBar/>
        <div className={classes.editor_style}>
           <Editor theme = {this.state.Theme} font_size = {this.state.font_size} language = {this.state.language} onthemeclick = {this.onthemeclick} onfont_size = {this.onfont_size} onlanguageclick = {this.onlanguageclick}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
