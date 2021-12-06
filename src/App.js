import { React, useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook'
import './App.css';
import Countdown from './Countdown'
import './Sliders.css'
import SliderContainer from './SliderContainer';
import Button from './Button';

function App() {

    // Used to display the current drag number for feedback. Without this the countdown is continously triggered.
    const [dragNumMinOnes, setDragNumMinOnes] = useState(0)
    const [dragNumMinTens, setDragNumMinTens] = useState(0)
    const [dragNumSecOnes, setDragNumSecOnes] = useState(0)
    const [dragNumSecTens, setDragNumSecTens] = useState(0)

    // Used to send the current drag number to the countdown on drag end event
    const [countdownMinOnes, setCountdownMinOnes] = useState(0)
    const [countdownMinTens, setCountdownMinTens] = useState(0)
    const [countdownSecOnes, setCountdownSecOnes] = useState(0)
    const [countdownSecTens, setCountdownSecTens] = useState(0)

    const [countdownTimer, isCountdownDone] = useTimer({
        countdown: true
    })

    const countdownZeroPadder = (position, set) => {
        // convert number to string then array
        let time = countdownTimer.getTimeValues()[set].toString().split('')
        // if the time is a single digit; add a zero for padding and return
        if (time.length === 1) {
            time.unshift(0)
        }
        return time[position]
    }
    

    // When the user lifts their finger and a new countdown is set
    useEffect(() => {
        let minutes = [countdownMinTens, countdownMinOnes].join('')
        let seconds = [countdownSecTens, countdownSecOnes].join('')
        // console.log([0, 0, minutes, seconds, 0]);
        // Create an async function that starts a timer; awaits a delay before setting the time; then clears that timeout
        countdownTimer.stop()
        countdownTimer.start({
            startValues: {
                minutes: minutes,
                seconds: seconds,
            }
        })
    }, [countdownMinTens, countdownMinOnes, countdownSecTens, countdownSecOnes, countdownTimer])
    
    const [delay, setDelay] = useState(0)

    const [delayTimer, isDelayDone] = useTimer({
        countdown: true,
        updateWhenTargetAchieved: true,
    })

    const delayAndSetCountdownSecOnes = dragNum => {
        setCountdownSecOnes(dragNum)
        delayTimer.start({
            startValues: {
                seconds: 3,
            }
        })
    }
   
    const handleReset = () => {
        setCountdownMinOnes(0)
        setCountdownMinTens(0)
        setCountdownSecOnes(0)
        setCountdownSecTens(0)
        countdownTimer.stop()
    }

    return (
        <div className="App">

                <div className='sliders'>
    
                    <SliderContainer
                        id="sliderMinTens"
                        width="70px"
                        maxNum="5"
                        dragNum={dragNumMinTens}
                        onDrag={setDragNumMinTens}
                        onDragEnd={setCountdownMinTens}
                        displayNum={countdownZeroPadder(0, 'minutes')}
                    />
    
                    <div style={{ width: '8px', }}>   
                    </div>
    
                    <SliderContainer
                        id="sliderMinOnes"
                        width="70px"
                        maxNum="9"
                        dragNum={dragNumMinOnes}
                        onDrag={setDragNumMinOnes}
                        onDragEnd={setCountdownMinOnes}
                        displayNum={countdownZeroPadder(1, 'minutes')}
                    />

                    <div style={{color: 'white', fontSize:'64px', margin: '0 12px'}}>:</div>

                    <SliderContainer
                        id="sliderMinTens"
                        width="70px"
                        maxNum="5"
                        dragNum={dragNumSecTens}
                        onDrag={setDragNumSecTens}
                        onDragEnd={setCountdownSecTens}
                        displayNum={countdownZeroPadder(0, 'seconds')}
                    />
    
                    <div style={{ width: '8px', }}>
                    </div>
    
                    <SliderContainer
                        id="sliderMinOnes"
                        width="70px"
                        maxNum="9"
                        setDelay={setDelay}
                        isDelayDone={isDelayDone}
                        dragNum={dragNumSecOnes}
                        onDrag={setDragNumSecOnes}
                        onDragEnd={delayAndSetCountdownSecOnes}
                        displayNum={countdownZeroPadder(1, 'seconds')}
                    />
    
                </div>


            <Button style={{ marginTop: '30px' }} onClick={handleReset}>
                Reset
            </Button>

        </div>
    );  
}

export default App;