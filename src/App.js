import { React, useState, useEffect } from 'react'
import useTimer from 'easytimer-react-hook'
import './App.css';
import Countdown from './Countdown'
import './Sliders.css'
import SliderContainer from './SliderContainer';
import Button from './Button';

function App() {

    // COUNTDOWN MEMORY: Used to send the current drag number to the countdown on drag end event
    const [countdownMinOnes, setCountdownMinOnes] = useState(0)
    const [countdownMinTens, setCountdownMinTens] = useState(0)
    const [countdownSecOnes, setCountdownSecOnes] = useState(0)
    const [countdownSecTens, setCountdownSecTens] = useState(0)


    // COUNTDOWN TIMER
    const [countdownTimer, isCountdownDone] = useTimer({
        countdown: true,
        updateWhenTargetAchieved: true,
    })

    // DELAY TIMER
    const [delayTimer, isDelayTimerDone] = useTimer({
        countdown: true,
        updateWhenTargetAchieved: true,
    })

    // RESET
    const handleReset = () => {
        setCountdownMinOnes(0)
        setCountdownMinTens(0)
        setCountdownSecOnes(0)
        setCountdownSecTens(0)
        countdownTimer.start({
            startValues: {
                minutes: 0,
                seconds: 0,
            }
        })
        countdownTimer.stop()

        delayTimer.reset()
        delayTimer.stop()
    }

    // NUMBER PADDER HELPER: This adds the zero padding eg. '01' instead of default of '1' so the controls show zeros instead of being blank
    const countdownZeroPadder = (position, set) => {
        // convert number to string then array
        let time = countdownTimer.getTimeValues()[set].toString().split('')
        // if the time is a single digit; add a zero for padding and return
        if (time.length === 1) {
            time.unshift(0)
        } 
        return time[position]
    }

    // COUNTDOWN LOADER & DELAY START: Loads time values from controls into their respective countdown states; starts delay Timer
    const loadCountdownStartDelay = (position, time) => {
        position === 'minTens' && setCountdownMinTens(time)
        position === 'minOnes' && setCountdownMinOnes(time)
        position === 'secTens' && setCountdownSecTens(time)
        position === 'secOnes' && setCountdownSecOnes(time)
        delayTimer.reset()
        delayTimer.start({
            startValues: {
                seconds: 3,
            }
        })
    }

    // START COUNTDOWN: Once delay is done; Complies time from all the controller states, starts the countdown with those new values
    useEffect(() => {
        let minutes = [countdownMinTens, countdownMinOnes].join('')
        let seconds = [countdownSecTens, countdownSecOnes].join('')
        countdownTimer.start({
            startValues: {
                minutes: minutes,
                seconds: seconds,
            }
        })
    }, [isDelayTimerDone])


    // COUNTDOWN DONE
    useEffect(() => {
        console.log('Countdown Done');
        handleReset()
    }, [isCountdownDone])
   

    return (
        <div className="App">

                <div className='sliders'>
    
                    <SliderContainer
                        id="minTens"
                        width="70px"
                        maxNum="5"
                        isDelayDone={isDelayTimerDone}
                        onDragEnd={loadCountdownStartDelay}
                        countdownTime={countdownZeroPadder(0, 'minutes')}
                    />
    
                    <div style={{ width: '8px', }}>   
                    </div>
    
                    <SliderContainer
                        id="minOnes"
                        width="70px"
                        maxNum="9"
                        isDelayDone={isDelayTimerDone}
                        onDragEnd={loadCountdownStartDelay}
                        countdownTime={countdownZeroPadder(1, 'minutes')}
                    />

                    <div style={{color: 'white', fontSize:'64px', margin: '0 12px'}}>:</div>

                    <SliderContainer
                        id="secTens"
                        width="70px"
                        maxNum="5"
                        isDelayDone={isDelayTimerDone}
                        onDragEnd={loadCountdownStartDelay}
                        countdownTime={countdownZeroPadder(0, 'seconds')}
                    />
    
                    <div style={{ width: '8px', }}>
                    </div>
    
                    <SliderContainer
                        id="secOnes"
                        width="70px"
                        maxNum="9"
                        isDelayDone={isDelayTimerDone}
                        onDragEnd={loadCountdownStartDelay}
                        countdownTime={countdownZeroPadder(1, 'seconds')}
                    />
    
                </div>


            <Button style={{ marginTop: '30px' }} onClick={handleReset}>
                Reset
            </Button>

        </div>
    );  
}

export default App;