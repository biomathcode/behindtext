import React from 'react';
import ImageEditor from './components/ImageEditor';

function App() {
  return <>
    <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;
  <ImageEditor />;
  </> 
}

export default App;