import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({image, box}) => {
   
    
    const boundingBox = box.map((faceData,i) =><div key={i} className = "bounding-box" style ={{top: box[i].topRow, right: box[i].rightCol,  bottom: box[i].bottomRow, left: box[i].leftCol}}></div> );

    console.log(boundingBox); 
    
return(
   <div className='center ma'>

   <div className='absolute mt2'>
   <img id="inputImage" alt = '' src={image} width='500px' heigh='auto' />

    {boundingBox}                                                                           
   
    {/* <div className = "bounding-box" style ={{top: box.topRow, right: box.rightCol,  bottom: box.bottomRow, left: box.leftCol}}>
  
  </div> */}
  </div>

  
   </div>

);
}
export default FaceRecognition;