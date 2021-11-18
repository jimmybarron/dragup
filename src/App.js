import { React, useState } from 'react'
import './App.css';
import Countdown from './Countdown.js'
import SliderContainer from './SliderContainer';

function App() {

  const [dragNum, setDragNum] = useState(0)
  const [countdownNum, setCountdownNum] = useState(0)

    return (
        <div className="App">
            <Countdown countdownNum={countdownNum} />
            <SliderContainer
                dragNum={dragNum}
                setDragNum={setDragNum}
                setCountdownNum={setCountdownNum}
            />
        </div>
    );  
}

export default App;