import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'; 
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';



// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'b81fe438279f49279e0970dbd643a6ce'
});



const particlesOptions = {
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
class App extends Component {

  constructor() {
    super(); 
    this.state = { 
      input :'',
      imageUrl :''
    }
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  
  }

  onButtonSubmit = () => {
   // console.log('click');
   this.setState({imageUrl:this.state.input});
   
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      response => {console.log(response.output[0].data.region[0].region_info.bounding_box);}
    ,
    function(err) {
      // there was an error
    }
  );
  } 
  render() {
    return (
      <div className="App">
      <Particles className='particle' params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
        <FaceRecognition image={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
