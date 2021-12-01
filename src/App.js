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

    // Used to send the current drag number to the countdown on drag end event
    const [countdownMinOnes, setCountdownMinOnes] = useState(0)
    const [countdownMinTens, setCountdownMinTens] = useState(0)
    
    const handleReset = () => {
        setCountdownMinOnes(0)
        setCountdownMinTens(0)
        timer.stop()
    }
    
    const [timer, isTargetAchieved] = useTimer({
        countdown: true,
    })

    // When the user lifts their finger and a new countdown is set
    useEffect(() => {
        let newTime = [countdownMinTens, countdownMinOnes].join('')
        console.log('New Time:', newTime, 'Minutes');
        // Create an async function that starts a timer; awaits a delay before setting the time; then clears that timeout
        timer.stop()
        timer.start({
            startValues: {
                minutes: newTime,
            },
        })
        // setTimeout(() => {
        //     console.log('Timer Delay Started');
        //     timer.start({
        //         startValues: {
        //             minutes: newTime,
        //         },
        //     })
        // }, 1000) 

    }, [countdownMinTens, countdownMinOnes, timer])

    return (
        <div className="App">
            

            <div>
                <div className='sliders' style={{ display: 'flex' , marginLeft: '3%'}}>
    
                    <SliderContainer
                        id="sliderMinTens"
                        width="70px"
                        dragNum={dragNumMinTens}
                        onDrag={setDragNumMinTens}
                        onDragEnd={setCountdownMinTens}/>
    
                    <div style={{ width: '8px', }}></div>
    
                    <SliderContainer
                        id="sliderMinOnes"
                        width="70px"
                        dragNum={dragNumMinOnes}
                        onDrag={setDragNumMinOnes}
                        onDragEnd={setCountdownMinOnes}/>
    
                </div>
                
                <Countdown
                    minutes={timer.getTimeValues().minutes.toString()}
                    seconds={timer.getTimeValues().seconds.toString()}
                />

            </div>

            <Button
                style={{ marginTop: '30px' }} onClick={handleReset}/>

        </div>
    );  
}

export default App;