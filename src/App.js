import { React, useState } from 'react'
import './App.css';
import Countdown from './Countdown.js'
import SliderContainer from './SliderContainer';

function App() {

  const [dragNum, setDragNum] = useState(0)

    return (
        <div className="App">
            <Countdown dragNum={dragNum} />
            <SliderContainer dragNum={dragNum} setDragNum={setDragNum} />
        </div>
    );  
}

export default App;