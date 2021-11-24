import { React, useState } from 'react'
import './App.css';
import Countdown from './Countdown'
import SliderContainer from './SliderContainer';
import ResetButton from './ResetButton';

function App() {

    const [dragNumMinOnes, setDragNumMinOnes] = useState(0)
    const [dragNumMinTens, setDragNumMinTens] = useState(0)
    const [countdownMinOnes, setCountdownMinOnes] = useState(0)
    const [countdownMinTens, setCountdownMinTens] = useState(0)

    return (
        <div className="App">
            
            <Countdown
                countdownMinTens={countdownMinTens}
                countdownMinOnes={countdownMinOnes}
            />

            <div style={{ display: 'flex', }}>

                <SliderContainer
                    id="sliderMinTens"
                    width="100px"
                    dragNum={dragNumMinTens}
                    onDrag={setDragNumMinTens}
                    onDragEnd={setCountdownMinTens}
                    />

                <div style={{ width: '25px', }}></div>

                <SliderContainer
                    id="sliderMinOnes"
                    width="100px"
                    dragNum={dragNumMinOnes}
                    onDrag={setDragNumMinOnes}
                    onDragEnd={setCountdownMinOnes}
                />

            </div>

            <ResetButton/>

        </div>
    );  
}

export default App;