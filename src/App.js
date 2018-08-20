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
      imageUrl :'',
      box:{}
    }
  }

  calculateFaceLocation = (data) => {

    console.log(data);
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 

   const image = document.getElementById('inputImage');
   const height = Number(image.height);
   const width = Number(image.width);

   return{
     leftCol : clarifaiFace.left_col * width,
     topRow : clarifaiFace.top_row * height,
     rightCol : width - (clarifaiFace.right_col * width), 
     bottomRow : height - (clarifaiFace.bottom_row * height)
     
   }

  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box : box})
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value});
  
  }

  onButtonSubmit = () => {
   // console.log('click');
   this.setState({imageUrl:this.state.input});
   
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      response => {this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err));
  } 
  render() {
    return (
      <div className="App">
      <Particles className='particle' params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
        <FaceRecognition image={this.state.imageUrl} box = {this.state.box}/>
      </div>
    );
  }
}

export default App;
