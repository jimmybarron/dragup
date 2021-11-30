import { React, useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook'
import './App.css';
import Countdown from './Countdown'
import SliderContainer from './SliderContainer';
import Button from './Button';

function App() {

    // Used to display the current drag number
    const [dragNumMinOnes, setDragNumMinOnes] = useState(0)
    const [dragNumMinTens, setDragNumMinTens] = useState(0)

    // Used to send the current drag number to the countdown
    const [countdownMinOnes, setCountdownMinOnes] = useState(0)
    const [countdownMinTens, setCountdownMinTens] = useState(0)
    
    const handleReset = () => {
        setCountdownMinOnes(0)
        setCountdownMinTens(0)
        timer.stop()
        timer.start({
            startValues: [0,0,0,0,0],
        })
        timer.stop()
    }

    const [timer, isTargetAchieved] = useTimer({
        countdown: true,
    })

    // When a new number is sent to the timer
    useEffect(() => {
        let minutes = [countdownMinTens, countdownMinOnes].join('')
        console.log(minutes);
        timer.stop()
        timer.start({
            startValues: {
                minutes: minutes,
            },
        })
    }, [countdownMinTens, countdownMinOnes, timer])

    return (
        <div className="App">
            
            <Countdown
                time={timer.getTimeValues().toString()}
            />

            <div style={{ display: 'flex', }}>

                <SliderContainer
                    id="sliderMinTens"
                    width="100px"
                    dragNum={dragNumMinTens}
                    onDrag={setDragNumMinTens}
                    onDragEnd={setCountdownMinTens}/>

                <div style={{ width: '25px', }}></div>

                <SliderContainer
                    id="sliderMinOnes"
                    width="100px"
                    dragNum={dragNumMinOnes}
                    onDrag={setDragNumMinOnes}
                    onDragEnd={setCountdownMinOnes}/>

            </div>

            <Button
                onClick={handleReset}/>

        </div>
    );  
}

export default App;