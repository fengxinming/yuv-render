import './App.styl';
import React, { useRef } from 'react';
import YUVRender from './components/YUVRender';

function App() {
  const yuv = useRef<any>(null);
  const start = () => {
    yuv.current.start();
  };

  return (
    <div className="viewport">
      <YUVRender ref={yuv} />
      <button className="btn btn-default btn-primary" onClick={start}>Click here</button>
    </div>
  );
}

export default App;
