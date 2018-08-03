import React from 'react';


const FaceRecognition = (prop) => {
return(
   <div className='center ma'>

   <div className='absolute mt2'>
   <img alt = '' src={prop.image} width='500px' heigh='auto'/>
  </div>
   </div>

);
}
export default FaceRecognition;